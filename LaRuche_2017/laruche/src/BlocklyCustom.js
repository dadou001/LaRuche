Blockly.Blocks['wims_while'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("while")
            .appendField(new Blockly.FieldTextInput("true"), "WIMS_CONDITION");
        this.appendStatementInput("WHILE")
            .setCheck(null)
            .appendField("do");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(300);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};
