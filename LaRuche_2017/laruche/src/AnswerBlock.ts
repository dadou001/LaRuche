
class AnswerBlock{
  //Attributs
  private html:String;
  private editor:SEditor;
  private id:String;
  //Constructeur
  constructor(id,quill){
      this.id = id;
      this.html = this.construct_basic_html();
  }

  //Methodes public
  public change_to_type(type){
    switch(type){
      case 'numeric':
        this.html = this.change_html_fieldset(this.generate_numeric_fieldset());
        break;
      case 'function':
        this.html = this.change_html_fieldset(this.generate_function_fieldset());
        break;
      case 'range':
        this.html = this.change_html_fieldset(this.generate_range_fieldset());
        break;
      case 'menu':
        this.html = this.change_html_fieldset(this.generate_menu_fieldset());
        break;
    }
  }

  //Getteurs/stteurs
  public get_html(){
    return this.html;
  }

  public get_editeur_div_id(){
    return 'editor_'+this.id;
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

  //Methodes private
  private construct_basic_html(){
    var result = '<div class="large-12 columns callout">'
  		+'<div class="large-11 columns">'
  		+'Answer '+this.id
  			+'<label>Answer Type'
  				+'<select oninput="$(\'#ans_'+this.id+'\').removeClass(\'answer_hidden\');">'
            +'<option value="nothing"></option>'
            +'<option value="Numeric">Numeric</option>'
  					+'<option value="Function">Function</option>'
  					+'<option value="range">Range</option>'
  					+'<option value="menu">Menu</option>'
  				+'</select>'
  			+'</label>'
  			+'<div id="ans_'+this.id+'" class="answer_hidden">'
  				+'Chaine d\'analyse'
  				+'<div id="editor_'+this.id+'">'
  				+'</div>'
  				+'<fieldset id="fieldset_ans_'+this.id+'">'
  					+'<legend>Option(s)</legend>'
  					+'<input id="checkbox1" type="checkbox"><label for="checkbox1">Option 1</label>'
  					+'<input id="checkbox2" type="checkbox"><label for="checkbox2">Option 2</label>'
  					+'<input id="checkbox3" type="checkbox"><label for="checkbox3">Option 3</label>'
  				+'</fieldset>'
  			+'</div>'
  			+'<div class="large-1 columns">'
  				+'<button class="close-button" aria-label="Close alert" type="button">'
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

  private generate_numeric_fieldset(){
    var result = '<fieldset id="fieldset_ans_'+this.id+'">'
      +'<legend>Option(s)</legend>'
      +'<input id="checkbox_'+this.id+'_coma" type="checkbox"><label for="checkbox1">virgule (et non point)</label>'
      +'<input id="checkbox_'+this.id+'_noanalyze" type="checkbox"><label for="checkbox2">sans affichage de l\'analyse réponse</label>'
    +'</fieldset>';
    return result;
  }

  private generate_function_fieldset(){
    var result = '<fieldset id="fieldset_ans_'+this.id+'">'
      +'<legend>Option(s)</legend>'
      +'<input id="checkbox_'+this.id+'_noanalyze" type="checkbox"><label for="checkbox2">sans affichage de l\'analyse réponse</label>'
    +'</fieldset>';
    return result;
  }

  private generate_range_fieldset(){
    var result = '<fieldset id="fieldset_ans_'+this.id+'">'
      +'<legend>Option(s)</legend>'
      +'<input id="checkbox_'+this.id+'_noanalyze" type="checkbox"><label for="checkbox2">sans affichage de l\'analyse réponse</label>'
    +'</fieldset>';
    return result;
  }

  private generate_menu_fieldset(){
    var result = '<fieldset id="fieldset_ans_'+this.id+'">'
      +'<legend>Option(s)</legend>'
      +'<input id="checkbox_'+this.id+'_partial_answer" type="checkbox"><label for="checkbox1">Accepte les réponses partielles</label>'
      +'<input id="checkbox_'+this.id+'_shuffle" type="checkbox"><label for="checkbox1">Bat aléatoirement les propositions</label>'
      +'<input id="checkbox_'+this.id+'_multiple_choice" type="checkbox"><label for="checkbox1">Choix multiple</label>'
      +'<input id="checkbox_'+this.id+'_ordered_choice" type="checkbox"><label for="checkbox1">Tri les propositions</label>'
      +'<input id="checkbox_'+this.id+'_noanalyze" type="checkbox"><label for="checkbox2">sans affichage de l\'analyse réponse</label>'
    +'</fieldset>';
    return result;
  }
}
