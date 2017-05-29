/*
 * Classe Integer :
 * Permet de traiter la variable qui a pour type "Integer".
 */

function Integer()
{
    //--------- ATTRIBUTS ---------//
    
    this.valeur = "";		// valeur de notre variable integer.
    this.nom = "integer";	// représente le type de la variable, utile pour récupérer la valeur de notre variable integer.
    this.proto = "base_var"; // proto pour compatibilité avec variables objets

    
    //--------- METHODES ----------//	
    
    this.creerBloc = function(id) 
    /*
     * Fonction qui permet de créer un bloc dans l'onglet préparation
     * spécifique pour une variable de type integer.
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
	txt.childNodes.className = "Rcl_Droppable";
	txt.style.border = "1px grey solid";
	txt.id = "RidPrBloc_Content_"+id;
	div.appendChild(txt);
	
	var editeurVar = new Editeur(txt.id, rucheSys,true);		
	rucheSys.listeEditeur.push(editeurVar);
    }   
}
