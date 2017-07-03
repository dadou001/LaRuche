/// <reference path="SEditor.ts"/>
/// <reference path="../js_tools/quill/quill.min.js"/>
/// <reference path="../js_tools/vendor/jquery.js"/>
/// <reference path="../node_modules/@types/quill/index.d.ts"/>



class AnswerBlock{
  //Attributs
  private html:string;
  public editor:SEditor;
  private id:string;
  private name:string;
  all_type = {'numeric':{'coma':'Utiliser des virgules',
                          'noanalyze':'Sans affichage de l\'analyse réponse'},
              'function':{'noanalyze':'Sans affichage de l\'analyse réponse'},
              'range':{'noanalyze':'Sans affichage de l\'analyse réponse'},
              'menu':{'split':'Autoriser les réponses partielles',
                      'shuffle':'Mélanger les réponses',
                      'multiple': 'Plusieurs choix autorisés',
                      'sort': 'Réponse ordonnées par ordre alpha.',
                      'noanalyze':'Sans affichage de l\'analyse réponse'},
              'other':{}
            };
  //Constructeur
  constructor(name,id,type){
      this.name = name;
      this.id = id;
      this.html = this.construct_basic_html();
      $('#answer_list_analyse').append(this.html);
      // document.getElementById('answer_list_analyse').innerHTML += this.html;
      // this.change_to_type(type);
      // this.create_editor();
      //$('#'+this.get_div_id_change()).addClass('answer_hidden');
  }

  // constructor(id,type){
  //     this.id = id;
  //     this.html = this.construct_basic_html();
  //     // document.getElementById('answer_list_analyse').innerHTML += this.html;
  //     // this.editor = new SEditor(new Quill('#'+this.get_editeur_div_id(), {
  //     // 	modules: {
  //     // 		toolbar: false
  //     // 	},
  //     // 	placeholder: 'Compose an exercise...',
  //     // 	theme: 'snow'
  //     // }));
  //     //this.change_to_type(type);
  //     //$('#'+this.get_div_id_change()).addClass('answer_hidden');
  // }

  //Methodes public
  public change_to_type(type){
    if(type == 'other'){
      this.html = this.change_html_fieldset(this.generate_fieldset_code(type));
      this.update_html(true);
    }
    else {
      this.html = this.change_html_fieldset(this.generate_fieldset_code(type));
      this.update_html(false);
    }
  }

  //Getteurs/stteurs
  public get_html(){
    return this.html;
  }

  public get_editeur_div_id(){
    return 'editor_'+this.name;
  }

  public get_editor(){
    return this.editor;
  }

  public get_div_id_change(){
    return 'ans_'+this.id;
  }

  public set_editor(editor){
    this.editor = editor;
  }

  public create_editor(){
    this.editor = new SEditor(new Quill('#'+this.get_editeur_div_id(), {
    	modules: {
    		toolbar: false
    	},
    	placeholder: 'Compose an exercise...',
    	theme: 'snow'
    }));
  }

  public destroy(){
    this.html = "";
    this.destroy_html();
    this.editor = null;
    this.id = "JE DEVRAIS APS ETRE LA";
  }

  //Methodes private
  private construct_basic_html(){
    var result = '<div class="large-12 columns callout" id="answer_all_'+this.name+'">'
  		+'<div class="large-11 columns">'
  		+this.name
  			+'<label>Answer Type'
  				+'<select oninput="$(\'#ans_'+this.name+'\').removeClass(\'answer_hidden\');change_type_answer(\''+this.name+'\',this.value,answer_List)">'//Rajouter le moyen de changer le type
            +'<option value="numeric">Numeric</option>'
  					+'<option value="function">Function</option>'
  					+'<option value="range">Range</option>'
  					+'<option value="menu">Menu</option>'
            +'<option value="other">Other</option>'
  				+'</select>'
  			+'</label>'
  			+'<div id="ans_'+this.name+'">'
          +'<div id="ans_'+this.name+'_type"></div>'
  				+'Chaine d\'analyse'
  				+'<div id="editor_'+this.name+'">'
  				+'</div>'
  				+'<fieldset id="fieldset_ans_'+this.name+'">'
  					+'<legend>Option(s)</legend>'
  					+'<input id="checkbox1" type="checkbox"><label for="checkbox1">Option 1</label>'
  					+'<input id="checkbox2" type="checkbox"><label for="checkbox2">Option 2</label>'
  					+'<input id="checkbox3" type="checkbox"><label for="checkbox3">Option 3</label>'
  				+'</fieldset>'
  			+'</div>'
  			+'<div class="large-1 columns">'
  				+'<button class="close-button" onclick="destroy_answer(\''+this.name+'\');update_variables_answers_view(\'card_Analyse_Variable\',variable_List,answer_List)" aria-label="Close alert" type="button">'
  					+'<span aria-hidden="true">&times;</span>'
  				+'</button>'
  			+'</div>'
  		+'</div>'
  	+'</div>';
  	return result;
  }



