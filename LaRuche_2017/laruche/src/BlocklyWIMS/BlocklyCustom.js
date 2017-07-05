Blockly.Blocks['wims_while'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(Blockly.Msg.WIMS_WHILE)
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
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldVariable(""), "VARIABLE_CHOICE")
            .appendField(Blockly.Msg.WIMS_IS_TYPE)
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.WIMS_REAL_NUMBER, "real"],
            [Blockly.Msg.WIMS_INTEGER_NUMBER, "integer"],
            [Blockly.Msg.WIMS_RATIONAL_NUMBER, "rational"],
            [Blockly.Msg.WIMS_MATRIX, "matrix"],
            [Blockly.Msg.WIMS_TEXT, "text"],
            [Blockly.Msg.WIMS_FUNCTION, "function"],
            [Blockly.Msg.WIMS_COMPLEX_NUMBER, "complex"]]), "TYPE");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(100);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};
Blockly.Blocks['wims_if'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(Blockly.Msg.WIMS_IF_CONDITION)
            .appendField(new Blockly.FieldWIMSEditor("", "Quill Contents In Blockly", false), "WIMS_EDITOR");
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
        this.setColour(230);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};
Blockly.Blocks['wims_comment'] = {
    init: function () {
        var textInput = new Blockly.FieldTextInput('');
        textInput.setText('Doesn\'t appear');
        this.appendDummyInput()
            .appendField("//")
            .appendField(textInput, "COMMENT");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip('');
        this.setHelpUrl('');
        textInput.setText('default');
    }
};
Blockly.Blocks['wims_define_variable'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldVariable(""), "VARIABLE_CHOICE")
            .appendField(Blockly.Msg.WIMS_IS_TYPE)
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.WIMS_REAL_NUMBER, "real"],
            [Blockly.Msg.WIMS_INTEGER_NUMBER, "integer"],
            [Blockly.Msg.WIMS_RATIONAL_NUMBER, "rational"],
            [Blockly.Msg.WIMS_MATRIX, "matrix"],
            [Blockly.Msg.WIMS_TEXT, "text"],
            [Blockly.Msg.WIMS_FUNCTION, "function"],
            [Blockly.Msg.WIMS_COMPLEX_NUMBER, "complex"]]), "TYPE");
        this.appendDummyInput()
            .appendField(Blockly.Msg.WIMS_WITH_VALUE)
            .appendField(new Blockly.FieldWIMSEditor("", "testQuillInBlockly", false), "WIMS_EDITOR");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(100);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};
Blockly.Blocks['wims_editor'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldWIMSEditor("", "Quill contents in blockly", false), "WIMS_EDITOR");
        this.setOutput(true, null);
        this.setColour(300);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};
Blockly.Blocks['wims_variable_editor'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(Blockly.Msg.WIMS_VARIABLE_SET)
            .appendField(new Blockly.FieldVariable(""), "VARIABLE_CHOICE")
            .appendField(Blockly.Msg.WIMS_VARIABLE_TO)
            .appendField(new Blockly.FieldWIMSEditor("", "Quill contents in blockly", false), "WIMS_EDITOR");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(300);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};
Blockly.Blocks['wims_up_down_editor'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(Blockly.Msg.WIMS_OEF_CODE);
        this.appendDummyInput()
            .appendField(new Blockly.FieldWIMSEditor("", "Quill contents in blockly", false), "WIMS_EDITOR");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(270);
        this.setTooltip('NOTIP');
        this.setHelpUrl('NOHELP');
    }
};
Blockly.Blocks['wims_repeat'] = {
    init: function () {
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
        this.setColour(230);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};
Blockly.Blocks['wims_for'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(Blockly.Msg.WIMS_LOOP_FOR)
            .appendField(new Blockly.FieldVariable(""), "VARIABLE_CHOICE");
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
        this.setColour(230);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};
Blockly.Blocks['analyse_feedback'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(Blockly.Msg.WIMS_FEEDBACK);
        this.appendDummyInput()
            .appendField(Blockly.Msg.WIMS_FEEDBACK_IF)
            .appendField(new Blockly.FieldWIMSEditor("", "Quill contents in blockly", false), "WIMS_EDITOR_TEST");
        this.appendDummyInput()
            .appendField(Blockly.Msg.WIMS_FEEDBACK_SEND)
            .appendField(new Blockly.FieldWIMSEditor("", "Quill contents in blockly", true), "WIMS_EDITOR");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};
Blockly.Blocks['analyse_hint'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(Blockly.Msg.WIMS_HINT);
        this.appendDummyInput()
            .appendField(new Blockly.FieldWIMSEditor("", "Quill contents in blockly", true), "WIMS_EDITOR");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};
