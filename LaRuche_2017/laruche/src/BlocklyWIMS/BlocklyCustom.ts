
Blockly.Blocks['wims_while'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("while")
        .appendField(new Blockly.FieldTextInput("true"), "WIMS_EDITOR");
    this.appendStatementInput("WHILE")
        .setCheck(null)
        .appendField("Do");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(300);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['wims_change_type'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Change ")
        .appendField(new Blockly.FieldVariable(""), "VARIABLE_CHOICE")
    // this.appendDummyInput()
        .appendField("type to ")
        .appendField(new Blockly.FieldDropdown([["Real","Real"], ["Integer","Int"]]), "TYPE");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(100);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['wims_define_variable'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Change ")
        .appendField(new Blockly.FieldVariable(""), "VARIABLE_CHOICE")
    // this.appendDummyInput()
        .appendField("type to ")
        .appendField(new Blockly.FieldDropdown([["Real","Real"], ["Integer","Int"]]), "TYPE");
    this.appendDummyInput()
        .appendField("With the value")
        .appendField(new Blockly.FieldWIMSEditor("","testQuillInBlockly"), "WIMS_EDITOR");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(100);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['wims_editor'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldWIMSEditor("","testQuillInBlockly"), "WIMS_EDITOR");
    this.setOutput(true, null);
    this.setColour(300);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['wims_up_down_editor'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldWIMSEditor("","testQuillInBlockly"), "WIMS_EDITOR");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(270);
    this.setTooltip('NOTIP');
    this.setHelpUrl('NOHELP');
  }
};