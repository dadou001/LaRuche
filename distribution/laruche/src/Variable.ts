class Variable{
  private name:String;
  private type:String;
  private value:any;
  public mTypeDeclarationBlock:any;
  constructor(name,type){
    this.name=name;
    this.type=type;
    // Build and insert the type declaration block inside the
    // Blockly preparation editor
  }

  public init() {
    if (!this.mTypeDeclarationBlock) {
      this.mTypeDeclarationBlock = prepEditor.mBlocklyWorkspace.newBlock('wims_change_type');
      this.mTypeDeclarationBlock.setFieldValue(this.name,"VARIABLE_CHOICE");
      this.mTypeDeclarationBlock.setDeletable(false);
      this.mTypeDeclarationBlock.setMovable(false);
      this.mTypeDeclarationBlock.initSvg();
      this.mTypeDeclarationBlock.render();
      var declarationBlocks = prepEditor.mDeclarationBlock.getChildren();
      if (declarationBlocks.length==0) {
        var parentConnection = prepEditor.mDeclarationBlock.inputList[1].connection;
      } else {
        var previousBlock = declarationBlocks[0];
        while (previousBlock.getNextBlock()) {
          previousBlock = previousBlock.getNextBlock();
        }
        var parentConnection = previousBlock.nextConnection;
      }
      var childConnection = this.mTypeDeclarationBlock.previousConnection;
      parentConnection.connect(childConnection);

      // update the type in this "variable" object
      // when changed in the dropdown menus
      var varTypeChanged = this;
      var typeDeclarationBlock = this.mTypeDeclarationBlock;
      this.mTypeDeclarationBlock.setOnChange(function(changeEvent) {
        varTypeChanged.type = typeDeclarationBlock.getFieldValue('TYPE');
      });
    }
  }

  public getName(){
    return this.name;
  }

  public getType(){
    return this.type;
  }

  public getTypeDeclarationBlock(){
    return this.mTypeDeclarationBlock;
  }

  public setType(type){
    this.type = type;
    if (this.mTypeDeclarationBlock) this.setTypeInDeclaration();
  }

  public setTypeInDeclaration(){
    this.mTypeDeclarationBlock.getField('TYPE').setValue(this.type);
  }

  public getValue(){
    return this.value;
  }

  public setValue(val){
    this.value = val;
  }

  public setName(name){
    this.name = name;
  }

  public toString(){
    return "Variable "+this.name+" of type "+ this.type
  }
}
