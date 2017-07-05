/**
 * @fileoverview Generating OEF for specific WIMS blocks.
 * @author buskulic@lapp.in2p3.fr (Damir Buskulic)
 */
'use strict';

goog.provide('Blockly.OEF.analyse');

goog.require('Blockly.OEF');


Blockly.OEF['analyse_feedback'] = function(block) {
  var editorTestTmp = new SEditor(block.getFieldValue('WIMS_EDITOR_TEST'));
  var valTestQuill = editorTestTmp.to_variable_value();
  var editorTmp = new SEditor(block.getFieldValue('WIMS_EDITOR'));
  var valQuill = editorTmp.to_variable_value();
  return '\\feedback{'+valTestQuill+'}{'+valQuill+'}\n';
};

Blockly.OEF['analyse_hint'] = function(block) {
  var editorTmp = new SEditor(block.getFieldValue('WIMS_EDITOR'));
  return '\\hint{'+editorTmp.to_OEFcode().substring(0,editorTmp.to_OEFcode().length-1)+'}\n';
};
