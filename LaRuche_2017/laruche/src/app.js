
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


/** Fonction qui permet d'ajouter une réponse à un éditeur Quill
** et de l'ajouter à la liste des réponses
**
********* IN *************
** editor : SEditor où il faut ajouter la réponse
** ans_list : la liste des réponses où ajouter la nouvelle réponse
**
*/
function add_answer(editor,ans_list){
	editor.focus();
	var positionSelection = editor.getSelection(); //On obtient la sélection de l'utilisateur
	if (positionSelection.length == 0){
		var name = window.prompt(Blockly.Msg.WIMS_PROMPT_ANSWER_NAME,Blockly.Msg.WIMS_PROMPT_ANSWER_NAME_PLACEHOLDER);

		if((name != null) && (test_valid_expression(name)) && (ans_list[name] == null)){
			ans_list[name] = new Answer(name,'numeric');
			ans_list[name].get_block_html().create_editor(); //on crée l'éditeur Quill
			//On ajoute la fonction qui permet de savoir quel éditeur est actif quand.
			ans_list[name].get_block_html().get_editor().editor.on('editor-change',
				function(){
					if( (active_editor_analyse != null) || (active_editor_analyse != ans_list[name].get_block_html().get_editor())){
						//REVOIR CE IF, IL VA PAS
						active_editor_analyse = ans_list[name].get_block_html().get_editor();}});
			editor.insertEmbed(positionSelection.index,'answerImage',name); //On rajoute la réponse à l'éditeur
		}
		else{
			window.alert(Blockly.Msg.WIMS_PROMPT_ANSWER_NAME_ERROR);
		}
	}
}

/** Fonction qui permet de tester si une chaine est composé uniquement de caractères alphanumérique
********* IN *************
** str : chaine de caractères à tester
*/
function test_valid_expression(str){
	var patt = /^[a-zA-Z][a-zA-Z0-9-]*$/;
	return patt.test(str);
}

