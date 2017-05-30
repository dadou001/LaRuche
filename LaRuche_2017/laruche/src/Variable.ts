class Variable{
  private name:String;
  private type:typeVariable;
  constructor(name:String,type:typeVariable){
    this.name=name;
    this.type=type;
  }
  getName(){
    return this.name;
  }
  toString(){
    return "Variable "+this.name+" of type "+ this.type
  }
}
