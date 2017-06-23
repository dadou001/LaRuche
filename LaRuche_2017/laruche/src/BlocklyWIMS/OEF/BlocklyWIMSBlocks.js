/**
 * @fileoverview Generating OEF for specific WIMS blocks.
 * @author buskulic@lapp.in2p3.fr (Damir Buskulic)
 */
'use strict';

goog.provide('Blockly.OEF.wims');

goog.require('Blockly.OEF');


Blockly.OEF['wims_editor'] = function(block) {
  var editorTmp = new SEditor(block.getFieldValue('WIMS_EDITOR'));
  return [editorTmp.to_variable_value(),1];
};

Blockly.OEF['wims_up_down_editor'] = function(block) {
  var editorTmp = new SEditor(block.getFieldValue('WIMS_EDITOR'));
  return editorTmp.to_variable_value()+'\n';
};

Blockly.OEF['wims_while'] = function(block) {
  var code = '';
  var innerString = block.getFieldValue('WIMS_EDITOR');
  // console.log(Blockly.OEF.statementToCode(block, 'HELLO'));
  var subCode =  Blockly.OEF.statementToCode(block, 'WHILE');
  // subCode = Blockly.OEF.addLoopTrap()
  // console.log(subCode);
  code = 'while ('+innerString+'){\n'+
          subCode+
          '}\n';
  return code;
};


Blockly.OEF['controls_repeat_ext'] = function(block) {
  // Repeat n times.
  if (block.getField('TIMES')) {
    // Internal number.
    var repeats = String(Number(block.getFieldValue('TIMES')));
  } else {
    // External number.
    var repeats = Blockly.OEF.valueToCode(block, 'TIMES',
        Blockly.OEF.ORDER_ASSIGNMENT) || '0';
  }
  var branch = Blockly.OEF.statementToCode(block, 'DO');
  branch = Blockly.OEF.addLoopTrap(branch, block.id);
  var code = '';
  var loopVar = Blockly.OEF.variableDB_.getDistinctName(
      'count', Blockly.Variables.NAME_TYPE);
  var endVar = repeats;
  if (!repeats.match(/^\w+$/) && !Blockly.isNumber(repeats)) {
    var endVar = Blockly.OEF.variableDB_.getDistinctName(
        'repeat_end', Blockly.Variables.NAME_TYPE);
    code += 'var ' + endVar + ' = ' + repeats + ';\n';
  }
  code += 'for (var ' + loopVar + ' = 0; ' +
      loopVar + ' < ' + endVar + '; ' +
      loopVar + '++) {\n' +
      branch + '}\n';
  return code;
};

Blockly.OEF['controls_repeat'] =
    Blockly.OEF['controls_repeat_ext'];

Blockly.OEF['controls_whileUntil'] = function(block) {
  // Do while/until loop.
  var until = block.getFieldValue('MODE') == 'UNTIL';
  var argument0 = Blockly.OEF.valueToCode(block, 'BOOL',
      until ? Blockly.OEF.ORDER_LOGICAL_NOT :
      Blockly.OEF.ORDER_NONE) || 'false';
  var branch = Blockly.OEF.statementToCode(block, 'DO');
  branch = Blockly.OEF.addLoopTrap(branch, block.id);
  if (until) {
    argument0 = '!' + argument0;
  }
  return 'while (' + argument0 + ') {\n' + branch + '}\n';
};

