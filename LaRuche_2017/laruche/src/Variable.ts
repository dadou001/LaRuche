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

var myV = new Variable("test1",typeVariable.Real);
console.log(myV.toString());
