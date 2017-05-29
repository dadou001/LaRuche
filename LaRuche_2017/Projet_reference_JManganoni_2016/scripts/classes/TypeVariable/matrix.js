/*
 * Classe Matrix :
 * Permet de traiter la variable qui a pour type "Matrix".
*/

function Matrix(){

	//--------- ATTRIBUTS ---------//


	this.valeur = "";		// valeur de notre variable matrix.
	this.nom = "matrix";	// représente le type de la variable, utile pour récupérer la valeur de notre variable matrix.
    this.proto = "base_var"; // proto pour compatibilité avec variables objets


	//--------- METHODES ----------//
	

	this.creerBloc = function(id) 
	/*
	 * Fonction qui permet de créer un bloc dans l'onglet préparation
	 * spécifique pour une variable de type matrix.
	 * Paramètre(s) : 	- id : nom de la variable.
	 */
	 {
		nom = "RidPrBloc_Interne_"+id;
         $("#"+nom).children().first().nextAll().remove();
         $("#"+nom).nextAll().remove();

		var div = document.getElementById(nom);
		var txt = document.createElement('div');
		txt.id = "edit"+id;
		txt.className = "Rcl_Droppable";		
		txt.style.border = "1px grey solid";
		txt.id = "RidPrBloc_Content_"+id;
		div.appendChild(txt);
		
		var editeurVar = new Editeur(txt.id, rucheSys,true);		
		rucheSys.listeEditeur.push(editeurVar);
	}

	//---------------------------------//

	//this.recupDonnees = function()
	/*
	 * Fonction qui permet de récupérer la valeur donnée à notre variable de type matrix.
	 *
	 */
	/*{		
		this.valeur = document.getElementById("RidPrBloc_Content_"+this.nom).value;
	}*/

}