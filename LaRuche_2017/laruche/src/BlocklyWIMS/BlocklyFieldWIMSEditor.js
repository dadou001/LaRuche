/**
  * Based on field_image.js and field_textinput.js
  */
/**
 * @fileoverview WIMS editor field.  Contains a Quill editor
 * @author buskulic@free.fr (Damir Buskulic)
 */
'use strict';
goog.provide('Blockly.FieldWIMSEditor');
goog.require('Blockly.Field');
goog.require('goog.dom');
goog.require('goog.math.Size');
goog.require('goog.userAgent');
/**
 * Class for a Quill editor on a block. The Quill editor is initialized
 * and placed in a div element that is managed by the Blockly.ExternalDiv class
 * @param {string} content The text to be put in the editor.
 * @param {string=} opt_alt Optional alt text for when block is collapsed.
 * @extends {Blockly.Field}
 * @constructor
 */
Blockly.FieldWIMSEditor = function (content, opt_alt) {
    Blockly.FieldWIMSEditor.superClass_.constructor.call(this, content, null);
    this.sourceBlock_ = null;
    this.editorDivId_ = null;
    this.quillEditor_ = null;
    this.content_ = content;
    // Ensure height and width are numbers.  Strings are bad at math.
    this.size_ = new goog.math.Size(0, 0); /* Size cannot be determined until after rendering */
    this.text_ = opt_alt || '';
};
goog.inherits(Blockly.FieldWIMSEditor, Blockly.Field);
/**
 * Editable fields are saved by the XML renderer, non-editable fields are not.
 */
Blockly.FieldWIMSEditor.prototype.EDITABLE = false;
Blockly.FieldWIMSEditor.UNIQUE_QUILL_ID = 0;
/**
 * Install the editor on a block.
 */
Blockly.FieldWIMSEditor.prototype.init = function () {
    if (this.editorDivId_) {
        // Field has already been initialized once.
        return;
    }
    // Build the DOM.
    if (this.fieldGroup_) {
        // Image has already been initialized once.
        return;
    }
    // Build the DOM.
    Blockly.FieldWIMSEditor.superClass_.init.call(this);
    // Build the quill editor in a special div (invisible at the start)
    var editorDiv = document.createElement("div");
    // Temporarily add div to document so that we can get its size.
    editorDiv.style.position = "absolute";
    // Get a unique ID for the div
    Blockly.FieldWIMSEditor.UNIQUE_QUILL_ID++;
    this.editorDivId_ = "Blockly_quill_" + Blockly.FieldWIMSEditor.UNIQUE_QUILL_ID;
    editorDiv.id = this.editorDivId_;
    document.body.appendChild(editorDiv);
    editorDiv.style.width = "200px";
    editorDiv.style.height = "40px";
    Blockly.ExternalDiv.register(editorDiv, this);
    this.setSize_(editorDiv.offsetWidth, editorDiv.offsetHeight);
    if (!this.quillEditor_) {
        this.quillEditor_ = new Quill('#' + this.editorDivId_, {
            modules: {
                toolbar: false
            },
            placeholder: 'expression...',
            theme: 'snow'
        });
        this.quillEditor_.insertText(0, "");
    }
    // Build the placeholder image in the block
    this.placeholderImageElement_ = Blockly.utils.createSvgElement('image', {}, this.fieldGroup_);
    // var SVG_NS = 'http://www.w3.org/2000/svg';
    // var XLink_NS = 'http://www.w3.org/1999/xlink';
    this.placeholderImageElement_.setAttributeNS(null, "width", this.width_ + "px");
    this.placeholderImageElement_.setAttributeNS(null, "height", this.height_ + "px");
    this.computePlaceholderImage_();
    this.sourceBlock_.getSvgRoot().appendChild(this.fieldGroup_);
    //  this.setValue(this.content_);
};
Blockly.FieldWIMSEditor.prototype.computePlaceholderImage_ = function () {
    if (this.placeholderImageElement_ && this.editorDivId_) {
        var fieldTmp = { x: this };
        var editorDiv = document.getElementById(this.editorDivId_);
        var XLink_NS = 'http://www.w3.org/1999/xlink';
        fieldTmp.x.placeholderImageElement_.setAttributeNS(XLink_NS, "xlink:href", "test.jpeg");
        html2canvas(editorDiv).then(function (canvas) {
            var canvas_url = canvas.toDataURL();
            var width = fieldTmp.x.width_;
            var height = fieldTmp.x.height_;
            var XLink_NS = 'http://www.w3.org/1999/xlink';
            fieldTmp.x.placeholderImageElement_.setAttributeNS(XLink_NS, "xlink:href", canvas_url);
        }, function (err) {
            console.log("html2canvas error:" + err);
        });
    }
};
Blockly.FieldWIMSEditor.prototype.setSize_ = function (width, height) {
    this.width_ = width;
    this.height_ = height;
    this.size_ = new goog.math.Size(this.width_, this.height_ + 2 * Blockly.BlockSvg.INLINE_PADDING_Y);
    var editorDiv = document.getElementById(this.editorDivId_);
    editorDiv.setAttribute("width", width + "px");
    editorDiv.setAttribute("height", height + "px");
};
/**
 * Dispose of all DOM objects belonging to this editor field.
 */
