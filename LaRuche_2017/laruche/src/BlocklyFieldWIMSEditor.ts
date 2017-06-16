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
 * Class for a Quill editor on a block. The Quill editor should have been
 * initialized and placed in a (possibly invisible) div element
 * @param {string} content The text to be put in the editor.
 * @param {string=} opt_alt Optional alt text for when block is collapsed.
 * @extends {Blockly.Field}
 * @constructor
 */
Blockly.FieldWIMSEditor = function(content, opt_alt) {
  this.sourceBlock_ = null;
  this.editorDiv_ = null;
  this.content_ = content;
  // Ensure height and width are numbers.  Strings are bad at math.
  this.size_ = new goog.math.Size(0,0);  /* Size cannot be determined until after rendering */
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
Blockly.FieldWIMSEditor.prototype.init = function() {
  if (this.editorDiv_) {
    // Field has already been initialized once.
    return;
  }
  // Build the DOM.
  if (this.fieldGroup_) {
    // Image has already been initialized once.
    return;
  }
  // Build the DOM.
  /** @type {SVGElement} */
  this.fieldGroup_ = Blockly.utils.createSvgElement('g', {}, null);
  if (!this.visible_) {
    this.fieldGroup_.style.display = 'none';
  }

  // Build the quill editor in a special div (invisible at the start)
  this.editorDiv_ = document.createElement("div");
  // Temporarily add div to document so that we can get its size.
  // Set visibility to hidden so it will not display.
  this.editorDiv_.style.visibility = "visible";
  this.editorDiv_.style.position = "relative";
  // Get a unique ID for the div
  Blockly.FieldWIMSEditor.UNIQUE_QUILL_ID++;
  this.editorDivId_ = "Blockly_quill_"+Blockly.FieldWIMSEditor.UNIQUE_QUILL_ID;
  this.editorDiv_.id = this.editorDivId_
  document.body.appendChild( this.editorDiv_ );
  this.editorDiv_.style.width="200px";
  this.editorDiv_.style.height="50px";

  Blockly.ExternalDiv.register(this.editorDiv_);

  this.setSize_(this.editorDiv_.offsetWidth, this.editorDiv_.offsetHeight);
  if (!this.quillEditor_) {
    this.quillEditor_ = new Quill('#'+this.editorDivId_, {
    	modules: {
    		toolbar: false
    	},
    	placeholder: 'expression...',
    	theme: 'snow'
    });
    this.quillEditor_.insertText(0,"expression...");
  }

  // Build the placeholder image in the block
  this.placeholderImageElement_ = Blockly.utils.createSvgElement('image',
      {}, this.fieldGroup_);
  // this.placeholderImageElement_.setAttribute("href","data:image/png;base64,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")
  this.placeholderImageElement_.setAttribute("width", this.width_+"px");
  this.placeholderImageElement_.setAttribute("height", this.height_+"px");
  this.computePlaceholderImage_();
  this.sourceBlock_.getSvgRoot().appendChild(this.fieldGroup_);
//  this.setValue(this.content_);
};

Blockly.FieldWIMSEditor.prototype.computePlaceholderImage_ = function() {
  if (this.placeholderImageElement_ && this.editorDiv_) {
    var fieldTmp = {x:this};
    html2canvas(this.editorDiv_, {
        onrendered: function (canvas) {
            var canvas_url = canvas.toDataURL("image/jpeg");
            var width = fieldTmp.x.width_;
            var height = fieldTmp.x.height_;
            fieldTmp.x.placeholderImageElement_.setAttribute("href", canvas_url);
        }
    });
  }
}


Blockly.FieldWIMSEditor.prototype.setSize_ = function(width, height) {
  this.width_ = width;
  this.height_ = height;
  this.size_ = new goog.math.Size(this.width_,
    this.height_ + 2 * Blockly.BlockSvg.INLINE_PADDING_Y);

  this.editorDiv_.setAttribute("width", width + "px");
  this.editorDiv_.setAttribute("height", height + "px");
};

/**
 * Dispose of all DOM objects belonging to this text.
 */
Blockly.FieldWIMSEditor.prototype.dispose = function() {
  goog.dom.removeNode(this.fieldGroup_);
  this.fieldGroup_ = null;
  Blockly.ExternalDiv.dispose(this.editorDivId_);
  this.editorDiv_ = null;
  this.editElem_=null;
  this.quillEditor_=null;
  this.placeholderImageElement_=null;
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
//   return this.editElem_;
// };
//
/**
 * Set the editor of this field.
 * @param {?string} editElem div containing the editor.
 * @override
 */
Blockly.FieldWIMSEditor.prototype.setValue = function(content) {
  if (content === null) {
    // No change if null.
    return;
  }
  this.content_ = content;
//   if( !this.foreignElement_ ) {
//     /* Block hasn't been initialised yet. Store string for later. */
//     return;
//   }
//
//   // Create the div and the quill editor
//   if ( !this.editorDiv_ ) {
//     this.foreignDiv_ = document.createElement("div");
//     this.foreignDiv_.setAttribute("xmlns", document.body.namespaceURI);
//     this.editorDiv_ = document.createElement("div");
//     // Temporarily add div to document so that we can get its size.
//     // Set visibility to hidden so it will not display.
//     this.editorDiv_.style.visibility = "visible";
//     this.editorDiv_.style.position = "relative";
//     // Get a unique ID for the div
//     Blockly.FieldWIMSEditor.UNIQUE_QUILL_ID++;
//     this.editorDivId_ = "Blockly_quill_"+Blockly.FieldWIMSEditor.UNIQUE_QUILL_ID;
//     this.editorDiv_.id = this.editorDivId_
//     document.body.appendChild( this.foreignDiv_ );
//     this.foreignDiv_.appendChild(this.editorDiv_);
//     this.editorDiv_.style.width="200px";
//     this.editorDiv_.style.height="50px";
//   }
//   this.setSize_(this.editorDiv_.offsetWidth, this.editorDiv_.offsetHeight);
//   if (!this.quillEditor_) {
//     this.quillEditor_ = new Quill('#'+this.editorDivId_, {
//     	modules: {
//     		toolbar: false
//     	},
//     	placeholder: 'expression...',
//     	theme: 'snow'
//     });
// //    $("#"+this.editorDivId_).append("<textarea id='testId1' rows='1' cols='20'></textarea>");
//   }
//   /* Workaround for a Chrome/Safari bug - see http://stackoverflow.com/questions/8185845/svg-foreignobject-behaves-as-though-absolutely-positioned-in-webkit-browsers */
//   if( goog.userAgent.WEBKIT ) {
//     this.editorDiv_.style.position = "fixed";
//   }
//   this.foreignElement_.appendChild(this.foreignDiv_);
//   var zzz=document.getElementById(this.editorDivId_);
//   // function callback_mine(e) {
//   //   window.alert("yes");
//   //   console.log(e);
//   // }
// //  goog.events.listen(this.quillEditor_,goog.events.EventType.CLICK,callback_mine);
// //  window.alert(document.body.namespaceURI);
};

/**
 * Set the alt text of this editor.
 * @param {?string} alt New alt text.
 * @override
 */
Blockly.FieldWIMSEditor.prototype.setText = function(alt) {
  if (alt === null) {
    // No change if null.
    return;
  }
  this.text_ = alt;
};

/**
 * Editors are fixed width, no need to render.
 * @private
 */
Blockly.FieldWIMSEditor.prototype.render_ = function() {
  // NOP
};

/**
 * Editors are fixed width, no need to update.
 * @private
 */
Blockly.FieldWIMSEditor.prototype.updateWidth = function() {
 // NOP
};

/**
 * Define ExternalDiv array,
 * All external divs that are used by Blockly elements and float above them
 */

Blockly.ExternalDiv.DIV = [];

/*
 * Hide all the external divs.
 * @type {Function}
 */
Blockly.ExternalDiv.hide = function() {
  if (Blockly.ExternalDiv.DIV.length>0) {
    for (var iDiv = 0; iDiv<Blockly.ExternalDiv.DIV.length;iDiv++) {
      var div = Blockly.ExternalDiv.DIV[iDiv];
      div.style.display = 'none';
      div.style.left = '';
      div.style.top = '';
    }
  }
}

/*
 * Show the external div with id .
 * @type {Function}
 *
 */
Blockly.ExternalDiv.show = function(id) {
  if (Blockly.ExternalDiv.DIV.length>0) {
    Blockly.ExternalDiv.hide();
    for (var iDiv = 0; iDiv<Blockly.ExternalDiv.DIV.length;iDiv++) {
      if (Blockly.ExternalDiv.DIV[iDiv].id == id) {
        var xy = goog.style.getViewportPageOffset(document);
        Blockly.ExternalDiv.DIV[iDiv].style.top = xy.y + 'px';
        Blockly.ExternalDiv.DIV[iDiv].style.display = 'block';
      }
    }
  }
}

/*
 * Destroy the external div with id.
 * @type {Function}
 *
 */
Blockly.ExternalDiv.dispose = function(id) {
  if (Blockly.ExternalDiv.DIV.length>0) {
    for (var iDiv = 0; iDiv<Blockly.ExternalDiv.DIV.length;iDiv++) {
      if (Blockly.ExternalDiv.DIV[iDiv].id == id) {
        goog.dom.removeNode(Blockly.ExternalDiv.DIV[iDiv]);
      }
    }
  }
}

/*
 * Register the external div
 * @type {Function}
 *
 */
Blockly.ExternalDiv.register = function(div) {
  var testExist = false;
  if (Blockly.ExternalDiv.DIV.length>0) {
    for (var iDiv = 0; iDiv<Blockly.ExternalDiv.DIV.length;iDiv++) {
      if (Blockly.ExternalDiv.DIV[iDiv].id == id) {
        Console.log("Internal error in Blockly ExternalDiv: already registered div");
        testExist = true;
        break;
      }
    }
  }
  if (!testExist) Blockly.ExternalDiv.DIV.push(div);
}

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
Blockly.hideChaff = function(opt_allowToolbox) {
  Blockly.Tooltip.hide();
  Blockly.WidgetDiv.hide();
  // Here comes the "hide only" part
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
