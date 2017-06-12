
$(document).ready();

$(document).foundation();

var variable_List = {};
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

var editor_EnTete = new SEditor(quill_EnTete);
var editor_Enonce = new SEditor(quill);
/* CONFIGURATION DU QUILL DE L'ENTETE, VARIABLE GLOBAL = MOCHE*/
quill_EnTete.format('code-block',true);
/* SE DEMENER POUR ENLEVER CES VARIABLES GLOBALES */

function add_answer(editor,var_list){
	//AJOUTER A LA LISTE DE VARIABLES AUSSI
	editor.focus();
	var positionSelection = editor.getSelection(); //On obtient la sélection de l'utilisateur
	if (positionSelection.length == 0){
		//Ajouter un popup pour créer directement la variable
	}
	else{
		var nameVar = editor.getText(positionSelection.index,positionSelection.length); //On récupère le contenu de la séléction
		if (test_valid_expression(nameVar)){
			editor.deleteText(positionSelection.index,positionSelection.length); //On enlève le texte séléctionné
			editor.insertEmbed(positionSelection.index, 'answerImage',nameVar); //On le remplace par Variable possédant le nom que l'utilisateur avait sélectionné
			if (var_list[nameVar] == null){
				var_list[nameVar] = new Variable(nameVar,"answer");
				update_variables_view("card_Enonce_Variable",var_list);
			}
		}
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
	destroy_var_editor(quill,varName);//On enlève cette variable de l'éditeur
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

// function find_balise_block(str){
// 	var result = []; //on initialise notre résultat qui sera sous la forme [positionDébut,positionFin]
// 	var start_balise = str.search("<"); //On initialise notre position de début de balise
// 	var end_balise; //On initialise notre position de fin de balise
// 	var name_balise = ""; //on initialise le nom de la balise courante (INUTILE POUR LE MOMENT)
// 	var counter = 0; //On initialise notre compteur qui va nous permettre de retrouver le block de balise dans la chaine originale
// 	result.push(start_balise); //On entre le début du block de balise
// 	while(str[start_balise] == "<"){
// 		end_balise = str.search(">"); //On va chercher ou se ferme la balise courante
// 		name_balise = str.substring(start_balise+1,end_balise);//On obtient le nom de la balise (INUTILE POUR LE MOMENT)
// 		counter += name_balise.length+2; //On ajoute au compteur la taille de la balise
// 		str = str.substring(end_balise+1);//On récupère la suite de la chaine
// 		start_balise = 0;//On regarde le premier caractère
// 	}
// 	result.push(result[0]+counter); //On ajoute le pointeur vers la fin de block au résultat
// 	return result;
// }
//
// function clean_balise_block(str){
// 	var result = "";
// 	if(str.length>0){ //Si la chaine comprend des choses à nettoyer
// 		var start_balise = 0; //On initialise la position du début de notre balise
// 		var end_balise = str.search(">"); //On initialise la position de la fin de la balise courante
// 		var name_balise = "";//On initialise le nom de la balise
// 		var name_complement = "";//On initialise le complément du nom de la balise
// 		var pos_complement; //On initialise la position de la balise complémentaire
// 		while(str.length>0){ //Tant qu'il y a des caractères à traiter
// 			end_balise = str.search(">"); //On va voir la fin de la balise
// 			name_balise = str.substring(start_balise+1,end_balise);//On récupère le nom de la balise courante
// 			//On obtient le nom du complément de la balise
// 			if(name_balise[0] == "/"){
// 				name_complement = name_balise.substring(1);
// 			}
// 			else{
// 				name_complement = "/"+name_balise;
// 			}
// 			//On cherche la position de la balise complémentaire
// 			pos_complement = str.search("<"+name_complement+">");
// 			//Si elle n'existe pas, on ajoute la balise courant au résultat
// 			if(pos_complement == -1){
// 				result += "<"+name_balise+">";
// 				str = str.substring(end_balise+1);//On obtient la suite de la chaine
// 			}
// 			else{
// 				//Sinon on supprime la balise courante et la balise complémentaire dans la chaine
// 				str = str.substring(name_balise.length+2,pos_complement)+str.substring(pos_complement+name_complement.length+2);
// 			}
// 		}
// 	}
// 	return result;
// }
//
// function clean_OEFcode(str){
// 	var tab = find_balise_block(str); //On obtient la position du premier block de balises
// 	var result = ""; //On initialise notre résultat
// 	var balise_block = ""; //On initialise le contenu du block de balise
// 	while(tab[0] != tab[1]){
// 		balise_block = clean_balise_block(str.substring(tab[0],tab[1])); //On nettoie le block de balise
// 		result += str.substring(0,tab[0]) + balise_block; //On ajoute le contenu nettoyer au résultat
// 		str = str.substring(tab[1]); //On obtient la suite de la chaine
// 		tab = find_balise_block(str); //On trouve le block suivant
// 	}
// 	result += str;
// 	return result;
// }

// function cut_insert(delta_element){
// 	var text = delta_element['insert']; //on obtien de le contenu textuel de l'élement
// 	var return_line_search = text.search("\n"); //on initialise la position du premier retour chariot
// 	var result = [];//on initialise notre résultat
// 	while (return_line_search != -1){
// 		//On ajoute le contenu jusqu'au retour chariot avec les mêmes attributs
// 		result.push({'insert':text.substring(0,return_line_search),'attributes':delta_element['attributes']});
// 		//on ajoute un retour chariot seul
// 		result.push({'insert':"\n",'attributes':{}});
// 		//On obtient la suite du texte
// 		text = text.substring(return_line_search+1);
// 		//on cherche le prochain retour chariot
// 		return_line_search = text.search("\n");
// 	}
// 	if(text.length>0){
// 		//S'il reste des choses à traiter on l'ajoute au résultat
// 		result.push({'insert':text,'attributes':delta_element['attributes']});
// 	}
// 	if(delta_element['insert'] == "\n"){
// 		//si l'élément était un retour chariot à la base, on le laisse tel quel
// 		result = [delta_element];
// 	}
// 	return result;
// }
//
//
//
// function add_element_line(element){
// 	var result = element['insert']; //on initialise notre résultat
// 	if (element['insert']['VariableImage']!= null){
// 		//si c'est une variable on la traite avec un \ devant
// 		result = "\\"+element['insert']['VariableImage'];
// 	}
// 	else if (element['attributes'] != null) {
// 		if(element['attributes']['LatexImage'] != null){
// 			//Si c'est du latex, on le traite en premier pour ne pas le polluer avec des balises
// 			result = "\\("+result+"\\)"
// 		}
// 		for (var key in element['attributes']){
// 			//On ajoute les bonnes balises autour du texte selon les attributs
// 			switch(key){
// 				case 'bold':
// 					result = "<strong>"+result+"</strong>"
// 					break;
// 				case 'italic':
// 					result = "<em>"+result+"</em>"
// 					break;
// 				case 'underline':
// 					result = "<u>"+result+"</u>"
// 					break;
// 				case 'strike':
// 					result = "<s>"+result+"</s>"
// 					break;
// 			}
// 		}
// 	}
// 	return result;
// }
//
//
// function applied_attributes(line,element,was_list){
// 	var attributes = element['attributes']; //on récupère les attributs
// 	var result = line; //on initialise notre résultat avec le contenu de la ligne en cours
// 	if(Object.keys(attributes).length == 0){ //S'il n'y a pas d'attributs, on entoure juste la ligne de balise <p>
// 		result = "<p>"+result+"</p>\n";
// 	}
// 	for(var key in attributes){
// 		//On regarde tous les attributs
// 		switch(key){
// 			case 'list':
// 				if(attributes['list'] == 'bullet'){
// 					if(was_list['unordered'] == false){
// 						//on gèr la cas de début de liste unorderde
// 						result = "<ul><li>"+result+"</li>\n";
// 						was_list['unordered'] = true;
// 					}
// 					else{
// 						//le cas d'une liste en cours
// 						result = "<li>"+result+"</li>\n";
// 					}
// 				}
// 				if(attributes['list'] == 'ordered'){
// 					if(was_list['ordered'] == false){
// 						//on gère le cas de début d'une liste ordered
// 						result = "<ol><li>"+result+"</li>\n";
// 						was_list['ordered'] = true;
// 					}
// 					else{
// 						result = "<li>"+result+"</li>\n";
// 					}
// 				}
// 				break;
// 		}
// 	}
// 	if (attributes['list'] == null){
// 		//on cherche à voir s'il faut fermer les listes ou non
// 		if(was_list['ordered']){
// 			result ="</ol>\n"+result;
// 			was_list['ordered'] = false;
// 		}
// 		if(was_list['unordered']){
// 			result ="</ul>\n"+result;
// 			was_list['unordered'] = false;
// 		}
// 	}
// 	else if(attributes['list'] == 'bullet'){
// 		if(was_list['ordered']){
// 			result ="</ol>"+result;
// 			was_list['ordered'] = false;
// 		}
// 	}
// 	else if(attributes['list'] == 'ordered'){
// 		if(was_list['unordered']){
// 			result ="</ul>"+result;
// 			was_list['unordered'] = false;
// 		}
// 	}
// 	return {'line':result,'was_list':was_list};
// }
//
// function to_OEFcode(content){
// 	var tabContent = content['ops']; //on obtient notre tableau de contenu
// 	var line = ""; //on intialise notre ligne courante
// 	var tabTmp = []; //on initialise notre tableau temporaire (celui qui découpe sur les retours chariots)
// 	var result = ""; //On initialise notre résultat final
// 	var resTmp; //on initialise notre résultat temporaire
// 	var was_list = {'ordered':false,'unordered':false}; //On initialise notre tableau pour savoir si une liste est active ou non
// 	for (var i = 0;i<tabContent.length;i++){
// 		tabTmp = cut_insert(tabContent[i]); //on découpe le contenu de la case i du tableau
// 		for(var j = 0;j<tabTmp.length;j++){
// 			if(tabTmp[j]['insert'] != "\n"){ //Si on arrive pas sur une in de ligne, on ajoute les élements à la ligne
// 				line += add_element_line(tabTmp[j]);
// 			}
// 			else{
// 				//Sinon on applique les bons attributs à la ligne
// 				resTmp = applied_attributes(line,tabTmp[j],was_list);
// 				//on met à jour nos informations
// 				was_list = resTmp['was_list'];
// 				result += resTmp['line'];
// 				line = "";
// 			}
// 		}
// 	}
// 	if (line != ""){
// 		result += line;
// 	}
// 	return result;
// }

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
