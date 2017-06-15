
$(document).ready();

$(document).foundation();

var variable_List = {};
var answer_List = {};
var prepEditor;

function change_onglet(name) {
	$('#RId_Onglet_'+anc_onglet).removeClass('RCl_Onglet_Affiche').addClass('RCl_Onglet_Cache');
	$('#RId_Onglet_'+name).removeClass('RCl_Onglet_Cache').addClass('RCl_Onglet_Affiche');
	$('#RId_Contenu_Onglet_'+anc_onglet).addClass('RCl_Contenu_Onglet_Cache');
	$('#RId_Contenu_Onglet_'+name).removeClass('RCl_Contenu_Onglet_Cache');
	anc_onglet = name;
	if (typeof(prepEditor)!='undefined') {
		prepEditor.onResize();
		Blockly.svgResize(prepEditor.mBlocklyWorkspace);
	}
}

var anc_onglet = 'Enonce';
change_onglet(anc_onglet);

// hljs.configure({   // optionally configure hljs -> ask Bernadette for OEF definition file
//   languages: ['HTML']
// });

var quill = new Quill('#editor-enonce', {
	modules: {
		formula: true,
		// syntax: true,
		toolbar: '#toolbar-container'
	},
	placeholder: 'Compose an exercise...',
	theme: 'snow'
});

var quill_EnTete = new Quill('#editor-EnTete', {
	modules: {
		toolbar: false
	},
	placeholder: 'Compose an exercise...',
	theme: 'snow'
});

/**********************************************************/
var jerome = new Answer('jerome','numeric','reply_1');
jerome.get_block_html().create_editor();
answer_List['reply_1'] = jerome;
var jerome2 = new Answer('jerome2','function','reply_2');
answer_List['reply_2'] = jerome2;
var jerome3 = new Answer('jerome3','menu','reply_3');
answer_List['reply_3'] = jerome3;
var jerome4 = new Answer('jerome4','range','reply_4');
answer_List['reply_4'] = jerome4;
jerome.get_block_html().create_editor();
jerome2.get_block_html().create_editor();
jerome3.get_block_html().create_editor();
jerome4.get_block_html().create_editor();
jerome.get_block_html().get_editor().add_variable("1");
jerome2.get_block_html().get_editor().add_variable("2");
jerome3.get_block_html().get_editor().add_variable("3");
jerome4.get_block_html().get_editor().add_variable("4");
// clean_answer_list(answer_List);



/**********************************************************/

var editor_EnTete = new SEditor(quill_EnTete);
var editor_Enonce = new SEditor(quill);
/* CONFIGURATION DU QUILL DE L'ENTETE, VARIABLE GLOBAL = MOCHE*/
quill_EnTete.format('code-block',true);
/* SE DEMENER POUR ENLEVER CES VARIABLES GLOBALES */

function add_answer(editor,ans_list){
	//AJOUTER A LA LISTE DE VARIABLES AUSSI
	editor.focus();
	var positionSelection = editor.getSelection(); //On obtient la sélection de l'utilisateur
	if (positionSelection.length == 0){
		editor.insertEmbed(positionSelection.index,'answerImage','reply'+(ans_list.length+1));
		ans_list.push(new Answer('reply'+(ans_list.length+1)));
	}
	else{

	}
}

function test_valid_expression(str){
	var patt = /^[a-zA-Z][a-zA-Z0-9-]*$/;
	return patt.test(str);
}

function create_variable_editor(id_select_type_popup,id_input_name_popup,index){
	//On récupère le type de la variable_List
	var type = document.getElementById(id_select_type_popup).options[document.getElementById(id_select_type_popup).selectedIndex].value;
	//On récupère le nom de la variable
	var name = document.getElementById(id_input_name_popup).value;
	if(test_valid_expression(name)){
		quill.insertEmbed(index, 'VariableImage',name);//On insère la variable dans l'éditeur sous la forme d'un Embed
		if (variable_List[name] == null){ //Si la variable n'existe pas encore
			variable_List[name] = new Variable(name,type); //On ajoute la nouvelle variable à notre liste de variable
			update_variables_view("card_Enonce_Variable",variable_List); //On met à jour l'affichage ds variables
			$('#popup').toggleClass('popup_variable_visible');//On désactive le popup
		}
	}
	else{
		window.alert("Le nom de la variable ne doit contenir que des caractères alphanumériques !");
	}
}

