
$(document).ready();

$(document).foundation();

var variable_List = {};
var answer_List = {};
var active_editor_analyse = null;
var prepEditor;
var analyseEditor;

/*
 * Set the strings in index.html according to the current language
 */
$('#RId_Onglet_Entete').html(Blockly.Msg.WIMS_INTERFACE_TAB_HEADER);
$('#RId_Onglet_Enonce').html(Blockly.Msg.WIMS_INTERFACE_TAB_STATEMENT);
$('#RId_Onglet_Preparation').html(Blockly.Msg.WIMS_INTERFACE_TAB_PREPARATION);
$('#RId_Onglet_Analyse').html(Blockly.Msg.WIMS_INTERFACE_TAB_ANALYSIS);
$('#RId_Onglet_Code').html(Blockly.Msg.WIMS_INTERFACE_TAB_CODE);
$('#RId_Onglet_Sauvegarde').html(Blockly.Msg.WIMS_INTERFACE_TAB_SAVING);
$('#Rid_Entete_Label_Title').html(Blockly.Msg.WIMS_INTERFACE_HEADER_TITLE);
$('#Rid_Entete_Label_Language').html(Blockly.Msg.WIMS_INTERFACE_HEADER_LANGUAGE);
$('#Rid_Entete_Label_Name').html(Blockly.Msg.WIMS_INTERFACE_HEADER_NAME);
$('#Rid_Entete_Label_FirstName').html(Blockly.Msg.WIMS_INTERFACE_HEADER_FIRSTNAME);
$('#Rid_Entete_Label_Email').html(Blockly.Msg.WIMS_INTERFACE_HEADER_EMAIL);
$('#Rid_Entete_Label_EOFCode').html(Blockly.Msg.WIMS_INTERFACE_HEADER_OEF_CODE);
$('#title_EnTete').attr('placeholder',Blockly.Msg.WIMS_INTERFACE_HEADER_TITLE_PLACEHOLDER)
$('#language_EnTete').attr('placeholder',Blockly.Msg.WIMS_INTERFACE_HEADER_LANGUAGE_PLACEHOLDER)
$('#name_EnTete').attr('placeholder',Blockly.Msg.WIMS_INTERFACE_HEADER_NAME_PLACEHOLDER_PLACEHOLDER)
$('#firstName_EnTete').attr('placeholder',Blockly.Msg.WIMS_INTERFACE_HEADER_FIRSTNAME_PLACEHOLDER)
$('#email_EnTete').attr('placeholder',Blockly.Msg.WIMS_INTERFACE_HEADER_EMAIL_PLACEHOLDER)
$('#variable_creation_button').html(Blockly.Msg.WIMS_INTERFACE_BUTTON_VAR_CREATION);
$('#answer_creation_button').html(Blockly.Msg.WIMS_INTERFACE_BUTTON_ANSWER_CREATION);
$('#Rid_Analysis_Header_VarAnswers').html(Blockly.Msg.WIMS_INTERFACE_ANALYSIS_VARIABLES_AND_ANSWERS);
$('#Rid_Prep_Blockly_Toolbar_WIMS').attr('name',Blockly.Msg.WIMS_BLOCKLY_PREP_WIMS);
$('#Rid_Prep_Blockly_Toolbar_Variables').attr('name',Blockly.Msg.WIMS_BLOCKLY_PREP_VARIABLES);
$('#Rid_Prep_Blockly_Toolbar_Swarms').attr('name',Blockly.Msg.WIMS_BLOCKLY_PREP_SWARMS);
$('#Rid_Analysis_Blockly_Toolbar_Analysis').attr('name',Blockly.Msg.WIMS_BLOCKLY_ANALYSIS_ANALYSIS);
$('#Rid_Analysis_Blockly_Toolbar_Variables').attr('name',Blockly.Msg.WIMS_BLOCKLY_ANALYSIS_VARIABLES);

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
	if (typeof(analyseEditor)!='undefined') {
		analyseEditor.onResize();
		Blockly.svgResize(analyseEditor.mBlocklyWorkspace);
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
	placeholder: Blockly.Msg.WIMS_STATEMENT_EDITOR_PLACEHOLDER,
	theme: 'snow'
});


