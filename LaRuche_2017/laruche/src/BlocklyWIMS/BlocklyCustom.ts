
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
        .appendField(new Blockly.FieldVariable(""), "VARIABLE_CHOICE")
    // this.appendDummyInput()
        .appendField("est de type ")
        .appendField(new Blockly.FieldDropdown([["Nombre réel","Real"], ["Nombre entier","Int"],["Nombre rationnel","Rational"],
                                                ["Matrice","Matrix"],["Texte","Text"],["Function","Fun"],["Nombre Complexe","Complex"]])
                                                            , "TYPE");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(100);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['wims_if'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("si")
        .appendField(new Blockly.FieldWIMSEditor("","testQuillInBlockly",false), "WIMS_EDITOR");
    this.appendStatementInput("DO")
        .setCheck(null)
        .appendField("faire");
    this.appendDummyInput()
        .appendField("sinon");
    this.appendStatementInput("ELSE")
        .setCheck(null)
        .appendField("faire");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['wims_comment'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("//")
        .appendField(new Blockly.FieldTextInput(""), "COMMENT");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
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
        .appendField(new Blockly.FieldDropdown([["Nombre réel","Real"], ["Nombre entier","Int"],["Nombre rationnel","Rational"],
                                                ["Matrice","Matrix"],["Texte","Text"],["Function","Fun"],["Nombre Complexe","Complex"]])
                                                            , "TYPE");
    this.appendDummyInput()
        .appendField("With the value")
        .appendField(new Blockly.FieldWIMSEditor("","testQuillInBlockly",false), "WIMS_EDITOR");
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
        .appendField(new Blockly.FieldWIMSEditor("","testQuillInBlockly",false), "WIMS_EDITOR");
    this.setOutput(true, null);
    this.setColour(300);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['wims_variable_editor'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("mettre")
        .appendField(new Blockly.FieldVariable(""), "VARIABLE_CHOICE")
        .appendField('à ')
        .appendField(new Blockly.FieldWIMSEditor("","testQuillInBlockly",false), "WIMS_EDITOR");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(300);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['wims_up_down_editor'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("OEF")
        .appendField(new Blockly.FieldWIMSEditor("","testQuillInBlockly",false), "WIMS_EDITOR");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(270);
    this.setTooltip('NOTIP');
    this.setHelpUrl('NOHELP');
  }
};

Blockly.Blocks['wims_repeat'] = {
  init: function() {
    this.appendValueInput("NUM")
        .setCheck(null)
        .appendField("Repeat ");
    this.appendDummyInput()
        .appendField("times");
    this.appendStatementInput("DO")
        .setCheck(null)
        .appendField("do");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['wims_for'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Pour")
        .appendField(new Blockly.FieldVariable(""), "VARIABLE_CHOICE");
    this.appendValueInput("START")
        .setCheck(null)
        .appendField("Allant de");
    this.appendValueInput("END")
        .setCheck(null)
        .appendField("à");
    this.appendValueInput("STEP")
        .setCheck(null)
        .appendField("par pas de");
    this.appendStatementInput("DO")
        .setCheck(null)
        .appendField("Faire");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['analyse_feedback'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Feedback when")
        .appendField(new Blockly.FieldWIMSEditor("","du quill",false), "WIMS_EDITOR");
    this.appendStatementInput("DO")
        .appendField('do')
        .setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['analyse_hint'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Hint")
        .appendField(new Blockly.FieldWIMSEditor("","du quill",true), "WIMS_EDITOR");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};