  private change_html_fieldset(str){
    var result = this.html;
    var start = this.html.search("<fieldset");
    var end = this.html.search("</fieldset>");
    result = this.html.substring(0,start)+str+this.html.substring(end+11,this.html.length);
    return result;
  }

  // private generate_numeric_fieldset(){
  //   var result = '<fieldset id="fieldset_ans_'+this.name+'">'
  //     +'<legend>Option(s)</legend>'
  //     +'<input id="checkbox_'+this.name+'_coma" value="coma" type="checkbox"><label for="checkbox_'+this.name+'_coma">virgule (et non point)</label>'
  //     +'<input id="checkbox_'+this.name+'_noanalyze" value="noanalyze" type="checkbox"><label for="checkbox_'+this.name+'_noanalyze">sans affichage de l\'analyse réponse</label>'
  //   +'</fieldset>';
  //   return result;
  // }
  //
  // private generate_function_fieldset(){
  //   var result = '<fieldset id="fieldset_ans_'+this.name+'">'
  //     +'<legend>Option(s)</legend>'
  //     +'<input id="checkbox_'+this.name+'_noanalyze" value="noanalyze" type="checkbox"><label for="checkbox_'+this.name+'_noanalyze">sans affichage de l\'analyse réponse</label>'
  //   +'</fieldset>';
  //   return result;
  // }
  //
  // private generate_range_fieldset(){
  //   var result = '<fieldset id="fieldset_ans_'+this.name+'">'
  //     +'<legend>Option(s)</legend>'
  //     +'<input id="checkbox_'+this.name+'_noanalyze" value="noanalyze" type="checkbox"><label for=""checkbox_'+this.name+'_noanalyze"">sans affichage de l\'analyse réponse</label>'
  //   +'</fieldset>';
  //   return result;
  // }

  // private generate_menu_fieldset(){
  //   var result = '<fieldset id="fieldset_ans_'+this.name+'">'
  //     +'<legend>Option(s)</legend>'
  //     +'<input id="checkbox_'+this.name+'_partial_answer" value="partialAnswer" type="checkbox"><label for="checkbox_'+this.name+'_partial_answer">Accepte les réponses partielles</label>'
  //     +'<input id="checkbox_'+this.name+'_shuffle" value="shuffle" type="checkbox"><label for="checkbox_'+this.name+'_shuffle">Bat aléatoirement les propositions</label>'
  //     +'<input id="checkbox_'+this.name+'_multiple_choice" value="multipleChoice" type="checkbox"><label for="checkbox_'+this.name+'_multiple_choice">Choix multiple</label>'
  //     +'<input id="checkbox_'+this.name+'_ordered_choice" value="ordered" type="checkbox"><label for="checkbox_'+this.name+'_ordered_choice">Tri les propositions</label>'
  //     +'<input id="checkbox_'+this.name+'_noanalyze" value="noanalyze" type="checkbox"><label for=""checkbox_'+this.name+'_noanalyze"">sans affichage de l\'analyse réponse</label>'
  //   +'</fieldset>';
  //   return result;
  // }

  private update_html(textAreaType){
    var result = "";
    var start = this.html.search('<fieldset');
    var end = this.html.search('</fieldset>');
    result = this.html.substring(start,end+11);
    $('#fieldset_ans_'+this.name).replaceWith(result);
    if(textAreaType){
      $('#ans_'+this.name+'_type').html('<textarea placeholder="Type"></textarea>');
    }
    else{
      $('#ans_'+this.name+'_type').html('');
    }
  }

  private destroy_html(){
    $('#answer_all_'+this.name).remove();
  }

  private update_all_html(){
    // var number = Number(this.id.substring(6,7))-1;
    // console.log($('#answer_list_analyse .callout').eq(number).get(0));
    // if($('#answer_list_analyse .callout').eq(number).get(0) == undefined){
    //   $('#answer_list_analyse .callout').append(this.html);
    // }
    // else {
    $('#answer_all_'+this.name).replaceWith(this.html);
    // }
  }

  private generate_fieldset_code(type){
    var result = '<fieldset id="fieldset_ans_'+this.name+'">'
      +'<legend>Option(s)</legend>';
    for(var key in this.all_type[type]){
      result += '<input value="'+key+'" type="checkbox"><label>'+this.all_type[type][key]+'</label>'
    }
    result += '</fieldset>'
    return result;
  }
}
