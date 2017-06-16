class Variable{
  private name:String;
  private type:typeVariable;
  private value;
  constructor(name:String,type:typeVariable){
    this.name=name;
    this.type=type;
  }
  getName(){
    return this.name;
  }
  getType(){
    return this.type;
  }
  getValue(){
    return this.value;
  }
  toString(){
    return "Variable "+this.name+" of type "+ this.type
  }
}
