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
Blockly.FieldWIMSEditor = function (content, opt_alt, toolbar, isAnalyze) {
    Blockly.FieldWIMSEditor.superClass_.constructor.call(this, content, null);
    this.sourceBlock_ = null;
    this.editorDivId_ = null;
    this.quillEditor_ = null;
    this.toolbar = toolbar;
    this.isAnalyze = isAnalyze;
    this.content_ = content;
    this.value;
    // this.EDITABLE;
    // Ensure height and width are numbers.  Strings are bad at math.
    this.size_ = new goog.math.Size(0, 0); /* Size cannot be determined until after rendering */
    this.text_ = opt_alt || '';
};
goog.inherits(Blockly.FieldWIMSEditor, Blockly.Field);
/**
 * Editable fields are saved by the XML renderer, non-editable fields are not.
 */
Blockly.FieldWIMSEditor.prototype.EDITABLE = true;
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
    // this.EDITABLE = true;
    // Blockly.FieldWIMSEditor.superClass_.updateEditable.call(this);
    // Build the quill editor in a special div (invisible at the start)
    var editorDiv = document.createElement("div");
    // Temporarily add div to document so that we can get its size.
    editorDiv.style.position = "absolute";
    // Get a unique ID for the div
    Blockly.FieldWIMSEditor.UNIQUE_QUILL_ID++;
    this.editorDivId_ = "Blockly_quill_" + Blockly.FieldWIMSEditor.UNIQUE_QUILL_ID;
    editorDiv.id = this.editorDivId_;
    if (this.toolbar) {
        editorDiv.innerHTML = create_div_quill_toolbar(this.editorDivId_);
    }
    document.body.appendChild(editorDiv);
    editorDiv.style.width = "300px";
    editorDiv.style.height = "50px";
    if (this.toolbar) {
        editorDiv.style.width = "400px";
        editorDiv.style.height = "150px";
        editorDiv.style.backgroundColor = 'white';
    }
    Blockly.ExternalDiv.register(editorDiv, this);
    this.setSize_(editorDiv.offsetWidth, editorDiv.offsetHeight);
    if (!this.quillEditor_) {
        if (!this.toolbar) {
            this.quillEditor_ = new Quill('#' + this.editorDivId_, {
                modules: {
                    toolbar: false
                },
                placeholder: Blockly.Msg.WIMS_EDITOR_PLACEHOLDER,
                theme: 'snow'
            });
            this.quillEditor_.insertText(0, "");
            this.editorSEditor = new SEditor(this.quillEditor_);
        }
        else {
            // var toolbarOptions = [['bold', 'italic'], ['link', 'image']];
            this.quillEditor_ = new Quill('#' + this.editorDivId_ + '_quill', {
                modules: {
                    toolbar: '#' + this.editorDivId_ + '_toolbar'
                },
                placeholder: Blockly.Msg.WIMS_EDITOR_PLACEHOLDER,
                theme: 'snow'
            });
            this.quillEditor_.insertText(0, "");
            this.editorSEditor = new SEditor(this.quillEditor_);
        }
    }
    if (this.value) {
        this.quillEditor_.setContents(this.value);
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
    console.log('test 1');
    console.log(this.getAbsoluteXY_());
};
Blockly.FieldWIMSEditor.prototype.computePlaceholderImage_ = function () {
    console.log('test 6');
    console.log(this.getAbsoluteXY_());
    if (this.placeholderImageElement_ && this.editorDivId_) {
        var fieldTmp = { x: this };
        var editorDiv = document.getElementById(this.editorDivId_);
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
    console.log('test 5');
    console.log(this.getAbsoluteXY_());
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
    console.log('test 4');
    console.log(this.getAbsoluteXY_());
};
/**
 * Set the alt text of this editor.
 * @param {?string} alt New alt text.
 * @override
 */
Blockly.FieldWIMSEditor.prototype.setText = function (alt) {
    console.log('test 7');
    console.log(this.getAbsoluteXY_());
    if (alt === null) {
        // No change if null.
        return;
    }
    this.text_ = alt;
};
function create_div_quill_toolbar(id) {
    var toolbar = '<div id=\'' + id + '_toolbar\'>' +
        '<span class="ql-formats">' +
        '<button class="ql-bold"></button>' +
        '<button class="ql-italic"></button>' +
        '<button class="ql-underline"></button>' +
        '<button class="ql-strike"></button>' +
        '</span>' +
        '<span class="ql-formats">' +
        '<button style="margin-right:8px;" title="latex" onclick="get_editor_field_wims(\'' + id + '\').change_to_latex()">LaTeX</button>' +
        '</span>' +
        '</div>';
    var quill = '<div id=\'' + id + '_quill\'></div>';
    return toolbar + quill;
}
/**
 * Show the editor on top of the placeholder image.
 * @param {boolean=} opt_quietInput True if editor should be created without
 *     focus.  Defaults to false.
 * @private
 */
Blockly.FieldWIMSEditor.prototype.showEditor_ = function (opt_quietInput) {
    console.log('test 2');
    console.log(this.getAbsoluteXY_());
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
    console.log('test 8');
    console.log(this.getAbsoluteXY_());
    // Needs Bounding Box only for positioning, not for resizing the editor
    // No resizing for the moment.
    var bBox = this.fieldGroup_.getBBox();
    var editorDiv = document.getElementById(this.editorDivId_);
    var xy = this.getAbsoluteXY_();
    console.log('test 3');
    console.log(this.getAbsoluteXY_());
    // console.log(this.borderRect_.getBoundingClientRect());
    // In RTL mode block fields and LTR input fields the left edge moves,
    // whereas the right edge is fixed.  Reposition the editor.
    if (this.sourceBlock_.RTL) {
        var borderBBox = this.getScaledBBox_();
        xy.x += borderBBox.width;
        xy.x -= editorDiv.offsetWidth;
    }
    // Shift by a few pixels to line up exactly.
    xy.y += 1;
    if (goog.userAgent.GECKO && editorDiv.style.top) {
        // Firefox mis-reports the location of the border by a pixel
        // once the WidgetDiv is moved into position.
        //    xy.x += 100;
        xy.x += 400;
        xy.y -= 1;
    }
    if (goog.userAgent.WEBKIT && editorDiv.style.top) {
        xy.x += 4;
        xy.y -= 1;
    }
    editorDiv.style.left = xy.x + 'px';
    editorDiv.style.top = xy.y + 'px';
    editorDiv.display = 'block';
    if (!this.isAnalyze) {
        generate_popup_list_var('popup_var_blockly', xy.x + 303, xy.y, false);
    }
    else {
        generate_popup_list_var('popup_var_blockly', xy.x + 403, xy.y + 40, true);
    }
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
    if (this.quillEditor_) {
        return JSON.stringify(this.quillEditor_.getContents());
    }
    else {
        return '';
    }
};
Blockly.FieldWIMSEditor.prototype.setValue = function (val) {
    if (val) {
        this.value = JSON.parse(val);
    }
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
    jQuery('#popup_var_blockly').remove();
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
                console.log(xy);
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
