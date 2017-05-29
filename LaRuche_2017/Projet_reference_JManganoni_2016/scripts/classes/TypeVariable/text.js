/*
 * Classe Text :
 * Permet de traiter la variable qui a pour type "Text".
 */

function Text(){
    
    //--------- ATTRIBUTS ---------//
    
    
    this.valeur = "";		// valeur de notre variable text.
    this.nom = "text";	// représente le type de la variable, utile pour récupérer
    this.proto = "base_var"; // proto pour compatibilité avec variables objets
    
    
    //--------- METHODES ----------//
    
    
    this.creerBloc = function(id)
    /*
     * Fonction qui permet de créer un bloc dans l'onglet préparation
     * spécifique pour une variable de type text.
     * Paramètre(s) : 	- id : nom de la variable.
     */
    {
        nom = "RidPrBloc_Interne_"+id;
        $("#"+nom).children().first().nextAll().remove();
        $("#"+nom).nextAll().remove();
        
        var div = document.getElementById(nom);
        var barre_tache = document.createElement("DIV");
        var txt = document.createElement('div');
        txt.className = "Rcl_Droppable";
        
        txt.style.border = "1px grey solid";
        txt.id = "RidPrBloc_Content_"+id;
        
        
        var button_latex = document.createElement("button");
        button_latex.id = "Rid_Editor_Button_Latex_"+id;
        button_latex.innerHTML = "latex";
        button_latex.className = "Rcl_Editor_Button_Latex";
        button_latex.style.backgroundColor = "#e5e5e5";
        button_latex.style.borderRadius = "5px";
        button_latex.onclick=function(){
            var nom = "RidPrBloc_Content_"+this.id.slice("Rid_Editor_Button_Latex_".length,this.id.length);
            rucheSys.etiqueterTexteEnLatex(nom);
        }
        
        barre_tache.appendChild(button_latex);
        
        div.appendChild(barre_tache);
        div.appendChild(txt);
        
        var editeurVar = new Editeur(txt.id, rucheSys,true);
        
        rucheSys.listeEditeur.push(editeurVar);
    }
    
    
    //---------------------------------//
    
    
    this.recupDonnees = function()
    /*
     * Fonction qui permet de récupérer la valeur donnée à notre variable de type text.
     *
     */
    {
        this.valeur = document.getElementById("RidPrBloc_Content_"+this.nom).value;
    }
    
}