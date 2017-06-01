
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

function test_valid_expression(str){
	var patt = /^[a-zA-Z][a-zA-Z0-9-]*$/;
	return patt.test(str);
}

function change_to_var(editor,var_list){
	var positionSelection = editor.getSelection(); //On obtient la sélection de l'utilisateur
	if (positionSelection.length == 0){
		//Ajouter un popup pour créer directement la variable
		create_variable_choice_popup("variable_creation_button")
		gather_all_info(editor);
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
			/*console.log(quill.getContents());
			console.log(quill.getContents()['ops'][2]);
			console.log(quill.getContents()['ops'][2]);*/
		}
	}
}

function change_to_latex(editor){
	var positionSelection = editor.getSelection(); //On obtient la sélection de l'utilisateur
	if (positionSelection.length == 0){
		//Ajouter un popup pour créer directement la variable
		gather_all_info(editor);
	}
	else{
		var nameVar = editor.getText(positionSelection.index,positionSelection.length); //On récupère le contenu de la séléction
		editor.deleteText(positionSelection.index,positionSelection.length); //On enlève le texte séléctionné
		editor.insertEmbed(positionSelection.index, 'LatexImage',nameVar); //On le remplace par Variable possédant le nom que l'utilisateur avait sélectionné
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
	content = content.split('<span><span contenteditable="false" class="surligne_Variable">').join("<var>"); //On remplace toutes les balises entourants nos variables par un <var>
	var startVar = content.search("<var>"); //On cherche la première occurence de <var>
	var result =""; //On initialise notre résultat final
	if (startVar != -1){ //Si on trouve au moins un <var>
		var stopVar; //On initialise le pointeur sur la fin du contenu à considérer comme variable
		while(startVar != -1){ //Tant qu'on a des variables à traiter
			stopVar = content.search("</span></span>"); //On trouve la position de la fin de notre variable
			result += content.substring(0,stopVar) + "</var>"; //On ajoute le contenu jusqu'a ce point là en plus de </var>
			content = content.substring(stopVar+14,content.length); //On enlève du contenu ce qui à été mis dans le résultat
			startVar = content.search("<var>"); //On cherche la prochaine itération de <var>
		}
		result += content; //On ajoute le dernier morceau de contenu
	}
	else{
		result = content; //Sinon il n'y a rien à changer
	}
	return result;
}

function clear_editor_latex(content){
	content = content.split('<span class="surligne_Latex">').join("<latex>"); //On remplace tous les <span> ayant la classe surligne-latex par des <latex>
	var startLat = content.search("<latex>"); //On va au premier <latex>
	var result =""; //On initialise notre résultat
	if (startLat != -1){ //Si on trouve au moins un <latex>
		var stopLat; //On initialise notre valeur de fin de balise <latex>
		while(startLat != -1){ //On répète tant qu'il y a du <latex> à gérer
			stopLat = content.search("</span>"); //On va chercher le prochain <span> (la fin de la balise latex en fait)
			result += content.substring(0,stopLat) + "</latex>"; //On ajoute tout le contenu du contenu jusqu'a <latex> et on ajoute la bonne valeur
			content = content.substring(stopLat+7,content.length); //On enlève ce qui vient d'être ajouté du contenu
			startLat = content.search("<latex>"); //On cherche une nouvelle apparition de Latex
		}
		result += content; //On ajoute le dernier morceau de contenu à notre résultat
	}
	else{
		result = content; //Le résultat est directement le contenue initial
	}
	return result;
}

function clear_editor_content(str){
	var start = str.search("<p>"); //On récupère la position de début du contenu qui nous intéresse
	var stop = str.search("</div>"); //On récupère la position de fin du contenu qui nous intéresse
	var content = str.substring(start,stop); //On obtient la chaine de contenu voulu
	content = clear_editor_var(content); //On entoure les variables par des "<var></var"
	content = clear_editor_latex(content); //On entoure le Latex par des "<latex></latex>"
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
	all_info["OEF_code"] = document.getElementById("free_Code_EnTete").value;
	all_info["enonce"] = clear_editor_content(document.getElementById("editor-enonce").innerHTML);
	console.log(all_info);
	//return all_info;
}

function create_variable_choice_popup(id_to_popup){
	var rect = document.getElementById(id_to_popup).getBoundingClientRect();
	$('#popup').toggleClass('popup_variable_visible');
	$('#popup').addClass('large-3');
	$('#popup').addClass('columns');
	$('#popup').css({'top':rect.top + ((rect.bottom - rect.top)/2),'left':rect.left + ((rect.right - rect.left)/1.3), 'position':'absolute'});
	document.getElementById("popup").innerHTML = '<div class="callout"><label>Variable type'
  +'<select>'
    +'<option value="typeVariable.Real">Real</option>'
    +'<option value="typeVariable.Draw">Draw</option>'
    +'<option value="typeVariable.Fun">Function</option>'
    +'<option value="typeVariable.Int">Integer</option>'
  +'</select>'
+'</label></div>'
	console.log(rect);
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
