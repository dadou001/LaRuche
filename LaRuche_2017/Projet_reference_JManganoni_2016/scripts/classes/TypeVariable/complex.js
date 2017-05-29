/*
 * Classe Complex :
 * Permet de traiter la variable qui a pour type "Complex".
*/

function Complex()
{
    //--------- ATTRIBUTS ---------//
    
    this.valeur = "";		// valeur de notre variable complex.
    this.nom = "complex";	// représente le type de la variable, utile pour récupérer
    this.proto = "base_var"; // proto pour compatibilité avec variables objets

    
    //--------- METHODES ----------//
    
    this.creerBloc = function(id) 
    /*
     * Fonction qui permet de créer un bloc dans l'onglet préparation
     * spécifique pour une variable de type complexe.
     * Paramètre(s) : 	- id : nom de la variable.
     */
    {
	nom = "RidPrBloc_Interne_"+id;
	
	// Si ces différents blocs existent déjà, nous devons les supprimer pour éviter qu'ils
	// soit affichés plusieurs fois si on change le type de la variable.
        $("#"+nom).children().first().nextAll().remove();
        $("#"+nom).nextAll().remove();
	
	// Récupération des blocs et créations des nouveaux
	var div = document.getElementById(nom);
	var txt = document.createElement('div');
	txt.id = "edit"+id;
	txt.className = "Rcl_Droppable";txt.style.border = "1px grey solid";
	txt.id = "RidPrBloc_Content_"+id;
	div.appendChild(txt);	
	
	// Crée et ajoute l'éditeur de ce type de variable dans la liste des éditeurs.	
	var editeurVar = new Editeur(txt.id, rucheSys,true);		
	rucheSys.listeEditeur.push(editeurVar);
    }
    
    //---------------------------------//
    
    //this.recupDonnees = function()
    /*
     * Fonction qui permet de récupérer la valeur donnée à notre variable de type complex.
     *
     */
    // {
    // 	this.valeur = document.getElementById("RidPrBloc_Content_"+this.nom).value;
    // }
    
}
