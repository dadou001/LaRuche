/**
 * @fileoverview Generating OEF for specific WIMS blocks.
 * @author buskulic@lapp.in2p3.fr (Damir Buskulic)
 */
'use strict';

goog.provide('Blockly.OEF.analyse');

goog.require('Blockly.OEF');


Blockly.OEF['analyse_feedback'] = function(block) {
  var editorTmp = new SEditor(block.getFieldValue('WIMS_EDITOR'));
  var valQuill = editorTmp.to_variable_value();
  var statement = Blockly.OEF.statementToCode(block,'DO');
  return '\\feedback{'+valQuill+'}{'+statement.substring(0,statement.length-1)+'}\n';
};

Blockly.OEF['analyse_hint'] = function(block) {
  var editorTmp = new SEditor(block.getFieldValue('WIMS_EDITOR'));
  return '\\hint{'+editorTmp.to_OEFcode().substring(0,editorTmp.to_OEFcode().length-1)+'}\n';
};
