/// <reference path="AnswerBlock.ts"/>
class Answer{
  //Attributs
  private name:String;
  private id:String;
  private type:String;
  private value:any;
  private block_html:AnswerBlock;

  constructor(name,type,id){
    this.name = name;
    this.type = type;
    this.id = id;
    this.block_html = new AnswerBlock(id,type);
  }

  public get_block_html(){
    return this.block_html;
  }

  public change_id(new_id){
    this.id = new_id;
    this.get_block_html().change_id(new_id);
  }

}