var quill_EnTete = new Quill('#editor-EnTete', {
	modules: {
		toolbar: false
	},
	placeholder: Blockly.Msg.WIMS_HEADER_EDITOR_PLACEHOLDER,
	theme: 'snow'
});


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
		var name = window.prompt(Blockly.Msg.WIMS_PROMPT_ANSWER_NAME,Blockly.Msg.WIMS_PROMPT_ANSWER_NAME_PLACEHOLDER);

		if((name != null) && (test_valid_expression(name)) && (ans_list[name] == null)){
			ans_list[name] = new Answer(name,'numeric');
			ans_list[name].get_block_html().create_editor();
			ans_list[name].get_block_html().get_editor().editor.on('editor-change',
				function(){
					if( (active_editor_analyse != null) || (active_editor_analyse != ans_list[name].get_block_html().get_editor())){
						//REVOIR CE IF, IL VA PAS
						active_editor_analyse = ans_list[name].get_block_html().get_editor();}});
			editor.insertEmbed(positionSelection.index,'answerImage',name);
		}
		else{
			window.alert(Blockly.Msg.WIMS_PROMPT_ANSWER_NAME_ERROR);
		}
		// ans_list.push(new Answer('reply'+(ans_list.length+1)));
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
			update_all_view();
			$('#popup').toggleClass('popup_variable_visible');//On désactive le popup
			add_blockly_variable(name);
		}
	}
	else{
		window.alert(Blockly.Msg.WIMS_PROMPT_VARIABLE_NAME_ERROR);
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
				update_all_view();
				add_blockly_variable(nameVar);
			}
		}
		else{
			window.alert(Blockly.Msg.WIMS_PROMPT_VARIABLE_NAME_ERROR)
		}
	}
}


 /****************************EN CHANTIER*****************************/
function change_type_answer(id_answer,type,ans_list){
	console.log(id_answer,ans_list)
 	ans_list[id_answer].get_block_html().change_to_type(type);
	ans_list[id_answer].type = type;
}

function delete_element_answer_list(name){
	answer_List[name].get_block_html().destroy();
	delete answer_List[name];
}

function update_analyse_answer(editor,ans_list){
	var tab_answer = editor.get_answer_tab(); //On obtient le tableau des réponses dans l'énoncé dans l'ordre
	var pos;//on initialise notre position courante
	for(var key in ans_list){
		pos = tab_answer.indexOf(key);//On obtient la position de la réponse que l'on regarde
		if(pos != -1){ //si cette réponse est encore valide
			//On l'ajoute au bon endroit
			if(pos > 0){
				$('#answer_list_analyse .callout').eq(pos-1).after($('#answer_all_'+key));
			}
			else{
				$('#answer_list_analyse .callout').eq(0).before($('#answer_all_'+key));
			}
		}
		else{
			delete_element_answer_list(key);
		}
	}
}

function get_active_editor_analyse(){
	var result = null;
	for(var key in answer_List){
		if(answer_List[key].get_block_html().get_editor().editor.hasFocus()){
			result = answer_List[key].get_block_html().get_editor();
		}
	}
	return result;
}

function destroy_answer(name){
	delete_element_answer_list(name);
	editor_Enonce.destroy_answer(name);
	for(var key in answer_List){
		answer_List[key].get_block_html().get_editor().destroy_answer(name);
	}
}
 /****************************FIN DU CHANTIER*****************************/


function create_list_variables(variable_list){
	var result = "";
	for(var key in variable_list){
		result += '<li style="margin-bottom:5px;position:relative;"><span class="surligne_Variable" onclick="editor_Enonce.add_variable(\''+key+'\');">'+key+'</span><button id="button_destroy_'+key+'" class="close-button" aria-label="Close alert" type="button" style="float:right;clear:right;font-size:1.6em;top:0px;" onclick="destroy_variable(\''+key+'\');update_all_view();"><span aria-hidden="true">&times;</span></button></li>'
	}
	return result;
}

