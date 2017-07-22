/// <reference path="AnswerBlock.ts"/>
class Answer{
  //Attributs
  private name:String;
  private type:String;
  private value:any;
  private length:string;
  private sub_type:string;
  private block_html:AnswerBlock;

  constructor(name,type){
    this.name = name;
    this.type = type;
    this.block_html = new AnswerBlock(name,type);
    this.length = '10';
    this.sub_type = null;
  }

  public get_block_html(){
    return this.block_html;
  }

  public get_type(){
    if(this.type != 'other')
      return this.type;
    else{
      return jQuery('#ans_'+this.name+'_type').find('textarea').get(0).value;
    }
  }

  public set_sub_type(type){
    this.sub_type = type;
  }

  public get_option(){
    var result = "";
    var tab = jQuery('#fieldset_ans_'+this.name).find('input:checked');
    for(var i = 0;i<tab.length;i++){
      result += jQuery('#fieldset_ans_'+this.name).find('input:checked').eq(i).val() + ",";
    }
    if(result.length > 0){
      result = result.substring(0,result.length-1);
      result = "{option = "+result+"}";
    }
    return result;
  }

  // public change_id(new_id){
  //   this.id = new_id;
  //   this.get_block_html().change_id(new_id);
  // }

  public to_OEF(){
    return this.block_html.get_editor().to_OEFcode().split("<p>").join("").split("</p>").join("").split("\n").join("");
  }

}
