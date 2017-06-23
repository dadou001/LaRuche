class Variable{
  private name:String;
  private type:typeVariable;
  private value;
  constructor(name:String,type:typeVariable){
    this.name=name;
    this.type=type;
  }
  public getName(){
    return this.name;
  }
  public getType(){
    return this.type;
  }
  public setType(type){
    this.type = type;
  }
  public getValue(){
    return this.value;
  }
  public setValue(val){
    this.value = val;
  }
  public toString(){
    return "Variable "+this.name+" of type "+ this.type
  }
}