function create_list_variables_analyse(variable_list){
	var result = "";
	for(var key in variable_list){
		result += '<li style="margin-bottom:5px;position:relative;"><span class="surligne_Variable" onclick="active_editor_analyse.add_variable(\''+key+'\');">'+key+'</span><button id="button_destroy_'+key+'" class="close-button" aria-label="Close alert" type="button" style="float:right;clear:right;font-size:1.6em;top:0px;" onclick="destroy_variable(\''+key+'\');update_all_view();"><span aria-hidden="true">&times;</span></button></li>'
	}
	return result;
}

function create_list_answer(answer_tab){
	var result = "";
	for(var  key in answer_tab){
		result += '<li style="margin-bottom:5px;position:relative;"><span class="surligne_Answer" onclick="active_editor_analyse.add_answer(\''+key+'\');">'+key+'</span><button id="button_destroy_'+key+'" class="close-button" aria-label="Close alert" type="button" style="float:right;clear:right;font-size:1.6em;top:0px;" onclick="destroy_answer(\''+key+'\');update_all_view();"><span aria-hidden="true">&times;</span></button></li>'
	}
	return result;
}

/****************LES MODIFS A FAIRE SONT LA****************************/
function create_list_var_prep(variable_list){
	var result = "";
	for(var key in variable_list){
		result += '<li style="margin-bottom:5px;position:relative;"><span class="surligne_Variable" onclick="add_variable_editor_blockly(\''+key+'\');">'+key+'</span><button id="button_destroy_'+key+'" class="close-button" aria-label="Close alert" type="button" style="float:right;clear:right;font-size:1.6em;top:0px;" onclick="destroy_variable(\''+key+'\');update_all_view();"><span aria-hidden="true">&times;</span></button></li>'
	}
	return result;
}
/**************************************************************************/

function update_variables_view(id_to_updt, variable_list){
	var result = "";
	result = "<ul class='variable_List_Enonce'>"+create_list_variables(variable_list)+"</ul>";
	document.getElementById(id_to_updt).innerHTML = result;
}

function update_variables_prep_view(variable_list){
	var result ="";
	result = "<ul class='variable_List_Enonce'>"+create_list_var_prep(variable_list)+"</ul>";
	document.getElementById('card_Prep_Variable').innerHTML = result;
}

function update_variables_answers_view(id_to_updt,variable_list,answer_tab){
	var result = "";
	result = "<ul class='variable_List_Enonce'>"+create_list_variables_analyse(variable_list)+create_list_answer(answer_tab)+"</ul>";
	document.getElementById(id_to_updt).innerHTML = result;
}

function update_all_view(){
	update_variables_view('card_Enonce_Variable',variable_List);
	update_variables_prep_view(variable_List);
	update_variables_answers_view('card_Analyse_Variable',variable_List,answer_List);
}



/*****************************************************/
function gather_all_info(editor){
	var all_info = {};
	//We get all th interesting infos wher we have to
	all_info["title"] = document.getElementById("title_EnTete").value;
	all_info["language"] = document.getElementById("language_EnTete").value;
	all_info["name"] = document.getElementById("name_EnTete").value;
	all_info["firstName"] = document.getElementById("firstName_EnTete").value;
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
+'<input placeholder="'+Blockly.Msg.WIMS_POPUP_VARIABLE_NAME_PLACEHOLDER+'" type="text" id="popup_input"></input>'
+'<a href="#" class="button" onclick="create_variable_editor(\'popup_select\',\'popup_input\','+index+')">'+Blockly.Msg.WIMS_POPUP_VARIABLE_BUTTON_CREATE+'</a>'
+'</div>'
}


function destroy_variable(name){
	delete_blockly_variable(name);
	delete variable_List[name];
	editor_Enonce.destroy_var(name);
	for(var key in answer_List){
		answer_List[key].get_block_html().get_editor().destroy_var(name);
	}
	for(var i = 0; i<Blockly.ExternalDiv.owner.length;i++){
		var tmpEditor = new SEditor(Blockly.ExternalDiv.owner[i].quillEditor_);
		tmpEditor.destroy_var(name);
	}
}

