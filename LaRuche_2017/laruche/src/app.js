
$(document).ready();

$(document).foundation();

var variable_List = {};


function change_onglet(name) {
	$('#RId_Onglet_'+anc_onglet).removeClass('RCl_Onglet_Affiche').addClass('RCl_Onglet_Cache');
	$('#RId_Onglet_'+name).removeClass('RCl_Onglet_Cache').addClass('RCl_Onglet_Affiche');
	$('#RId_Contenu_Onglet_'+anc_onglet).addClass('RCl_Contenu_Onglet_Cache');
	$('#RId_Contenu_Onglet_'+name).removeClass('RCl_Contenu_Onglet_Cache');
	anc_onglet = name;
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

/* CONFIGURATION DU QUILL DE L'ENTETE, VARIABLE GLOBAL = MOCHE*/
quill_EnTete.format('code-block',true);
/* SE DEMENER POUR ENLEVER SES VARIABLES GLOBALES */


function test_valid_expression(str){
	var patt = /^[a-zA-Z][a-zA-Z0-9-]*$/;
	return patt.test(str);
}

function create_variable_editor(id_select_type_popup,id_input_name_popup,index){
	var type = document.getElementById(id_select_type_popup).options[document.getElementById(id_select_type_popup).selectedIndex].value;
	var name = document.getElementById(id_input_name_popup).value;
	if(test_valid_expression(name)){
		quill.insertEmbed(index, 'VariableImage',name);
		if (variable_List[name] == null){
			variable_List[name] = new Variable(name,type);
			update_variables_view("card_Enonce_Variable",variable_List);
			$('#popup').toggleClass('popup_variable_visible');
		}
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

function change_to_latex(editor){
	var positionSelection = editor.getSelection(); //On obtient la sélection de l'utilisateur
	if (positionSelection.length == 0){
		if(editor.getFormat()['LatexImage'] == true){
			editor.format('LatexImage',false);
		}
		else{
			editor.format('LatexImage',true);
		}
	}
	else{
		if(editor.getFormat()['LatexImage'] == true){
			editor.formatText(positionSelection.index,positionSelection.length,'LatexImage',false);
		}
		else{
			editor.formatText(positionSelection.index,positionSelection.length,'LatexImage',true);
		}
	}
}

function update_variables_view(id_to_updt, variable_list){
	var result = "";
	for(var key in variable_list){
		result += '<li style="margin-bottom:5px;position:relative;"><span class="surligne_Variable" onclick="add_variable_editor(quill,\''+key+'\');">'+key+'</span><button id="button_destroy_'+key+'" class="close-button" aria-label="Close alert" type="button" style="float:right;clear:right;font-size:1.6em;top:0px;" onclick="destroy_variable(this.id,variable_List);"><span aria-hidden="true">&times;</span></button></li>'
	}
	result = "<ul class='variable_List_Enonce'>"+result+"</ul>";
	document.getElementById(id_to_updt).innerHTML = result;
}

/* FONCTION POUR CLEAN OBJET EDITEUR */
function clear_editor_var(content){
	var startVar = content.search('<span class="surligne_Variable"'); //On initialise notre pointeur de début d'une balise variable
	var stopStartVar; //On initialise notre pointeur sur la fin de la balise ouvrante variable
	var stopVar;//on initialise notre variable pointant sur le début de la balise fermante de variable
	var result = ""; //On initialise notre chaine contanenat le resultat final.

	while(startVar != -1){ //Tant qu'il y a des variables à traiter
		result += content.substring(0,startVar); //On ajoute au résultat tout jusqu'a la baslise pour les variables
		content = content.substring(startVar,content.length); //On enlève ce qui a été ajouté du contenu
		stopStartVar = content.search(">"); //On regarde ou ferme la balise ouvrant pour les variables
		stopVar = content.search("</span>"); //On regarde ou commence la balise fermante des variables
		result += "\\"+content.substring(stopStartVar+1,stopVar);//On ajoute notre varibale précédé d'un \ au résultat
		content = content.substring(stopVar+7,content.length);//On enlève la variables + ses balises du contenu
		startVar = content.search('<span class="surligne_Variable"'); //On cherche une nouvelle variable
	}
	result += content;//On ajoute le dernier morceau de contenu au résultat
	return result;
}

function clear_editor_latex(content){
	content = content.split('<latex class="surligne_Latex">').join("\\("); //On remplace tous les <span> ayant la classe surligne-latex par des <latex>
	var startLat = content.search("\\("); //On va au premier <latex>
	var result =""; //On initialise notre résultat
	if (startLat != -1){ //Si on trouve au moins un <latex>
		var stopLat; //On initialise notre valeur de fin de balise <latex>
		while(startLat != -1){ //On répète tant qu'il y a du <latex> à gérer
			stopLat = content.search("</latex>"); //On va chercher le prochain <span> (la fin de la balise latex en fait)
			result += content.substring(0,stopLat) + "\\)"; //On ajoute tout le contenu du contenu jusqu'a <latex> et on ajoute la bonne valeur
			content = content.substring(stopLat+7,content.length); //On enlève ce qui vient d'être ajouté du contenu
			startLat = content.search("\\("); //On cherche une nouvelle apparition de Latex
		}
		result += content; //On ajoute le dernier morceau de contenu à notre résultat
	}
	else{
		result = content; //Le résultat est directement le contenue initial
	}
	return result;
}

function clear_editor_code(content){
	var startLat = content.search('<pre spellcheck="false">'); //On va au premier <latex>
	var result =""; //On initialise notre résultat
	if (startLat != -1){ //Si on trouve au moins un <latex>
		var stopLat; //On initialise notre valeur de fin de balise <latex>
		while(startLat != -1){ //On répète tant qu'il y a du <latex> à gérer
			stopLat = content.search("</pre>"); //On va chercher le prochain <span> (la fin de la balise latex en fait)
			result += content.substring(0,stopLat) ; //On ajoute tout le contenu du contenu jusqu'a <latex> et on ajoute la bonne valeur
			content = content.substring(stopLat+6,content.length); //On enlève ce qui vient d'être ajouté du contenu
			startLat = content.search('<pre spellcheck ="false"'); //On cherche une nouvelle apparition de Latex
		}
		result += content; //On ajoute le dernier morceau de contenu à notre résultat
	}
	else{
		result = content; //Le résultat est directement le contenue initial
	}
	result = result.split('<pre spellcheck="false">').join("");
	return result;
}


function clear_editor_content(str){
	var start = str.search("<p>"); //On récupère la position de début du contenu qui nous intéresse
	var stop = str.search("</div>"); //On récupère la position de fin du contenu qui nous intéresse
	var content = str.substring(start,stop); //On obtient la chaine de contenu voulu
	content = clear_editor_var(content); //On entoure les variables par des "<var></var"
	content = clear_editor_latex(content); //On entoure le Latex par des "<latex></latex>"
	content = clear_editor_code(content);
	return content;
}
/*****************************************************/
function gather_all_info(editor){
	var all_info = {};
	//We get all th interesting infos wher we have to
	all_info["title"] = document.getElementById("title_EnTete").value;
	all_info["language"] = document.getElementById("language_EnTete").value;
	all_info["name"] = document.getElementById("name_EnTete").value;
	all_info["email"] = document.getElementById("email_EnTete").value;
	all_info["OEF_code"] = content_to_OEFcode(quill_EnTete.getContents());
	all_info["enonce"] = content_to_OEFcode(quill.getContents());
	return all_info;
}

function create_variable_choice_popup(id_to_popup,index){
	var rect = document.getElementById(id_to_popup).getBoundingClientRect();
	$('#popup').toggleClass('popup_variable_visible');
	$('#popup').addClass('large-3');
	$('#popup').addClass('columns');
	$('#popup').css({'top':rect.top + ((rect.bottom - rect.top)/2),'left':rect.left + ((rect.right - rect.left)/1.3), 'position':'absolute'});
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
	var varName = id_var_destroy.substring(15);
	delete var_list[varName];
	update_variables_view("card_Enonce_Variable",var_list);
	destroy_var_editor(quill,varName);
}

function destroy_var_editor(editor,varName){
	var content = editor.getContents(); //On obtient le delta de l'éditeur
	var tab = content['ops']; //On récupère le tableau d'insert
	var tabRes = []; //On initialise notre tableau de résultat final que l'on enverra à l'éditeur
	for (var i = 0;i<content['ops'].length;i++){
		if ((content['ops'][i]['insert']['VariableImage'] == null) || (content['ops'][i]['insert']['VariableImage'] != varName)){
			tabRes.push(content['ops'][i]); //On prend toutes les valeurs qui ne sont pas notre variable
		}
	}
	content['ops'] = tabRes; //On recrée un 'content' cohérent
	editor.setContents(content);
}

function add_variable_editor(editor,nameVar){
	editor.focus(); //On regarde l'editeur
	var selection = editor.getSelection(); //on obtient l'index de la selection de l'utilisateur
	editor.insertEmbed(selection.index,'VariableImage',nameVar); //On insere une imageVariable à cet endroit
}

function clear_enonce_info(str){
	str = str.split("<p>").join("").split("</p>").join("\n").split("<br>").join("\n");
	return str;
}

function declaration_variable_OEFcode(){
	var result = "";
	for (var nameVar in variable_List){
		if (variable_List[nameVar].getType() == "Real"){
			result += "\\real{"+nameVar+" = "+variable_List[nameVar].getValue()+"}\n";
		}
		else if (variable_List[nameVar].getType() == "Int"){
			result += "\\integer{"+nameVar+" = "+variable_List[nameVar].getValue()+"}\n";
		}
	}
	return result;
}

function content_to_OEFcode(content){
	var tabContent = content['ops'];
	console.log(tabContent);
	var result = "";
	for(var i = 0; i<tabContent.length;i++){
		if(tabContent[i]['insert']['VariableImage'] != null){
			result += "\\" + tabContent[i]['insert']['VariableImage'];
		}
		else if((tabContent[i]['attributes']!= null) && (tabContent[i]['attributes']['LatexImage'] != null)){
			result += "\\("+tabContent[i]['insert']+"\\)"
		}
		else{
			result += tabContent[i]['insert'];
		}
	}
	return result;
}

function update_final_code(){
	content_to_OEFcode(quill.getContents());
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
