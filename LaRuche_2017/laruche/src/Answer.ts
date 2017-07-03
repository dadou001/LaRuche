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
    this.block_html = new AnswerBlock(name,id,type);
  }

  public get_block_html(){
    return this.block_html;
  }

  public get_type(){
    if(this.type != 'other')
      return this.type;
    else{
      console.log($('#ans_'+this.name+'_type').find('textarea'));
      return $('#ans_'+this.name+'_type').find('textarea').get(0).value;
    }
  }

  public get_option(){
    var result = "";
    var tab = $('#fieldset_ans_'+this.name).find('input:checked');
    // console.log($('#fieldset_ans_'+this.name).find('input:checked'));
    for(var i = 0;i<tab.length;i++){
      result += $('#fieldset_ans_'+this.name).find('input:checked').eq(i).val() + ",";

      // console.log(tab[i]);
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
    return this.block_html.editor.to_OEFcode().split("<p>").join("").split("</p>").join("").split("\n").join("");
  }

}