Blockly.OEF['controls_for'] = function(block) {
  // For loop.
  var variable0 = Blockly.OEF.variableDB_.getName(
      block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var argument0 = Blockly.OEF.valueToCode(block, 'FROM',
      Blockly.OEF.ORDER_ASSIGNMENT) || '0';
  var argument1 = Blockly.OEF.valueToCode(block, 'TO',
      Blockly.OEF.ORDER_ASSIGNMENT) || '0';
  var increment = Blockly.OEF.valueToCode(block, 'BY',
      Blockly.OEF.ORDER_ASSIGNMENT) || '1';
  var branch = Blockly.OEF.statementToCode(block, 'DO');
  branch = Blockly.OEF.addLoopTrap(branch, block.id);
  var code;
  if (Blockly.isNumber(argument0) && Blockly.isNumber(argument1) &&
      Blockly.isNumber(increment)) {
    // All arguments are simple numbers.
    var up = parseFloat(argument0) <= parseFloat(argument1);
    code = 'for (' + variable0 + ' = ' + argument0 + '; ' +
        variable0 + (up ? ' <= ' : ' >= ') + argument1 + '; ' +
        variable0;
    var step = Math.abs(parseFloat(increment));
    if (step == 1) {
      code += up ? '++' : '--';
    } else {
      code += (up ? ' += ' : ' -= ') + step;
    }
    code += ') {\n' + branch + '}\n';
  } else {
    code = '';
    // Cache non-trivial values to variables to prevent repeated look-ups.
    var startVar = argument0;
    if (!argument0.match(/^\w+$/) && !Blockly.isNumber(argument0)) {
      startVar = Blockly.OEF.variableDB_.getDistinctName(
          variable0 + '_start', Blockly.Variables.NAME_TYPE);
      code += 'var ' + startVar + ' = ' + argument0 + ';\n';
    }
    var endVar = argument1;
    if (!argument1.match(/^\w+$/) && !Blockly.isNumber(argument1)) {
      var endVar = Blockly.OEF.variableDB_.getDistinctName(
          variable0 + '_end', Blockly.Variables.NAME_TYPE);
      code += 'var ' + endVar + ' = ' + argument1 + ';\n';
    }
    // Determine loop direction at start, in case one of the bounds
    // changes during loop execution.
    var incVar = Blockly.OEF.variableDB_.getDistinctName(
        variable0 + '_inc', Blockly.Variables.NAME_TYPE);
    code += 'var ' + incVar + ' = ';
    if (Blockly.isNumber(increment)) {
      code += Math.abs(increment) + ';\n';
    } else {
      code += 'Math.abs(' + increment + ');\n';
    }
    code += 'if (' + startVar + ' > ' + endVar + ') {\n';
    code += Blockly.OEF.INDENT + incVar + ' = -' + incVar + ';\n';
    code += '}\n';
    code += 'for (' + variable0 + ' = ' + startVar + '; ' +
        incVar + ' >= 0 ? ' +
        variable0 + ' <= ' + endVar + ' : ' +
        variable0 + ' >= ' + endVar + '; ' +
        variable0 + ' += ' + incVar + ') {\n' +
        branch + '}\n';
  }
  return code;
};

Blockly.OEF['controls_forEach'] = function(block) {
  // For each loop.
  var variable0 = Blockly.OEF.variableDB_.getName(
      block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var argument0 = Blockly.OEF.valueToCode(block, 'LIST',
      Blockly.OEF.ORDER_ASSIGNMENT) || '[]';
  var branch = Blockly.OEF.statementToCode(block, 'DO');
  branch = Blockly.OEF.addLoopTrap(branch, block.id);
  var code = '';
  // Cache non-trivial values to variables to prevent repeated look-ups.
  var listVar = argument0;
  if (!argument0.match(/^\w+$/)) {
    listVar = Blockly.OEF.variableDB_.getDistinctName(
        variable0 + '_list', Blockly.Variables.NAME_TYPE);
    code += 'var ' + listVar + ' = ' + argument0 + ';\n';
  }
  var indexVar = Blockly.OEF.variableDB_.getDistinctName(
      variable0 + '_index', Blockly.Variables.NAME_TYPE);
  branch = Blockly.OEF.INDENT + variable0 + ' = ' +
      listVar + '[' + indexVar + '];\n' + branch;
  code += 'for (var ' + indexVar + ' in ' + listVar + ') {\n' + branch + '}\n';
  return code;
};

Blockly.OEF['controls_flow_statements'] = function(block) {
  // Flow statements: continue, break.
  switch (block.getFieldValue('FLOW')) {
    case 'BREAK':
      return 'break;\n';
    case 'CONTINUE':
      return 'continue;\n';
  }
  throw 'Unknown flow statement.';
};
