/*
 * Classe parente pour les composants
 * les classes filles, dans le dossier "Composants", représentent des objets qui "composent" ce que produit un essaim. Par exemple, ce peuvent être des parties d'un dessin (grille, axes,...).
 * un composant est spécifique à un type d'objet
 */

Composant = function(nom){

	//--------- ATTRIBUTS ---------//
    
    
    this.nom = nom;			// nom du composant.
    this.valeur = "";		// valeur du composant
    this.proto = "Composant";   // nature de la classe parente
    
    // Définition des paramètres. Tableau de tableaux.
    // Chaque tableau contient, dans l'ordre :
    //              - la description de l'item (affichée devant ou derrière lui
    //              - le type d'item : "checkbox", "menu" ou "edit"
    //              - la valeur de l'item : checked/unchecked pour un bouton par exemple
    //              - la suite de paramètres de l'item si il y en a
    //                  (pour le menu, liste des valeurs dans un tableau puis liste des options affichées)
    this.parametres = [
                       ["Le bouton qui va","checkbox",true],
                       ["La liste qui va","menu","option3",
                                ["","option1","option2","option3"],
                                ["Choisir...","option1 à moi","option2 à toi","option3 à nous"]],
                       ["La valeur qui va","edit","Contenu par défaut"]
                       ];
    
    this.initBlocPopup();  // construit le bloc popup
}
Composant.prototype.proto = "Composant";   // nature de la classe parente
Composant.prototype.parametres = [];

//--------- METHODES ----------//

Composant.prototype.initBlocPopup = function()
/*
 * Initialisation du bloc "popup" apparaissant lorsqu'on clique sur le nom du composant
 * ce bloc sert à définir les paramètres du composant
 */
{
    var divPopupComp = $("<div>", {
                           id: "divPopupComp"+this.nom,
                           class: "Rcl_Popup_Composant",
                           style: "display: none; position: absolute;"
                           });

//    divPopupComp.append("Laissez moi rêver<br/>Et attendre qu'un arbre<br/>Se précipite vers le ciel");
    $("body").append(divPopupComp);
    
    // Ajoute les items (paramètres) du composant
    for (var iPar=0;iPar<this.parametres.length;iPar++)
    {
        // Le 2ème élément de chaque tableau d'item est le type de paramètre
        switch (this.parametres[iPar][1])
        {
            case "checkbox":
                // type de paramètre checkbox
                var boutonId = "checkComp"+this.nom+"_"+(iPar+1);
                divPopupComp.append($("<div style=\"display: inline-block; margin-right: 5px;\"><input type=\"checkbox\" id="+boutonId+">"));
                $("#"+boutonId).parent().append(this.parametres[iPar][0])
                divPopupComp.append("<div>");
                $("#"+boutonId)[0].checked = this.parametres[iPar][2];
                break;
                
            case "menu":
                // type de paramètre menu
                var menuId = "menuComp"+this.nom+"_"+(iPar+1);
                divPopupComp.append("<div style=\"display: inline-block; margin-right: 5px;\">");
                divPopupComp.children().last().append(this.parametres[iPar][0]);
                divPopupComp.children().last().append("<select id="+menuId+">");
                var select = divPopupComp.children().last().children().first();
                for (jOpt=0;jOpt<this.parametres[iPar][3].length;jOpt++)
                {
                    select.append("<option value=\""+this.parametres[iPar][3][jOpt]+"\">");
                    select.children().last().append(this.parametres[iPar][4][jOpt]);
                }
                divPopupComp.append("<div>");
                $("#"+menuId+" option[value="+this.parametres[iPar][2]+"]").prop("selected",true);
                break;
                
            case "edit":
                // type de paramètre éditeur. (valeurs, chaines, etc...)
                var editId = "editComp"+this.nom+"_"+(iPar+1);
                divPopupComp.append("<div style=\"display: inline-block; margin-right: 5px;\">");
                divPopupComp.children().last().append(this.parametres[iPar][0]);
                
                divPopupComp.children().last().append($("<div>", {
                                                      id: editId,
                                                      class: "Rcl_Droppable",
                                                      style: "padding: 5px; width: 100px; verticalAlign: middle;"
                                                      }));
                divPopupComp.append("<div>");
                var editeurComp = new Editeur(editId,rucheSys,true);
                editeurComp.edit.setHTML(this.parametres[iPar][2]);
                break;
                
            default:
                break;
        }
    }
    
//    $("#spanComposant"+this.nom).unbind('click');
    var spanComp = $("#spanComposant"+this.nom);
    spanComp.bind("dblclick",Composant.prototype.blocPopupShowFromClick);
}

Composant.prototype.blocPopupShow = function(parentId)
/*
 * Montre le bloc popup correspondant à ce composant (le fait apparaître).
 * parametre(s) :       - parentId : id de l'élément (span) à coté duquel le popup apparaît
 */
{
    var parentObj = $("#"+parentId);
    var parentOffset = parentObj.offset();
    var popupObj = $("#divPopupComp"+this.nom);
    popupObj.css({left:parentOffset.left + parentObj.outerWidth() + 5 + "px", top:parentOffset.top - (popupObj.outerHeight()-parentObj.outerHeight())/2 + "px"}).slideDown("fast");
    
    // le prochain click n'importe où fera disparaître le menu
    $("body").bind("mousedown", Composant.prototype.blocPopupClicBodyCache);
}

Composant.prototype.blocPopupShowFromClick = function(event)
/*
 * Montre le bloc popup correspondant à ce composant (le fait apparaître) sur un clic sur le span du composant.
 * parametre(s) :       - event : événement Javascript
 */
{
    var nomComp = event.target.id.slice(13,event.target.id.length);
    var ind = rucheSys.rechercheIndice(nomComp,rucheSys.listeComposantEssaim);
    var comp = rucheSys.listeComposantEssaim[ind];
    comp.blocPopupShow(event.target.id);
}

Composant.prototype.blocPopupHide = function()
/*
 * Cache tous les popups de composants (les fait disparaître).
 */
{
    $("[id^=divPopupComp]").fadeOut("fast");
    $("body").unbind("mousedown", Composant.prototype.blocPopupClicBodyCache);
}

Composant.prototype.blocPopupClicBodyCache = function(event)
/*
 * Cache un bloc popup composant sur un click en dehors du menu.
 */
{
    // Laisse le popup si clic dedans ou sur le popup
    if ( $(event.target).parents("div.Rcl_Popup_Composant").length == 0 ) {
        Composant.prototype.blocPopupHide.call(this);
    }
}

//---------------------------------//


Composant.prototype.charge = function(elem)
/*
 * Fonction qui permet de charger les valeurs des paramètres de ce composant
 * en fonction de son type.
 * Paramètre : - elem : objet JSON contenant l'objet Composant à charger.
 */
{
    
}

//-----------------------------------//

Composant.prototype.recupDonnees = function()
/*
 * Fonction qui permet de récupérer les valeurs des paramètres du composant.
 *
 */
{
}


//---------------------------------//


Composant.prototype.toOEF = function()
/*
 * Fonction qui permet de générer le code OEF de la variable.
 *
 */
{
}

