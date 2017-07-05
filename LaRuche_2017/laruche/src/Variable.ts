class Variable{
  private name:String;
  private type:String;
  private value:any;
  constructor(name:String,type:String){
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

  public setName(name){
    this.name = name;
  }

  public toString(){
    return "Variable "+this.name+" of type "+ this.type
  }

  // public toJSON(){
  //   // var result = '';
  //   // result = this.name+'{\n'+
  //   //             '\tname: '+this.name+',\n'+
  //   //             '\ttype: '+this.type+',\n'+
  //   //             '\tvalue: '+this.value+'\n'+
  //   //           '}';
  //   // return result;
  //   return JSON.stringify(this);
  // }
}
