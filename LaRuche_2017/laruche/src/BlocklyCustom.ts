
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