function change_to_var(editor,var_list){
	editor.focus();
	var positionSelection = editor.getSelection(); //On obtient la sélection de l'utilisateur
	if (positionSelection.length == 0){
		//Ajouter un popup pour créer directement la variable
		create_variable_choice_popup("variable_creation_button",positionSelection.index);
	}
	else{
		var nameVar = editor.getText(positionSelection.index,positionSelection.length); //On récupère le contenu de la séléction
		if (test_valid_expression(nameVar)){
			editor.deleteText(positionSelection.index,positionSelection.length); //On enlève le texte séléctionné
			editor.insertEmbed(positionSelection.index, 'VariableImage',nameVar); //On le remplace par Variable possédant le nom que l'utilisateur avait sélectionné
			if (var_list[nameVar] == null){
				var_list[nameVar] = new Variable(nameVar,typeVariable.Real);
				update_variables_view("card_Enonce_Variable",var_list);
			}
		}
	}
}

function check_answer_tab(answer_tab){
	var answer_count = editor_Enonce.count_answer();
	var dif = answer_tab.length - answer_count;
	for(var i = 0;i<dif;i++){
		answer_tab.splice(answer_count - dif,1);
	}
	return answer_tab;
}


 /****************************EN CHANTIER*****************************/
function change_type_answer(id_answer,type,ans_list){
 	ans_list[id_answer].get_block_html().change_to_type(type);
}

// function add_new_answer(number){
//
// }

function delete_element_answer_list(id){
	answer_List[id].get_block_html().destroy();
	answer_List = clean_answer_list(answer_List);
}

function clean_answer_list(ans_list){
	var result = {};
	var vrai_id = "";
	var counter = 1;
	for(var key in ans_list){
		if(ans_list[key].get_block_html().get_html() != ""){
			vrai_id = "reply_"+counter;
			result[vrai_id] = ans_list[key];
			result[vrai_id].change_id(vrai_id);
			counter++;
		}
	}
	return result;

}
 /****************************FIN DU CHANTIER*****************************/

// function create_html_analyse_answer(){
// 	var result = "";
//
// }

function create_list_variables(variable_list){
	var result = "";
	for(var key in variable_list){
		result += '<li style="margin-bottom:5px;position:relative;"><span class="surligne_Variable" onclick="editor_Enonce.add_variable(\''+key+'\');">'+key+'</span><button id="button_destroy_'+key+'" class="close-button" aria-label="Close alert" type="button" style="float:right;clear:right;font-size:1.6em;top:0px;" onclick="destroy_variable(this.id,variable_List);"><span aria-hidden="true">&times;</span></button></li>'
	}
	return result;
}

function create_list_answer(answer_tab){
	var result = "";
	var key = "";
	for(var i = 0;i<answer_tab.length;i++){
		key = "reply"+(i+1);
		result += '<li style="margin-bottom:5px;position:relative;"><span class="surligne_Variable" onclick="editor_Enonce.add_variable(\''+key+'\');">'+key+'</span><button id="button_destroy_'+key+'" class="close-button" aria-label="Close alert" type="button" style="float:right;clear:right;font-size:1.6em;top:0px;" onclick="destroy_variable(this.id,variable_List);"><span aria-hidden="true">&times;</span></button></li>'
	}
	return result;
}

function update_variables_view(id_to_updt, variable_list){
	var result = "";
	result = "<ul class='variable_List_Enonce'>"+create_list_variables(variable_list)+"</ul>";
	document.getElementById(id_to_updt).innerHTML = result;
}

function update_variables_answers_view(id_to_updt, variable_list,answer_tab){
	var result = "";
	result = "<ul class='variable_List_Enonce'>"+create_list_variables(variable_list)+create_list_answer(answer_tab)+"</ul>";
	document.getElementById(id_to_updt).innerHTML = result;
}

// function create_answer_basic_div(name_id){
// 	var result = '<div class="large-12 columns callout">'
// 		+'<div class="large-11 columns">'
// 		+'Answer '+name_id
// 			+'<label>Answer Type'
// 				+'<select oninput="$(\'#'+name_id+'\').toggleClass(\'answer_hidden\');console.log(\''+name_id+'\')">'
// 					+'<option value="Numeric">Numeric</option>'
// 					+'<option value="Function">Function</option>'
// 					+'<option value="range">Range</option>'
// 					+'<option value="menu">Menu</option>'
// 				+'</select>'
// 			+'</label>'
// 			+'<div id="'+name_id+'" class="answer_hidden">'
// 				+'Chaine d\'analyse'
// 				+'<div id="editor_'+name_id+'">'
// 				+'</div>'
// 				+'<fieldset>'
// 					+'<legend>Option(s)</legend>'
// 					+'<input id="checkbox1" type="checkbox"><label for="checkbox1">Option 1</label>'
// 					+'<input id="checkbox2" type="checkbox"><label for="checkbox2">Option 2</label>'
// 					+'<input id="checkbox3" type="checkbox"><label for="checkbox3">Option 3</label>'
// 				+'</fieldset>'
// 			+'</div>'
// 			+'<div class="large-1 columns">'
// 				+'<button class="close-button" aria-label="Close alert" type="button">'
// 					+'<span aria-hidden="true">&times;</span>'
// 				+'</button>'
// 			+'</div>'
// 		+'</div>'
// 	+'</div>';
// 	return result;
// }