Blockly.FieldWIMSEditor.prototype.dispose = function () {
    goog.dom.removeNode(this.fieldGroup_);
    this.fieldGroup_ = null;
    Blockly.ExternalDiv.dispose(this.editorDivId_);
    this.quillEditor_ = null;
    this.placeholderImageElement_ = null;
};
// /**
//  * Change the tooltip text for this field.
//  * @param {string|!Element} newTip Text for tooltip or a parent element to
//  *     link to for its tooltip.
//  */
// Blockly.FieldWIMSEditor.prototype.setTooltip = function(newTip) {
//   var topElement = this.rectElement_ || this.foreignElement_;
//   topElement.tooltip = newTip;
// };
//
// /**
//  * Get the source URL of this image.
//  * @return {string} Current text.
//  * @override
//  */
// Blockly.FieldWIMSEditor.prototype.getValue = function() {
//   return ...;
// };
//
/**
 * Set the contents of the editor of this field.
 * @param {?string} content new content of the editor. In Quill's case, the type of contents is Delta (defined in Quill)
 * @override
 */
Blockly.FieldWIMSEditor.prototype.setValue = function (content) {
    if (content === null) {
        // No change if null.
        return;
    }
    this.content_ = content;
    if (!this.sourceBlock_) {
        /* Block hasn't been initialised yet */
        return;
    }
    if (!this.quillEditor_) {
        /* Editor hasn't been initialised */
        return;
    }
    this.quillEditor_.setContents(content);
    // goog.events.listen(this.quillEditor_,goog.events.EventType.CLICK,callback_mine);
    // //  window.alert(document.body.namespaceURI);
};
/**
 * Set the alt text of this editor.
 * @param {?string} alt New alt text.
 * @override
 */
Blockly.FieldWIMSEditor.prototype.setText = function (alt) {
    if (alt === null) {
        // No change if null.
        return;
    }
    this.text_ = alt;
};
/**
 * Show the editor on top of the placeholder image.
 * @param {boolean=} opt_quietInput True if editor should be created without
 *     focus.  Defaults to false.
 * @private
 */
