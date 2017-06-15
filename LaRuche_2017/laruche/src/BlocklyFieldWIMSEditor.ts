/**
  * Based on field_image.js and field_mathjax.js
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
  if (this.foreignObject_) {
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


  this.foreignElement_ = Blockly.utils.createSvgElement('foreignObject',
      {}, this.fieldGroup_);
  this.foreignElement_.setAttribute("requiredExtensions","http://www.w3.org/1999/xhtml");
  this.setValue(this.content_);
  // if (goog.userAgent.GECKO) {
  //   // Due to a Firefox bug which eats mouse events on image elements,
  //   // a transparent rectangle needs to be placed on top of the image.
  //   // TODO: Check if this bug holds for foreignelement also.
  //   this.rectElement_ = Blockly.utils.createSvgElement('rect',
  //       {'fill-opacity': 0}, this.fieldGroup_);
  // }
  this.sourceBlock_.getSvgRoot().appendChild(this.fieldGroup_);

  // Configure the field to be transparent with respect to tooltips.
  var topElement = this.rectElement_ || this.foreignElement_;
//  topElement.tooltip = this.sourceBlock_;
//  Blockly.Tooltip.bindMouseEvents(topElement);
};

Blockly.FieldWIMSEditor.prototype.setSize_ = function(width, height) {
  this.width_ = width;
  this.height_ = height;
  this.size_ = new goog.math.Size(this.width_,
    this.height_ + 2 * Blockly.BlockSvg.INLINE_PADDING_Y);

  this.foreignElement_.setAttribute("width", width + "px");
  this.foreignElement_.setAttribute("height", height + "px");

  if( this.rectElement_ ) {
    this.rectElement_.setAttribute("width", width + "px");
    this.rectElement_.setAttribute("height", height + "px");
  }
};

/**
 * Dispose of all DOM objects belonging to this text.
 */
Blockly.FieldWIMSEditor.prototype.dispose = function() {
  goog.dom.removeNode(this.fieldGroup_);
  this.fieldGroup_ = null;
  this.foreignElement_ = null;
  this.editElem_=null;
  this.quillEditor_=null;
};

/**
 * Change the tooltip text for this field.
 * @param {string|!Element} newTip Text for tooltip or a parent element to
 *     link to for its tooltip.
 */
Blockly.FieldWIMSEditor.prototype.setTooltip = function(newTip) {
  var topElement = this.rectElement_ || this.foreignElement_;
  topElement.tooltip = newTip;
};

/**
 * Get the source URL of this image.
 * @return {string} Current text.
 * @override
 */
Blockly.FieldWIMSEditor.prototype.getValue = function() {
  return this.editElem_;
};

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
  if( !this.foreignElement_ ) {
    /* Block hasn't been initialised yet. Store string for later. */
    return;
  }

  // Create the div and the quill editor
  if ( !this.editorDiv_ ) {
    this.foreignDiv_ = document.createElement("div");
    this.foreignDiv_.setAttribute("xmlns", document.body.namespaceURI);
    this.editorDiv_ = document.createElement("div");
    // Temporarily add div to document so that we can get its size.
    // Set visibility to hidden so it will not display.
    this.editorDiv_.style.visibility = "visible";
    this.editorDiv_.style.position = "relative";
    // Get a unique ID for the div
    Blockly.FieldWIMSEditor.UNIQUE_QUILL_ID++;
    this.editorDivId_ = "Blockly_quill_"+Blockly.FieldWIMSEditor.UNIQUE_QUILL_ID;
    this.editorDiv_.id = this.editorDivId_
    document.body.appendChild( this.foreignDiv_ );
    this.foreignDiv_.appendChild(this.editorDiv_);
    this.editorDiv_.style.width="200px";
    this.editorDiv_.style.height="50px";
  }
  this.setSize_(this.editorDiv_.offsetWidth, this.editorDiv_.offsetHeight);
  if (!this.quillEditor_) {
    this.quillEditor_ = new Quill('#'+this.editorDivId_, {
    	modules: {
    		toolbar: false
    	},
    	placeholder: 'expression...',
    	theme: 'snow'
    });
//    $("#"+this.editorDivId_).append("<textarea id='testId1' rows='1' cols='20'></textarea>");
  }
  /* Workaround for a Chrome/Safari bug - see http://stackoverflow.com/questions/8185845/svg-foreignobject-behaves-as-though-absolutely-positioned-in-webkit-browsers */
  if( goog.userAgent.WEBKIT ) {
    this.editorDiv_.style.position = "fixed";
  }
  this.foreignElement_.appendChild(this.foreignDiv_);
  var zzz=document.getElementById(this.editorDivId_);
  // function callback_mine(e) {
  //   window.alert("yes");
  //   console.log(e);
  // }
//  goog.events.listen(this.quillEditor_,goog.events.EventType.CLICK,callback_mine);
//  window.alert(document.body.namespaceURI);
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
 * Images are fixed width, no need to render.
 * @private
 */
Blockly.FieldWIMSEditor.prototype.render_ = function() {
  // NOP
};
/**
 * Images are fixed width, no need to update.
 * @private
 */
Blockly.FieldWIMSEditor.prototype.updateWidth = function() {
 // NOP
};
