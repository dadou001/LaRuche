/*
 * Classe composant inclusion image dans un dessin Flydraw à partir d'un fichier.
 * réalise le calcul des coordonnées et fournit les instructions qui vont bien.
 */

CoInclusionImage = function(nom){

	//--------- ATTRIBUTS ---------//
    

	this.nom = nom;			// nom du composant.
	this.valeur = "";		// valeur du composant
    this.proto = "CoInclusionImage";   // nature de la classe parente
    
    // Définition des paramètres. Tableau de tableaux.
    // Chaque tableau contient, dans l'ordre :
    //              - la description de l'item (affichée devant ou derrière lui
    //              - le type d'item : "checkbox", "menu" ou "edit"
    //              - la valeur de l'item : checked/unchecked pour un bouton par exemple
    //              - la suite de paramètres de l'item si il y en a
    //                  (pour le menu, liste des valeurs dans un tableau puis liste des options affichées)
    this.parametres = [
                       ["Nom de fichier","edit",""],
                       ["Largeur en pixels","edit",""],
                       ["Hauteur en pixels","edit",""],
                       ["Position en X du centre dans le dessin","edit",""],
                       ["Position en Y du centre dans le dessin","edit",""],
                       ];
    
    this.initBlocPopup();  // construit le bloc popup
}


//--------- Déclaration comme classe dérivée de Essaim ---------//

CoInclusionImage.prototype = Object.create(Composant.prototype);
CoInclusionImage.prototype.constructor = CoInclusionImage;   // y parait qu'il faut corriger le constructeur...


// Définit les nouveaux attributs

CoInclusionImage.prototype.proto = "CoInclusionImage";   // nature de la classe parente
CoInclusionImage.prototype.parametres = [];

//--------- METHODES ----------//

CoInclusionImage.prototype.initBlocPopup = function()
/*
 * Initialisation du bloc "popup" apparaissant lorsqu'on clique sur le nom du composant
 * ce bloc sert à définir les paramètres du composant
 */
{
    Composant.prototype.initBlocPopup.call(this);
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
    var indice1 = rucheSys.rechercheIndice("editComp"+this.nom+"_1",rucheSys.listeEditeur);
    var indice2 = rucheSys.rechercheIndice("editComp"+this.nom+"_2",rucheSys.listeEditeur);
    var indice3 = rucheSys.rechercheIndice("editComp"+this.nom+"_3",rucheSys.listeEditeur);
    var indice4 = rucheSys.rechercheIndice("editComp"+this.nom+"_4",rucheSys.listeEditeur);
    var indice5 = rucheSys.rechercheIndice("editComp"+this.nom+"_5",rucheSys.listeEditeur);
    rucheSys.listeEditeur[indice1].recupDonneesVar();
    rucheSys.listeEditeur[indice2].recupDonneesVar();
    rucheSys.listeEditeur[indice3].recupDonneesVar();
    rucheSys.listeEditeur[indice4].recupDonneesVar();
    rucheSys.listeEditeur[indice5].recupDonneesVar();
    
    // récupère le contenu des éditeurs
    var oef_nomFichier = rucheSys.listeEditeur[indice1].toOEF();
    var oef_tailleLPx = rucheSys.listeEditeur[indice2].toOEF();
    var oef_tailleHPx = rucheSys.listeEditeur[indice3].toOEF();
    var oef_posXCentre = rucheSys.listeEditeur[indice4].toOEF();
    var oef_posYCentre = rucheSys.listeEditeur[indice5].toOEF();
    
    // construit la suite de commandes
    var codePrep = "\\text{dessin"+this.nom+" = draw("+oef_tailleX+", ";
    codePrep += oef_tailleY+"\n";
    codePrep += oef_editFlydraw+")\n}\n";
    
    return codePrep;
}


//---------------------------------//


Composant.prototype.toOEF = function()
/*
 * Fonction qui permet de générer le code OEF de la variable.
 *
 */
{
    
}