function create_answer_OEF(answer){
	var result = "\\answer{}";
	result += "{"+answer.to_OEF()+"}";
	result += "{type="+answer.get_type()+"}";
	result += answer.get_option();
	return result;
}

function get_all_answer_OEF(){
	var result = "";
	for(var key in answer_List){
		result += create_answer_OEF(answer_List[key]) + "\n";
	}
	return result;
}



function declaration_variable_OEFcode(){
	//FONCTION A COMPLETER
	var result = "";
	for (var nameVar in variable_List){ //Pour toutes les variables connues
		// if (variable_List[nameVar].type == "Real"){ //dans le cas d'un réel
		// 	result += "\\real{"+nameVar+" = "+variable_List[nameVar].getValue()+"}\n";
		// }
		// else if (variable_List[nameVar].type == "Int"){ //dans le cas d'un entier
		// 	result += "\\integer{"+nameVar+" = "+variable_List[nameVar].getValue()+"}\n";
		// }
		if(variable_List[nameVar].value != undefined){
			switch(variable_List[nameVar].type){
				case 'Real':
					result += "\\real{"+nameVar+" = "+variable_List[nameVar].getValue()+"}\n";
					break;
				case 'Int':
					result += "\\integer{"+nameVar+" = "+variable_List[nameVar].getValue()+"}\n";
					break;
				case 'Rational':
					result += "\\rational{"+nameVar+" = "+variable_List[nameVar].getValue()+"}\n";
					break;
				case 'Complex':
					result += "\\complex{"+nameVar+" = "+variable_List[nameVar].getValue()+"}\n";
					break;
				case 'Matrix':
					result += "\\matrix{"+nameVar+" = "+variable_List[nameVar].getValue()+"}\n";
					break;
				case 'Fun':
					result += "\\function{"+nameVar+" = "+variable_List[nameVar].getValue()+"}\n";
					break;
				case 'Text':
					result += "\\text{"+nameVar+" = "+variable_List[nameVar].getValue()+"}\n";
					break;
			}
		}
	}
	return result;
}

function update_final_code(){
	//content_to_OEFcode(quill.getContents());
	// console.log(quill.getContents());
	var result = "";
	var infos = gather_all_info(quill);
	/* HEAD DU CODE */
	result += "\\title{"+infos.title+"}\n";
	result += "\\language{"+infos.language+"}\n";
	result += "\\author{"+infos.firstName+","+infos.name+"}\n";
	result += "\\email{"+infos.email+"}\n";
	result += "\\computeanswer{}\n";
	result += "\\format{html}\n";
	result += "\\precision{1000}\n";
	result += "\\range{-5..5}";
	result += "\n"
	result += infos.OEF_code
	result += "\n"

	/* INSERER LES VARIABLES ICI */
	// result += declaration_variable_OEFcode() + '\n';
	/*DEBUT DU CODE EN SOI*/
	result += generate_prep_code() + '\n';
	// result += "";
	result += "\\statement{\n";
	/* RAJOUTER LE CODE TRANSFORMé DE L'ONGLET ENONCE */
	result += infos.enonce;//A faire
	/*ON FERME LE DOCUMENT */
	result += "}\n";
	result += get_all_answer_OEF()+'\n';
	result += generate_analyse_code();
	document.getElementById("final_OEF_code").value = result;
}

//blockly_init();




/***************************CHANTIER**************************/
function add_blockly_variable(name){
	prepEditor.mBlocklyWorkspace.createVariable(name);
	// console.log("AHHAHAHAHAHA");
}

function delete_blockly_variable(name){
	prepEditor.mBlocklyWorkspace.deleteVariable(name);
}