Blockly.FieldWIMSEditor.prototype.showEditor_ = function (opt_quietInput) {
    this.workspace_ = this.sourceBlock_.workspace;
    var quietInput = opt_quietInput || false;
    if (!quietInput && (goog.userAgent.MOBILE || goog.userAgent.ANDROID ||
        goog.userAgent.IPAD)) {
        // Mobile browsers have issues with in-line textareas (focus & keyboards).
        var fieldText = this;
        Blockly.prompt(Blockly.Msg.CHANGE_VALUE_TITLE, this.text_, function (newValue) {
            fieldText.setValue(newValue);
        });
        return;
    }
    Blockly.ExternalDiv.show(this.editorDivId_);
    // Needs Bounding Box only for positioning, not for resizing the editor
    // No resizing for the moment.
    var bBox = this.fieldGroup_.getBBox();
    var editorDiv = document.getElementById(this.editorDivId_);
    var xy = this.getAbsoluteXY_();
    // In RTL mode block fields and LTR input fields the left edge moves,
    // whereas the right edge is fixed.  Reposition the editor.
    if (this.sourceBlock_.RTL) {
        var borderBBox = this.getScaledBBox_();
        xy.x += borderBBox.width;
        xy.x -= div.offsetWidth;
    }
    // Shift by a few pixels to line up exactly.
    xy.y += 1;
    if (goog.userAgent.GECKO && editorDiv.style.top) {
        // Firefox mis-reports the location of the border by a pixel
        // once the WidgetDiv is moved into position.
        xy.x += 5;
        xy.y -= 1;
    }
    if (goog.userAgent.WEBKIT && editorDiv.style.top) {
        xy.x += 4;
        xy.y -= 1;
    }
    editorDiv.style.left = xy.x + 'px';
    editorDiv.style.top = xy.y + 'px';
    editorDiv.display = 'block';
    generate_popup_list_var(xy.x + 210, xy.y);
    //  this.resizeEditor_();
    if (!quietInput) {
        this.quillEditor_.focus();
        //    htmlInput.select();
    }
    // Bind to keydown -- trap Enter without IME and Esc to hide.
    // htmlInput.onKeyDownWrapper_ =
    // Blockly.bindEventWithChecks_(htmlInput, 'keydown', this,
    // this.onHtmlInputKeyDown_);
    // // Bind to keyup -- trap Enter; resize after every keystroke.
    // htmlInput.onKeyUpWrapper_ =
    // Blockly.bindEventWithChecks_(htmlInput, 'keyup', this,
    // this.onHtmlInputChange_);
    // // Bind to keyPress -- repeatedly resize when holding down a key.
    // htmlInput.onKeyPressWrapper_ =
    // Blockly.bindEventWithChecks_(htmlInput, 'keypress', this,
    // this.onHtmlInputChange_);
    // htmlInput.onWorkspaceChangeWrapper_ = this.resizeEditor_.bind(this);
    // this.workspace_.addChangeListener(htmlInput.onWorkspaceChangeWrapper_);
};
Blockly.FieldWIMSEditor.prototype.getValue = function () {
    // console.log('BON',this.quillEditor_);
    return this.quillEditor_;
};
/**
 * Editors are fixed width, no need to render.
 * @private
 */
Blockly.FieldWIMSEditor.prototype.render_ = function () {
    // NOP
};
/**
 * Editors are fixed width, no need to update.
 * @private
 */
Blockly.FieldWIMSEditor.prototype.updateWidth = function () {
    // NOP
};
/**
 *===========================================================================
 * Define ExternalDiv array class,
 * All external divs that are used by Blockly elements and float above them
 *===========================================================================
 */
/**
 * @name Blockly.ExternalDiv
 * @namespace
 **/
goog.provide('Blockly.ExternalDiv');
Blockly.ExternalDiv.DIV = [];
Blockly.ExternalDiv.owner = [];
Blockly.ExternalDiv.activeDivId = null;
/*
 * Hide all the external divs.
 * @type {Function}
 */
