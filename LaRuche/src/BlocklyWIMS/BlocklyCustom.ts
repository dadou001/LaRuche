Blockly.Blocks['wims_start'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldLabel("","editor_title_block"), "START_TEXT");
    this.setNextStatement(true, null);
    this.setColour(0);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['wims_declaration'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldLabel(""), "DECLARATION_TEXT");
    this.appendStatementInput("DECLARATION")
        .setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(0);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['wims_while'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.WIMS_WHILE)
        .appendField(new Blockly.FieldTextInput("true"), "WIMS_EDITOR");
    this.appendStatementInput("WHILE")
        .setCheck(null)
        .appendField("Do");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(260);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['wims_change_type'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldVariable("i"), "VARIABLE_CHOICE")
    // this.appendDummyInput()
        .appendField(Blockly.Msg.WIMS_IS_TYPE)
        .appendField(new Blockly.FieldDropdown([[Blockly.Msg.WIMS_REAL_NUMBER,"real"],
                            [Blockly.Msg.WIMS_INTEGER_NUMBER,"integer"],
                            [Blockly.Msg.WIMS_RATIONAL_NUMBER,"rational"],
                            [Blockly.Msg.WIMS_MATRIX,"matrix"],
                            [Blockly.Msg.WIMS_TEXT,"text"],
                            [Blockly.Msg.WIMS_FUNCTION,"function"],
                            [Blockly.Msg.WIMS_COMPLEX_NUMBER,"complex"]])
                                                            , "TYPE");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(260);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['wims_if'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.WIMS_IF_CONDITION)
        .appendField(new Blockly.FieldWIMSEditor("","Quill Contents In Blockly",false,false), "WIMS_EDITOR");
    this.appendStatementInput("DO")
        .setCheck(null)
        .appendField(Blockly.Msg.WIMS_IF_CONDITION_DO);
    this.appendDummyInput()
        .appendField(Blockly.Msg.WIMS_IF_CONDITION_ELSE);
    this.appendStatementInput("ELSE")
        .setCheck(null)
        .appendField(Blockly.Msg.WIMS_IF_CONDITION_DO);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(245);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['wims_comment'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("//")
        .appendField(new Blockly.FieldTextInput(''), "COMMENT");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(245);
    this.setTooltip('');
    this.setHelpUrl('');
    this.getField("COMMENT").setValue('default');
  }
};

Blockly.Blocks['wims_define_variable'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldVariable("i"), "VARIABLE_CHOICE")
        .appendField(Blockly.Msg.WIMS_IS_TYPE)
    // this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([[Blockly.Msg.WIMS_REAL_NUMBER,"real"],
                                [Blockly.Msg.WIMS_INTEGER_NUMBER,"integer"],
                                [Blockly.Msg.WIMS_RATIONAL_NUMBER,"rational"],
                                [Blockly.Msg.WIMS_MATRIX,"matrix"],
                                [Blockly.Msg.WIMS_TEXT,"text"],
                                [Blockly.Msg.WIMS_FUNCTION,"function"],
                                [Blockly.Msg.WIMS_COMPLEX_NUMBER,"complex"]])
                                                            , "TYPE");
    this.appendDummyInput()
        .appendField(Blockly.Msg.WIMS_WITH_VALUE)
        .appendField(new Blockly.FieldWIMSEditor("","testQuillInBlockly",false,false), "WIMS_EDITOR");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(260);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['wims_editor'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldWIMSEditor("","Quill contents in blockly",false,false), "WIMS_EDITOR");
    this.setOutput(true, null);
    this.setColour(260);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['wims_variable_editor'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.WIMS_VARIABLE_SET)
        .appendField(new Blockly.FieldVariable('i'),'VARIABLE_CHOICE')
        .appendField(Blockly.Msg.WIMS_VARIABLE_TO)
        .appendField(new Blockly.FieldWIMSEditor("","Quill contents in blockly",false,false), "WIMS_EDITOR");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(260);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['wims_up_down_editor'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.WIMS_OEF_CODE);
    this.appendDummyInput()
        .appendField(new Blockly.FieldWIMSEditor("","Quill contents in blockly",false,false), "WIMS_EDITOR");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(0);
    this.setTooltip('NOTIP');
    this.setHelpUrl('NOHELP');
  }
};

Blockly.Blocks['wims_repeat'] = {
  init: function() {
    this.appendValueInput("NUM")
        .setCheck(null)
        .appendField(Blockly.Msg.WIMS_LOOP_REPEAT);
    this.appendDummyInput()
        .appendField(Blockly.Msg.WIMS_LOOP_TIMES);
    this.appendStatementInput("DO")
        .setCheck(null)
        .appendField("do");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(245);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['wims_for'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.WIMS_LOOP_FOR)
        .appendField(new Blockly.FieldVariable('i'), "VARIABLE_CHOICE");
    this.appendValueInput("START")
        .setCheck(null)
        .appendField(Blockly.Msg.WIMS_LOOP_FROM);
    this.appendValueInput("END")
        .setCheck(null)
        .appendField(Blockly.Msg.WIMS_LOOP_TO);
    this.appendValueInput("STEP")
        .setCheck(null)
        .appendField(Blockly.Msg.WIMS_LOOP_STEP);
    this.appendStatementInput("DO")
        .setCheck(null)
        .appendField(Blockly.Msg.WIMS_LOOP_DO);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(245);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['analyse_feedback'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.WIMS_FEEDBACK);
    this.appendDummyInput()
        .appendField(Blockly.Msg.WIMS_FEEDBACK_IF)
        .appendField(new Blockly.FieldWIMSEditor("","Quill contents in blockly",false,true), "WIMS_EDITOR_TEST");
    this.appendDummyInput()
        .appendField(Blockly.Msg.WIMS_FEEDBACK_SEND)
        .appendField(new Blockly.FieldWIMSEditor("","Quill contents in blockly",true,true), "WIMS_EDITOR");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(245);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['analyse_hint'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.WIMS_HINT);
    this.appendDummyInput()
        .appendField(new Blockly.FieldWIMSEditor("","Quill contents in blockly",true,true), "WIMS_EDITOR");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(245);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

/**
 * ========================La Ruche ============================
 * ==== override the following function in Blockly to adapt ====
 * ==== the "Variables" flyout in the Toolbox               ====
 * =============================================================
 * Construct the blocks required by the flyout for the variable category.
 * @param {!Blockly.Workspace} workspace The workspace containing variables.
 * @return {!Array.<!Element>} Array of XML block elements.
 */
Blockly.Variables.flyoutCategory = function(workspace) {
  var variableList = workspace.variableList;
  variableList.sort(goog.string.caseInsensitiveCompare);

  var xmlList = [];
  var button = goog.dom.createDom('button');
  button.setAttribute('text', Blockly.Msg.NEW_VARIABLE);
  button.setAttribute('callbackKey', 'CREATE_VARIABLE');

  workspace.registerButtonCallback('CREATE_VARIABLE', function(button) {
    Blockly.Variables.createVariable(button.getTargetWorkspace());
  });

  xmlList.push(button);

  if (variableList.length > 0) {
    for (var i = 0; i < variableList.length; i++) {
      if (Blockly.Blocks['variables_get']) {
        var blockText = '<xml>' +
            '<block type="variables_get" gap="8">' +
            '<field name="VAR">' + variableList[i] + '</field>' +
            '</block>' +
            '</xml>';
        var block = Blockly.Xml.textToDom(blockText).firstChild;
        xmlList.push(block);
      }
    }
  }
  return xmlList;
};
