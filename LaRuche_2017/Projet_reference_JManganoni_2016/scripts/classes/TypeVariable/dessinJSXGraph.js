/*
* Types de variables de dessin JSXGraph
* Classe fille de la classe "TypeVariable"
* Un objet "variable" contiendra un objet repr�sentant le type
* Ceci permet de modifier le type d'une variable � la vol�e
*/

/**
 * TODO Comme ce que je montre dans /essayer/class.js,
 * je conseille que nous utitilisons un facon de nommer les variable
 * comme exemple wg.class.DessinJSXGraph = func...
 * les noms peuvent etre longue mais c'est effectue de gerer et combiner nos travails,
 * et meme pour eviter les variable global pas necessaire (important si nous allons le "repack" comme un lib de js)
 */
/*
 *EDIT : 
 * Je suis pas sur d'avoir compris le code de /essayer/class.js, mais si j'ai bien compris ça sera
 * pour l'histoire de la boite à outil qui contient plusieur élément, et si c'est effectivement
 * ça, c'est une bonne idée, mais on verra quand on en sera la!
 * après pour les noms de variable je suis d'accord, faut juste se mettre d'accord :p
 */
/**
 * D'accord
 * -- Yan
 */

/**
 *
 * @param nom
 * @constructor
 */
DessinJSXGraph = function(nom){

    // ------ ATTRIBUTS   ----- //

    this.nom = nom;
    this.valeur = "";
    this.proto = "DessinJSXGraph";

    this.parametres = [];
}

DessinJSXGraph.prototype = Object.create(TypeVariable.prototype);
DessinJSXGraph.prototype.constructor = DessinJSXGraph;

DessinJSXGraph.prototype.proto = "DessinJSXGraph";
DessinJSXGraph.prototype.nomAffiche = "dessin JSXGraph";
DessinJSXGraph.prototype.gereDessinEnonce = true;
DessinJSXGraph.prototype.champs = [];
DessinJSXGraph.prototype.aUneAide = false;

DessinJSXGraph.prototype.aide = "Aide sur les dessins JSXGraph";

DessinJSXGraph.prototype.categorieObjet = "Dessin";

DessinJSXGraph.prototype.categorieMatiere = "";

DessinJSXGraph.prototype.categorieSection = "";


//----- METHODES -----//

DessinJSXGraph.prototype.creerBloc = function(nom)
{
    TypeVariable.prototype.creerBloc(nom);

    var divBloc = $("#RidPrBloc_Interne_"+nom);
    //*divBloc.append("<div>");*/

    var div_editJSXGraph = document.createElement("DIV");
    div_editJSXGraph.id = "editJSXGraph" + nom;
    div_editJSXGraph.classeName = "Rcl_Droppable";    
}


DessinJSXGraph.prototype.creerAide = function(nom){
    /*Aide jsxgraph*/
}

DessinJSXGraph.prototype.htmlDessinsEnnonce = function(){
    /*TODO*/
    return "<img></img>";
}

DessinJSXGraph.prototype.chargeEtat = function(elem){
    
}

DessinJSXGraph.prototype.recupDonnees = function(){
    
}

DessinJSXGraph.prototype.toOEF = function(){
    /*TODO : Construire le code oef*/
}

DessinJSXGraph.prototype.toOEFFromStatement = function(){
    /*TODO*/
}

// a activer lorsque le module de dessin JSXGraph sera au point
//$(document).ready(function(){
//    rucheSys.initClasseTypeVariable(DessinJSXGraph);
//});