function add_variable_editor_blockly(name){
	var monDiv = Blockly.ExternalDiv.activeDivId;
	var index = -1;
	// console.log(monDiv);
	// console.log(Blockly.ExternalDiv.DIV);
	if(monDiv){
		for(var i = 0;i<Blockly.ExternalDiv.DIV.length;i++){
			if(Blockly.ExternalDiv.DIV[i].id == monDiv){
				index = i;
			}
		}
		// console.log(index);
		var tmp = new SEditor(Blockly.ExternalDiv.owner[index].quillEditor_);
		tmp.add_variable(name);
		// Blockly.ExternalDiv.owner[index].quillEditor_.insertEmbed(0,'VariableImage',name);
	}
}

function add_answer_editor_blockly(name){
	var monDiv = Blockly.ExternalDiv.activeDivId;
	var index = -1;
	// console.log(monDiv);
	// console.log(Blockly.ExternalDiv.DIV);
	if(monDiv){
		for(var i = 0;i<Blockly.ExternalDiv.DIV.length;i++){
			if(Blockly.ExternalDiv.DIV[i].id == monDiv){
				index = i;
			}
		}
		// console.log(index);
		var tmp = new SEditor(Blockly.ExternalDiv.owner[index].quillEditor_);
		tmp.add_answer(name);
		// Blockly.ExternalDiv.owner[index].quillEditor_.insertEmbed(0,'VariableImage',name);
	}
}

function generate_prep_code(){
	Blockly.OEF.addReservedWords('code');
	var code = Blockly.OEF.workspaceToCode(prepEditor.mBlocklyWorkspace);
	return code;
}

function generate_analyse_code(){
	Blockly.OEF.addReservedWords('code');
	var code = Blockly.OEF.workspaceToCode(analyseEditor.mBlocklyWorkspace);
	return code;
}

function generate_list_var_popup(){
	 var result = '<ul style="margin-left:5px;">';
	 for(var key in variable_List){
		 result += '<li style="margin-bottom:5px;position:relative;list-style: none;">'+
		 							'<span class="surligne_Variable" style="font-size:0.7em;" onclick="add_variable_editor_blockly(\''+key+'\');">'+key+'</span>'+
								'</li>';
	 }
	 result += '</ul>';
	 return result;
}

function generate_list_var_answer_popup(){
	 var result = '<ul style="margin-left:5px;">';
	 for(var key in variable_List){
		 result += '<li style="margin-bottom:5px;position:relative;list-style: none;">'+
		 							'<span class="surligne_Variable" style="font-size:0.7em;" onclick="add_variable_editor_blockly(\''+key+'\');">'+key+'</span>'+
								'</li>';
	 }
	 for(var key in answer_List){
		 result += '<li style="margin-bottom:5px;position:relative;list-style: none;">'+
		 							'<span class="surligne_Answer" style="font-size:0.7em;" onclick="add_answer_editor_blockly(\''+key+'\');">'+key+'</span>'+
								'</li>';
	 }

	 result += '</ul>';
	 return result;
}

function changeAllNameVar(oldName,newName){
	editor_Enonce.changeNameVar(oldName,newName);
	editor_EnTete.changeNameVar(oldName,newName);
	for(var key in answer_List){
		answer_List[key].get_block_html().get_editor().changeNameVar(oldName,newName);
	}
	for(var i = 0; i<Blockly.ExternalDiv.owner.length;i++){
		var tmpEditor = new SEditor(Blockly.ExternalDiv.owner[i].quillEditor_);
		tmpEditor.changeNameVar(oldName,newName);
	}
}

function generate_popup_list_var(x,y,withAnswer){
	var maDiv = document.createElement('div');
	maDiv.id = 'popup_var_blockly';
	if(!withAnswer){
		maDiv.innerHTML = generate_list_var_popup();
	}
	else{
		maDiv.innerHTML = generate_list_var_answer_popup();
	}
	maDiv.style.top = y+'px';
	maDiv.style.left = x+'px';
	maDiv.style.height = '100px';
	maDiv.style.position = 'absolute';
	maDiv.style.overflow = 'scroll';
	maDiv.style.backgroundColor = 'blue';
	if((Object.keys(variable_List).length == 0) && (Object.keys(answer_List).length == 0)){
		maDiv.style.visibility = 'hidden';
	}
	document.body.appendChild(maDiv);
}

