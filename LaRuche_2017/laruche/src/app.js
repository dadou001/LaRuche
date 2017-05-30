
$(document).ready();

$(document).foundation();

var variable_List = [];


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
	}
	else{
		var nameVar = editor.getText(positionSelection.index,positionSelection.length); //On récupère le contenu de la séléction
		if (test_valid_expression(nameVar)){
			editor.deleteText(positionSelection.index,positionSelection.length); //On enlève le texte séléctionné
			editor.insertEmbed(positionSelection.index, 'VariableImage',nameVar); //On le remplace par Variable possédant le nom que l'utilisateur avait sélectionné
			var_list.push(new Variable(nameVar,typeVariable.Real));
			update_variables_view("card_Enonce_Variable",var_list);
		}
	}
}

function update_variables_view(id_to_updt, variable_list){
	var result = "";
	for(var i =0 ; i<variable_list.length;i++){
		result += "<li style='margin-bottom:5px;'><span class='surligne_Variable'>"+variable_list[i].getName()+"</span></li>"
	}
	result = "<ul class='variable_List_Enonce'>"+result+"</ul>";
	document.getElementById(id_to_updt).innerHTML = result;
}

// var test = new Variable("var1",typeVariable.Real);
// var test2 = new Variable("var2",typeVariable.Real);
// var l = [test,test2];
// update_variables_view("card_Enonce_Variable",l);
