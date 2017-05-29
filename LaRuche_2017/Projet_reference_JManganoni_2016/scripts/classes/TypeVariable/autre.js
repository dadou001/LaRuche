/*
 * Classe Autre :
 * Permet de traiter la variable qui a pour type "Autre", c'est à dire un type qu'on peut lui définir
 * à l'aide d'un input.
*/

function Autre(idt)
{
	//--------- ATTRIBUTS ---------//

    
    this.valeur = "";		// valeur de notre variable "autre".
    this.nom = "autre";		// représente le type de la variable, utile pour récupérer
    // la valeur de notre variable "autre".
    this.variable = idt;	// nom de la variable
    this.proto = "base_var"; // proto pour compatibilité avec variables objets
    
    
    //--------- METHODES ----------//
    
    
    this.creerBloc = function(id,data) 
    /*
     * Fonction qui permet de créer un bloc dans l'onglet préparation
     * spécifique pour une variable de type "autre".
     * Paramètre(s) : 	- id : nom de la variable.
     - data : permet de charger ce qu'il y a dans le input lors du chargement.
    */
    {
	nom = "RidPrBloc_Interne_"+id;
	
	// Si ces différents blocs existent déjà, nous devons les supprimer pour éviter qu'ils
	// soit affichés plusieurs fois si on change le type de la variable.
        $("#"+nom).children().first().nextAll().remove();
        $("#"+nom).nextAll().remove();
	
	// Création et assemblage des éléments du type "autre".
	var div = document.getElementById(nom);
	var typ = document.createElement('input');
	typ.id = "typ"+id;
	var txt = document.createElement('div');
	txt.id = "edit"+id;
	txt.className = "Rcl_Droppable";		
	txt.style.border = "1px grey solid";
	txt.id = "RidPrBloc_Content_"+id;
	div.appendChild(typ);
	div.appendChild(txt);
	
		// Crée et ajoute l'éditeur de ce type de variable dans la liste des éditeurs.
	var editeurVar = new Editeur(txt.id, rucheSys,true);		
	rucheSys.listeEditeur.push(editeurVar);
	
	// Si le champs "data" est rempli, le input sera rempli au chargement. 
	if (data != null)
	{
	    document.getElementById("typ"+id).value = data;
	}
	
    }
    
    
    //---------------------------------//
    
    
    this.recupTyp = function()
    /*
     * Fonction qui permet de récupérer la valeur donnée à notre variable de type "autre".
     *
     */
    {
	this.valeur = document.getElementById('typ'+this.variable).value;
	return this.valeur;
    }
    
}