function get_variables_JSON(){
	var state = {'enonce':editor_Enonce,'variables':variable_List,'answer':answer_List};
	 function fun2(key,value){
 		if( key != 'editor' && key != 'all_type' && key != 'html') {
 			return value;
 		}
		if(key == 'editor'){
			return value.getContents();
		}
		if(key == 'enonce'){
			return value.editor.getContents();
		}

 	 };
	 document.getElementById('save_state').value = JSON.stringify(state,fun2,' ');
	return JSON.stringify(state,fun2,' ');
}

function parse_save(save){
	function reviver(key,value){
		if(key == 'editor'){
			return new SEditor(value);
		}
		if(typeof key == Variable){
			console.log('YAYAYAYAYAYA');
		}
		else{
			return value;
		}
	}
	var state = JSON.parse(save,reviver);
	console.log(JSON.parse(save,reviver));
	var var_list_tmp = {};
	var ans_list_tmp = {};
	var res = {};
	for(var key in state['variables']){
		var_list_tmp[key] = new Variable(state['variables'][key]['name'],state['variables'][key]['type']);
	}
	variable_List = var_list_tmp;
	$('#answer_list_analyse').html('');
	for(var key in state['answer']){
		ans_list_tmp[key] = new Answer(state['answer'][key]['name'],state['answer'][key]['type']);
		ans_list_tmp[key].get_block_html().create_editor();
		ans_list_tmp[key].get_block_html().get_editor().editor.on('editor-change',
			function(){
				if( (active_editor_analyse != null) || (active_editor_analyse != ans_list_tmp[key].get_block_html().get_editor())){
					//REVOIR CE IF, IL VA PAS
					active_editor_analyse = ans_list_tmp[key].get_block_html().get_editor();
				}
			}
		);
		ans_list_tmp[key].get_block_html().editor.editor.setContents(state['answer'][key]['block_html']['editor']);
		ans_list_tmp[key].get_block_html().change_to_type(state['answer'][key]['type']);
	}
	editor_Enonce.editor.setContents(state['enonce']['editor'].editor);
	console.log('JPP',state['enonce']['editor']);
	// console.log('A',ans_list_tmp);
	// ans['x'] = ans_list_tmp;
	// console.log('B',answer_List);
	// answer_List = ans_list_tmp;
	// console.log('B',answer_List);
	res['answer'] = ans_list_tmp;
	return res;




	// var contentTmp;
	// for(var key in answer_List){
	// 	contentTmp = answer_List[key].block_html.editor.editor;
	// 	console.log(answer_List[key].block_html);
	// 	answer_List[key].block_html.html = answer_List[key].block_html.construct_basic_html();
	// 	$('#answer_list_analyse').append(answer_List[key].block_html.html);
	// 	answer_List[key].block_html.change_to_type(answer_List[key].type);
	// 	answer_List[name].block_html.create_editor();
	// 	answer_List[name].block_html.get_editor().editor.on('editor-change',
	// 		function(){
	// 			if( (active_editor_analyse != null) || (active_editor_analyse != answer_List[name].block_html.get_editor())){
	// 				//REVOIR CE IF, IL VA PAS
	// 				active_editor_analyse = answer_List[name].block_html.get_editor();
	// 			}
	// 		}
	// 	);
	// 	answer_List[key].block_html.editor.editor.setContents(contentTmp);
	// }
}

function use_save_state(ans){
	ans['x'] = parse_save(document.getElementById('save_state').value)['answer'];
	console.log(ans['x']);
}

function beautifuler_JSON(JSON_str){
	// var tab_counter = 0;
	// var start = JSON_str.search('{');
	// var end = '';
	// while(start != -1)
}

function good_tab(number){
	var result = '';
	for(var i = 0;i<number;i++){
		result += '\t';
	}
	return result;
}