/*****************************************************/
function gather_all_info(editor){
	var all_info = {};
	//We get all th interesting infos wher we have to
	all_info["title"] = document.getElementById("title_EnTete").value;
	all_info["language"] = document.getElementById("language_EnTete").value;
	all_info["name"] = document.getElementById("name_EnTete").value;
	all_info["email"] = document.getElementById("email_EnTete").value;
	all_info["OEF_code"] = editor_EnTete.to_OEFcode();
	all_info["enonce"] = editor_Enonce.to_OEFcode();
	return all_info;
}

function create_variable_choice_popup(id_to_popup,index){
	var rect = document.getElementById(id_to_popup).getBoundingClientRect(); //On obtient la position du bouton var
	$('#popup').toggleClass('popup_variable_visible');//On active le popup
	$('#popup').addClass('large-3');
	$('#popup').addClass('columns');
	//On place le popup là ou il faut
	$('#popup').css({'top':rect.top + ((rect.bottom - rect.top)/2),'left':rect.left + ((rect.right - rect.left)/1.3), 'position':'absolute'});
	//On crée le contenu du popup
	document.getElementById("popup").innerHTML = '<div class="callout"><label>Variable type'
  +'<select id = "popup_select">'
    +'<option value="Real">Real</option>'
    +'<option value="Draw">Draw</option>'
    +'<option value="Fun">Function</option>'
    +'<option value="Int">Integer</option>'
  +'</select>'
+'</label>'
+'<input placeholder="Nom de la variable" type="text" id="popup_input"></input>'
+'<a href="#" class="button" onclick="create_variable_editor(\'popup_select\',\'popup_input\','+index+')">Créer</a>'
+'</div>'
}


function destroy_variable(id_var_destroy,var_list){
	//A variable id look like : button_destroy_variableName
	var varName = id_var_destroy.substring(15); //On obtient le nom de la variable à supprimer
	delete var_list[varName]; //On l'enlève de la liste des variables connues
	update_variables_view("card_Enonce_Variable",var_list); //On met à jour le contenu de la vue variable
	editor_Enonce.destroy_var(varName);//On enlève cette variable de l'éditeur
}

function declaration_variable_OEFcode(){
	//FONCTION A COMPLETER
	var result = "";
	for (var nameVar in variable_List){ //Pour toutes les variables connues
		if (variable_List[nameVar].getType() == "Real"){ //dans le cas d'un réel
			result += "\\real{"+nameVar+" = "+variable_List[nameVar].getValue()+"}\n";
		}
		else if (variable_List[nameVar].getType() == "Int"){ //dans le cas d'un entier
			result += "\\integer{"+nameVar+" = "+variable_List[nameVar].getValue()+"}\n";
		}
	}
	return result;
}

function update_final_code(){
	//content_to_OEFcode(quill.getContents());
	console.log(quill.getContents());
	var result = "";
	var infos = gather_all_info(quill);
	/* HEAD DU CODE */
	result += "\\title{"+infos.title+"}\n";
	result += "\\language{"+infos.language+"}\n";
	result += "\\author{"+infos.author+"}\n";
	result += "\\email{"+infos.email+"}\n";
	result += "\\computeanswer{}\n";
	result += "\\format{html}\n";
	result += "\\precision{1000}\n";
	result += "\\range{-5..5)}\n";
	result += "\n\n\n"
	result += infos.OEF_code
	result += "\n\n\n"

	/* INSERER LES VARIABLES ICI */
	result += declaration_variable_OEFcode();
	/*DEBUT DU CODE EN SOI*/
	result += "\n\n\n";
	result += "\\statement{\n";
	/* RAJOUTER LE CODE TRANSFORMé DE L'ONGLET ENONCE */
	result += infos.enonce;//A faire
	/*ON FERME LE DOCUMENT */
	result += "}";
	document.getElementById("final_OEF_code").value = result;
}

//blockly_init();