/** Fonction qui permet de créer la variable avec les paramètres du popup de création de variable
********* IN *************
** id_select_type_popup : id du select du popup d'où tirer les informations
** id_input_name_popup : id du popup d'où tirer les informations
** index : endroit où insérer la variable dans l'éditeur
*/
function create_variable_editor(id_select_type_popup,id_input_name_popup,index){
	//On récupère le type de la variable_List
	var type = document.getElementById(id_select_type_popup).options[document.getElementById(id_select_type_popup).selectedIndex].value;
	//On récupère le nom de la variable
	var name = document.getElementById(id_input_name_popup).value;
	if(test_valid_expression(name)){
		quill.insertEmbed(index, 'VariableImage',name);//On insère la variable dans l'éditeur sous la forme d'un Embed
		if (variable_List[name] == null){ //Si la variable n'existe pas encore
			variable_List[name] = new Variable(name,type); //On ajoute la nouvelle variable à notre liste de variable
			variable_List[name].init();
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

function create_OEF_variable_from_Blockly(name){
/* Called from within the Blockly code to build an OEF variable */
	if(variable_List[name]==null){
    variable_List[name] = new Variable(name,'Real');
		variable_List[name].init();
    update_all_view();
  }
}

/** Fonction qui permet de créer une variable à partir d'une sélection d'un éditeur
** ou de créer un popup s'il n't a pas de selection dans l'éditeur
********* IN *************
** editor : l'éditeur à regarder pour voir la sélection et ajouter la variable
** var_list : liste de variables où ajouter la variable nouvellement créer
*/
function change_to_var(editor,var_list){
	editor.focus();
	var positionSelection = editor.getSelection(); //On obtient la sélection de l'utilisateur
	if (positionSelection.length == 0){
		//Ajouter un popup pour créer directement la variable
		create_variable_choice_popup("variable_creation_button",positionSelection.index);
	}
	else{
		var nameVar = editor.getText(positionSelection.index,positionSelection.length); //On récupère le contenu de la sélection
		if (test_valid_expression(nameVar)){
			editor.deleteText(positionSelection.index,positionSelection.length); //On enlève le texte séléctionné
			editor.insertEmbed(positionSelection.index, 'VariableImage',nameVar); //On le remplace par Variable possédant le nom que l'utilisateur avait sélectionné
			if (var_list[nameVar] == null){
				var_list[nameVar] = new Variable(nameVar,typeVariable.Real);
				var_list[nameVar].init();
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

 /** Fonction qui permet de changer le type d'une réponse
 ********* IN *************
 ** id_answer : id de la réponse à changer
 ** type : le type que l'on veut attribuer à la réponse
 ** ans_list : la liste de réponse où aller chercher celle que l'on veut
 */
function change_type_answer(id_answer,type,ans_list){
	console.log(id_answer,ans_list)
 	ans_list[id_answer].get_block_html().change_to_type(type);
	ans_list[id_answer].type = type;
}

/** Fonction qui permet de détruire une réponse
********* IN *************
** name : le nom de la réponse à détruire
*/
function delete_element_answer_list(name){
	answer_List[name].get_block_html().destroy();
	delete answer_List[name];
}

/** Fonction qui permet de replacer les réponses dans le bon ordre dans l'onglet analyse
** si elles ont changés de place dans l'énoncé ou les détruire si elles n'existent plus dans l'énoncé
********* IN *************
** editor : l'éditeur que l'on va regarder pour savoir dans quelle ordre sont nos réponses
** ans_list : la liste des réponses à replacer correctement
*/
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

/** Fonction qui permet de donner l'éditeur qui a le focus dans l'onglet analyse
********* OUT *************
** result : l'éditeur qui a le focus
*/
function get_active_editor_analyse(){
	var result = null;
	for(var key in answer_List){
		//On parcours tous les éditeurs et on regarde celui qui a le focus
		if(answer_List[key].get_block_html().get_editor().editor.hasFocus()){
			result = answer_List[key].get_block_html().get_editor();
		}
	}
	return result;
}

/** Fonction qui permet de détruire toutes traces de la réponse donné dans tous les éditeurs quill
********* IN *************
** name : le nom de la réponse à détruire dans les éditeurs
*/
function destroy_answer(name){
	delete_element_answer_list(name);
	editor_Enonce.destroy_answer(name);
	for(var key in answer_List){
		answer_List[key].get_block_html().get_editor().destroy_answer(name);
	}
}

/** Fonction qui permet de créer la liste des '<li>' de toutes les variables que l'on affiche à droite dans l'énoncé
********* IN *************
** variable_list: la liste des variables d'où l'on crée notre liste de '<li>'
********* OUT *************
** result : la chaine des '<li>'
*/
function create_list_variables(variable_list){
	var result = "";
	for(var key in variable_list){
		result += '<li style="margin-bottom:5px;position:relative;"><span class="surligne_Variable" onclick="editor_Enonce.add_variable(\''+key+'\');">'+key+'</span><button id="button_destroy_'+key+'" class="close-button" aria-label="Close alert" type="button" style="float:right;clear:right;font-size:1.6em;top:0px;" onclick="destroy_variable(\''+key+'\');update_all_view();"><span aria-hidden="true">&times;</span></button></li>'
	}
	return result;
}

/** Fonction qui permet de créer la liste des '<li>' de toutes les variables que l'on affiche à droite dans l'analyse
********* IN *************
** variable_list: la liste des variables d'où l'on crée notre liste de '<li>'
********* OUT *************
** result : la chaine des '<li>'
*/
function create_list_variables_analyse(variable_list){
	var result = "";
	for(var key in variable_list){
		result += '<li style="margin-bottom:5px;position:relative;"><span class="surligne_Variable" onclick="active_editor_analyse.add_variable(\''+key+'\');">'+key+'</span><button id="button_destroy_'+key+'" class="close-button" aria-label="Close alert" type="button" style="float:right;clear:right;font-size:1.6em;top:0px;" onclick="destroy_variable(\''+key+'\');update_all_view();"><span aria-hidden="true">&times;</span></button></li>'
	}
	return result;
}

/** Fonction qui permet de créer la liste des '<li>' de toutes les réponses que l'on affiche à droite dans l'énoncé
********* IN *************
** answer_tab: la liste des réponses d'où l'on crée notre liste de '<li>'
********* OUT *************
** result : la chaine des '<li>'
*/
function create_list_answer(answer_tab){
	var result = "";
	for(var  key in answer_tab){
		result += '<li style="margin-bottom:5px;position:relative;"><span class="surligne_Answer" onclick="active_editor_analyse.add_answer(\''+key+'\');">'+key+'</span><button id="button_destroy_'+key+'" class="close-button" aria-label="Close alert" type="button" style="float:right;clear:right;font-size:1.6em;top:0px;" onclick="destroy_answer(\''+key+'\');update_all_view();"><span aria-hidden="true">&times;</span></button></li>'
	}
	return result;
}

/** Fonction qui permet de créer la liste des '<li>' de toutes les variables que l'on affiche à droite dans la préparation
********* IN *************
** variable_list: la liste des variables d'où l'on crée notre liste de '<li>'
********* OUT *************
** result : la chaine des '<li>'
*/
function create_list_var_prep(variable_list){
	var result = "";
	for(var key in variable_list){
		result += '<li style="margin-bottom:5px;position:relative;"><span class="surligne_Variable" onclick="add_variable_editor_blockly(\''+key+'\');">'+key+'</span><button id="button_destroy_'+key+'" class="close-button" aria-label="Close alert" type="button" style="float:right;clear:right;font-size:1.6em;top:0px;" onclick="destroy_variable(\''+key+'\');update_all_view();"><span aria-hidden="true">&times;</span></button></li>'
	}
	return result;
}

/** Fonction qui permet de mettre à jour les listes de variables qui s'affichent dans l'énoncé et l'analyse
********* IN *************
** id_to_updt: id de l'élement HTML à mettre à jour
** variable_list: la liste des variables d'où l'on crée notre liste de '<li>'
*/
function update_variables_view(id_to_updt, variable_list){
	var result = "";
	result = "<ul class='variable_List_Enonce'>"+create_list_variables(variable_list)+"</ul>";
	document.getElementById(id_to_updt).innerHTML = result;
}

/** Fonction qui permet de mettre à jour les listes de variables qui s'affichent dans la préparation
********* IN *************
** variable_list: la liste des variables d'où l'on crée notre liste de '<li>'
*/
function update_variables_prep_view(variable_list){
	var result ="";
	result = "<ul class='variable_List_Enonce'>"+create_list_var_prep(variable_list)+"</ul>";
	document.getElementById('card_Prep_Variable').innerHTML = result;
}

/** Fonction qui permet de mettre à jour les listes de variables qui s'affichent dans l'analyse
********* IN *************
** id_to_updt: id de l'élement HTML à mettre à jour
** variable_list: la liste des variables d'où l'on crée notre liste de '<li>'
** answer_tab: la liste des réponses d'où l'on crée notre liste de '<li>'
*/
function update_variables_answers_view(id_to_updt,variable_list,answer_tab){
	var result = "";
	result = "<ul class='variable_List_Enonce'>"+create_list_variables_analyse(variable_list)+create_list_answer(answer_tab)+"</ul>";
	document.getElementById(id_to_updt).innerHTML = result;
}

/** fonction pour mettre à jour toutes les vues de variables dans l'énoncé, la préparation et l'analyse
*/
function update_all_view(){
	update_variables_view('card_Enonce_Variable',variable_List);
	update_variables_prep_view(variable_List);
	update_variables_answers_view('card_Analyse_Variable',variable_List,answer_List);
}

/** Fonction qui permet de récupérer toutes les infos de l'en-tête et de l'énoncé
********* OUT *************
** all_info : an associative array with all the informations
*/
function gather_all_info(){
	var all_info = {};
	//We get all the interesting infos where we have to
	all_info["title"] = document.getElementById("title_EnTete").value;
	all_info["language"] = document.getElementById("language_EnTete").value;
	all_info["name"] = document.getElementById("name_EnTete").value;
	all_info["firstName"] = document.getElementById("firstName_EnTete").value;
	all_info["email"] = document.getElementById("email_EnTete").value;
	all_info["OEF_code"] = editor_EnTete.to_OEFcode();
	all_info["enonce"] = editor_Enonce.to_OEFcode();
	return all_info;
}

/** Fonction qui permet de créer le popup pour créer une variable sans sélection
********* IN *************
** id_to_popup: id de l'élement à côté duquel le popup va apparaitre
** index : l'nedroit où l'on va créer la varaible dans l'éditeur
*/
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

/** Fonction qui permet de détruire une variable
********* IN *************
** name : le nom de la variable qui doit disparaitre
*/
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

/** Fonction qui permet de créer la chaine de caractère caractérisant les réponses dans un éditeur OEF
********* IN *************
** answer : la réponse d'on l'on veut le bon code OEF
********* OUT *************
** result : la chaine de caractères qui représente le code OEF
*/
function create_answer_OEF(answer){
	var result = "\\answer{}";
	result += "{"+answer.to_OEF()+"}";
	result += "{type="+answer.get_type()+"}";
	result += answer.get_option();
	return result;
}

/** Fonction qui permet de créer toutes les chaines de caractères caractérisant les réponses dans un éditeur OEF
********* OUT *************
** result : la chaine de caractères qui représente le code OEF
*/
function get_all_answer_OEF(){
	var result = "";
	for (var i = 0;i<Object.keys(answer_List).length;i++){
		result += create_answer_OEF(answer_List[$('#answer_list_analyse .callout').get(i).id.substring(11)]) + "\n";
	}
	return result;
}

/** Fonction qui permet de créer le code OEF final
*/
function update_final_code(){
	var result = "";
	var infos = gather_all_info();
	/* HEAD DU CODE */
	if(infos.title == ''){
		result += "\\title{Exercice}\n";
	}
	else{
		result += "\\title{"+infos.title+"}\n";
	}
	result += "\\language{"+infos.language+"}\n";
	if(infos.firstName == '' && infos.name == ''){
		result += "\\author{}\n";
	}
	else{
		result += "\\author{"+infos.firstName+","+infos.name+"}\n";
	}
	result += "\\email{"+infos.email+"}\n";
	result += "\\computeanswer{no}\n";
	result += "\\format{html}\n";
	result += "\\precision{1000}\n";
	result += "\\range{-5..5}";
	result += "\n"
	result += infos.OEF_code
	result += "\n"
	/*DEBUT DU CODE EN SOI*/
	result += generate_prep_code() + '\n';
	result += "\\statement{\n";
	/* RAJOUTER LE CODE TRANSFORMé DE L'ONGLET ENONCE */
	result += infos.enonce;
	/*ON FERME LE DOCUMENT */
	result += "}\n";
	result += get_all_answer_OEF()+'\n';
	result += generate_analyse_code();
	document.getElementById("final_OEF_code").value = result;
}

/** Fonction qui permet d'ajouter une variable à un workspace Blockly
********* IN *************
** name : le nom de la variable que l'on veut ajouter
*/
function add_blockly_variable(name){
	prepEditor.mBlocklyWorkspace.createVariable(name);
}

/** Fonction qui permet de supprimer une variable d'un workspace Blockly
********* IN *************
** name : le nom de la variable à enlever du Blockly
*/
function delete_blockly_variable(name){
	prepEditor.mBlocklyWorkspace.deleteVariable(name);
}

/** Fonction qui permet d'ajouter une variable dans un éditeur quill coincé dans un Blockly
********* IN *************
** name : le nom de la variable à ajouter
*/
function add_variable_editor_blockly(name){
	var monDiv = Blockly.ExternalDiv.activeDivId;
	var index = -1;
	if(monDiv){
		for(var i = 0;i<Blockly.ExternalDiv.DIV.length;i++){
			if(Blockly.ExternalDiv.DIV[i].id == monDiv){
				index = i;
			}
		}
		var tmp = new SEditor(Blockly.ExternalDiv.owner[index].quillEditor_);
		tmp.add_variable(name);
	}
}

/** Fonction qui permet d'ajouter une réponse dans un éditeur quill coincé dans un Blockly
********* IN *************
** name : le nom de la réponse à ajouter
*/
function add_answer_editor_blockly(name){
	var monDiv = Blockly.ExternalDiv.activeDivId;
	var index = -1;
	if(monDiv){
		for(var i = 0;i<Blockly.ExternalDiv.DIV.length;i++){
			if(Blockly.ExternalDiv.DIV[i].id == monDiv){
				index = i;
			}
		}
		var tmp = new SEditor(Blockly.ExternalDiv.owner[index].quillEditor_);
		tmp.add_answer(name);
	}
}

/** Fonction qui permet de génerer le code du Blockly de préparation
********* OUT *************
** code : le code OEF final du Blockly
*/
function generate_prep_code(){
	Blockly.OEF.addReservedWords('code');
	var code = Blockly.OEF.workspaceToCode(prepEditor.mBlocklyWorkspace);
	return code;
}

/** Fonction qui permet de génerer le code du Blockly d'analyse
********* OUT *************
** code : le code OEF final du Blockly
*/
function generate_analyse_code(){
	Blockly.OEF.addReservedWords('code');
	var code = Blockly.OEF.workspaceToCode(analyseEditor.mBlocklyWorkspace);
	return code;
}

/** Fonction qui permet de génerer la liste des variables à ajouter au popup pour les quill dans Blockly
********* OUT *************
** result : la liste html des variables à implémenter dans le popup
*/
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

/** Fonction qui permet de génerer la liste des variables et des réponses à ajouter au popup pour les quill dans Blockly
********* OUT *************
** result : la liste html des variables et des réponses à implémenter dans le popup
*/
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

/** Fonction qui permet de changer le nom d'une variable
********* IN *************
** oldName : le nom actuel de la variable
** newName: le nouveau nom que l'on veut donner à la variable
*/
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

/** Fonction qui permet de générer le popup pour séléctionner
** les variables et les réponses à ajouter dans un éditeur quill dans un Blockly
********* IN *************
** x : l'emplacement en abscisse du popup
** y: l'emplacement en ordonnée du popup
** withAnswer : boolean pour savoir si on ajoute les réponses ou non
*/
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

/** Fonction qui permet de générer un JSON de l'état actuel de tous le site, les éditeurs, les Blockly etc..
********* OUT *************
** state : l'état de l'e'xercice en JSON
*/
function get_variables_JSON(){
	var teststate = Blockly.Xml.workspaceToDom(prepEditor.mBlocklyWorkspace);
	var entete = gather_all_info();
	delete entete['enonce'];
	delete entete['OEF_code'];
	var state = {'enonce':editor_Enonce,
							'variables':variable_List,
							'answer':answer_List,
							'prep':Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(prepEditor.mBlocklyWorkspace)),
							'analyse':Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(analyseEditor.mBlocklyWorkspace)),
							'en_tete':entete,
							'editor_EnTete':editor_EnTete};
	function fun2(key,value){
 		if( key != 'editor' && key != 'all_type' && key != 'html' && key != 'mTypeDeclarationBlock') {
 			return value;
 		}
		if(key == 'editor'){
			return value.getContents();
		}
 	};
	document.getElementById('save_state').value = JSON.stringify(state,fun2,' ');
	return JSON.stringify(state,fun2,' ');
}

/** Fonction qui permet de parser une sauvegarde pour réprendre à l'état de la sauvegarde
********* IN *************
** save : la sauvegarde sous forme de JSON
*/
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
	$('#title_EnTete').get(0).value = state['en_tete']['title'];
	$('#language_EnTete').get(0).value = state['en_tete']['language'];
	$('#name_EnTete').get(0).value = state['en_tete']['name'];
	$('#firstName_EnTete').get(0).value = state['en_tete']['firstName'];
	$('#email_EnTete').get(0).value = state['en_tete']['email'];
	editor_EnTete.editor.setContents(state['editor_EnTete']['editor'].editor);
	editor_Enonce.editor.setContents(state['enonce']['editor'].editor);
	prepEditor.mBlocklyWorkspace.clear();
	analyseEditor.mBlocklyWorkspace.clear();
	Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(state['prep']),prepEditor.mBlocklyWorkspace);
	Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(state['analyse']),analyseEditor.mBlocklyWorkspace);
	var var_list_tmp = {};
	var ans_list_tmp = {};
	var res = {};
	for(var key in state['variables']){
		var_list_tmp[key] = new Variable(state['variables'][key]['name'],state['variables'][key]['type']);
		var_list_tmp[key].init();
	}
	variable_List = var_list_tmp;
	$('#answer_list_analyse').html('');
	for(var key in state['answer']){
		ans_list_tmp[key] = new Answer(state['answer'][key]['name'],state['answer'][key]['type']);
		ans_list_tmp[key].length = state['answer'][key]['length'];
		ans_list_tmp[key].get_block_html().create_editor();
		ans_list_tmp[key].get_block_html().editor.editor.setContents(state['answer'][key]['block_html']['editor'].editor);
		ans_list_tmp[key].get_block_html().change_to_type(state['answer'][key]['type']);
	}
	answer_List = ans_list_tmp;
}

/** Fonction qui permet de rajouter l'écouteur sur les éditeurs quill dans les Blockly lorsqu'on
** fait appel à la restore de sauvegarde
********* IN *************
** key : le nom de la réponse
*/
function editor_on_change_analysis(key){
	answer_List[key].get_block_html().get_editor().editor.on('editor-change',
		function(){
			if( (active_editor_analyse != null) || (active_editor_analyse != answer_List[key].get_block_html().get_editor())){
			// 	REVOIR CE IF, IL VA PAS
				active_editor_analyse = answer_List[key].get_block_html().get_editor();
			}
	});
}

/** Fonction qui permet de lancer la restauration depuis la dernière sauvegarde
*/
function use_save_state(){
	parse_save(document.getElementById('save_state').value);
}

/** Fonction qui permet de récupérer un éditeur quill
** et de le transformer en SEditor à partir de l'ID d'un fieldWIMSEditor
********* IN *************
** id_field_WIMS : l'id de la div à récupérer
*/
function get_editor_field_wims(id_field_WIMS){
	var index = -1;
	for(var i = 0;i<Blockly.ExternalDiv.DIV.length;i++){
		if(Blockly.ExternalDiv.DIV[i].id == id_field_WIMS){
			index = i;
		}
	}
	if(index != -1){
		var editorTmp = new SEditor(Blockly.ExternalDiv.owner[index].quillEditor_);
		return editorTmp;
	}
	else{
		console.log('error somewhere');
		return null;
	}
}

/** Fonction qui permet de créer un popup et de l'afficher en dessous de la réponse
** qui a recu le click
********* IN *************
** id_element : l'id de l'AnswerImage où l'on doit afficher le popup
** answer_name : le nom de la réponse
*/
function create_popup_embed_answer(id_element,answer_name){
	var textHtml = 'Entrez la taille que vous souhaitez pour votre réponse (par défaut 10):'+
									'<textarea id="popup_textarea_'+answer_name+'" placeholder="length..."></textarea>'+
									'<a class="button tiny" onclick=\'change_length_answer_via_popup(\"'+answer_name+'\")\'>Valider</a>';
	var length = document.getElementById(id_element).getBoundingClientRect();
	$('#popup').html(textHtml);
	$('#popup_textarea_'+answer_name).get(0).value = answer_List[answer_name].length;
	$('#popup').css('height','150px');
	$('#popup').css('position','fixed');
	$('#popup').css('width','230px');
	$('#popup').css('font-size','0.7em');
	$('#popup').css('z-index','9000');
	$('#popup').css('background-color','white');
	$('#popup').addClass('callout');
	$('#popup').css('top',(length.top+20)+'px');
	$('#popup').css('left',(length.left-5)+'px');
	$('#popup').toggleClass('popup_variable_visible');
}

/** Fonction qui permet de génerer un id unique pour chaque answerImage des éditeurs quill
********* IN *************
** name : le nom de la réponse
*/
function generate_unique_id_answer(name){
	var valid_id = false;
	var tmpId = '';
	var i = 1;
	while(!valid_id){
		tmpId = name + i;
		if(document.getElementById(tmpId) == null){
			valid_id = true;
		}
		else{
			i++;
		}
	}
	return tmpId;
}

/** Fonction qui permet de mettre à jour la longueur d'une réponse en utilisant les données du popup
********* IN *************
** answer_name : le nom de la réponse
*/
function change_length_answer_via_popup(answer_name){
	var length = $('#popup_textarea_'+answer_name).get(0).value;
	answer_List[answer_name].length = length;
	$('#popup').toggleClass('popup_variable_visible');
}
