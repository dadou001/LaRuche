/**
 * @fileoverview Generating OEF for specific WIMS blocks.
 * @author buskulic@lapp.in2p3.fr (Damir Buskulic)
 */
'use strict';

goog.provide('Blockly.OEF.analyse');

goog.require('Blockly.OEF');


Blockly.OEF['analyse_feedback'] = function(block) {
  var editor = block.getField('WIMS_EDITOR_TEST').quillEditor_;
  editor.setContents(JSON.parse(block.getFieldValue('WIMS_EDITOR_TEST')));
  var editorTestTmp = new SEditor(editor);
  var valTestQuill = editorTestTmp.to_Blockly_Analyse();
  var editor2 = block.getField('WIMS_EDITOR').quillEditor_;
  editor2.setContents(JSON.parse(block.getFieldValue('WIMS_EDITOR')));
  var editorTmp = new SEditor(editor2);
  var valQuill = editorTmp.to_Blockly_Analyse();
  if((valTestQuill == '') || (valQuill == '')){
    return '';
  }
  else{
    return '\\feedback{'+valTestQuill+'}{'+valQuill+'}\n';
  }
};

Blockly.OEF['analyse_hint'] = function(block) {
  var editor = block.getField('WIMS_EDITOR').quillEditor_;
  editor.setContents(JSON.parse(block.getFieldValue('WIMS_EDITOR')));
  var editorTmp = new SEditor(editor);
  return '\\hint{'+editorTmp.to_OEFcode().substring(0,editorTmp.to_OEFcode().length-1)+'}\n';
};