Blockly.ExternalDiv.hide = function () {
    var activeIndex = -1;
    if (Blockly.ExternalDiv.DIV.length > 0) {
        for (var iDiv = 0; iDiv < Blockly.ExternalDiv.DIV.length; iDiv++) {
            var div = Blockly.ExternalDiv.DIV[iDiv];
            if (div.id == Blockly.ExternalDiv.activeDivId)
                activeIndex = iDiv;
        }
    }
    // Compute placeholder div image BEFORE hiding the div
    if (activeIndex >= 0) {
        Blockly.ExternalDiv.owner[activeIndex].computePlaceholderImage_();
    }
    if (Blockly.ExternalDiv.DIV.length > 0) {
        for (var iDiv = 0; iDiv < Blockly.ExternalDiv.DIV.length; iDiv++) {
            var div = Blockly.ExternalDiv.DIV[iDiv];
            div.style.display = 'none';
            div.style.left = '';
            div.style.top = '';
        }
    }
    Blockly.ExternalDiv.activeDivId = null;
    $('#popup_var_blockly').remove();
};
/*
 * Show the external div with id .
 * @type {Function}
 *
 */
Blockly.ExternalDiv.show = function (id) {
    if (Blockly.ExternalDiv.DIV.length > 0) {
        Blockly.ExternalDiv.hide();
        for (var iDiv = 0; iDiv < Blockly.ExternalDiv.DIV.length; iDiv++) {
            if (Blockly.ExternalDiv.DIV[iDiv].id == id) {
                var xy = goog.style.getViewportPageOffset(document);
                Blockly.ExternalDiv.DIV[iDiv].style.top = xy.y + 'px';
                Blockly.ExternalDiv.DIV[iDiv].style.display = 'block';
                Blockly.ExternalDiv.activeDivId = id;
            }
        }
    }
};
/*
 * Destroy the external div with id.
 * @type {Function}
 *
 */
Blockly.ExternalDiv.dispose = function (id) {
    if (Blockly.ExternalDiv.DIV.length > 0) {
        var iDiv = 0;
        while (iDiv < Blockly.ExternalDiv.DIV.length) {
            if (Blockly.ExternalDiv.DIV[iDiv].id == id) {
                goog.dom.removeNode(Blockly.ExternalDiv.DIV[iDiv]);
                Blockly.ExternalDiv.DIV.splice(iDiv, 1);
                Blockly.ExternalDiv.owner.splice(iDiv, 1);
                if (Blockly.ExternalDiv.activeDivId == id)
                    Blockly.ExternalDiv.activeDivId = null;
            }
            iDiv++;
        }
    }
};
/*
 * Register the external div
 * @type {Function}
 *
 */
Blockly.ExternalDiv.register = function (div, fieldEditor) {
    var testExist = false;
    if (Blockly.ExternalDiv.DIV.length > 0) {
        for (var iDiv = 0; iDiv < Blockly.ExternalDiv.DIV.length; iDiv++) {
            if (Blockly.ExternalDiv.DIV[iDiv].id == div.id) {
                console.log("Internal error in Blockly ExternalDiv: already registered div");
                testExist = true;
                break;
            }
        }
    }
    if (!testExist) {
        Blockly.ExternalDiv.DIV.push(div);
        Blockly.ExternalDiv.owner.push(fieldEditor);
    }
};
/**
 * ***** This is a hack until it comes natively to Blockly *****
 * ***************************************************************
 * overwrite the hideChaff method so that we can hide permanent
 * widgets (we just hide them, no destruction).
 * ***************************************************************
 *
 * Close tooltips, context menus, dropdown selections, etc.
 * @param {boolean=} opt_allowToolbox If true, don't close the toolbox.
 */
Blockly.hideChaff = function (opt_allowToolbox) {
    Blockly.Tooltip.hide();
    Blockly.WidgetDiv.hide();
    // Here comes the "hide only" part for External Divs
    Blockly.ExternalDiv.hide();
    if (!opt_allowToolbox) {
        var workspace = Blockly.getMainWorkspace();
        if (workspace.toolbox_ &&
            workspace.toolbox_.flyout_ &&
            workspace.toolbox_.flyout_.autoClose) {
            workspace.toolbox_.clearSelection();
        }
    }
};
