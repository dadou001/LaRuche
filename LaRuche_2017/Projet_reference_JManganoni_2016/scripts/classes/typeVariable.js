/*
 * Classe parente pour les types de variables (ou une classe de variables).
 * Une classe fille représentera un type de variable particulier. Un objet "variable"
 * CONTIENDRA un objet représentant le type. Ceci permet de modifier le type d'une variable
 * à la volée.
 * Les classes filles sont regroupées dans le dossier "TypesVariable".
 */

TypeVariable = function(nom){
    
    //--------- ATTRIBUTS ---------//
    
    
    this.nom = nom;			// nom du type.
    this.valeur = "";		// valeur du composant
    this.proto = "TypeVariable";   // nature de la classe parente
    
    // Définition des paramètres. Tableau de tableaux.
    // Chaque tableau contient, dans l'ordre :
    //              - la description de l'item (affichée devant ou derrière lui
    //              - le type d'item : "checkbox", "menu" ou "edit"
    //              - la valeur de l'item : checked/unchecked pour un bouton par exemple
    //              - la suite de paramètres de l'item si il y en a
    //                  (pour le menu, liste des valeurs dans un tableau puis liste des options affichées)
    this.parametres = [
                       ];
    
}
TypeVariable.prototype.proto = "TypeVariable";   // nature de la classe parente
TypeVariable.prototype.nomAffiche = "Variable générique";  // nom affiché dans le menu
TypeVariable.prototype.gereDessinEnonce = false;    // - true : c'est la variable qui gère le dessin à envoyer
                                                    //          dans l'énoncé grâce à la fonction "htmlDessinEnonce"
                                                    // - false : cas par défaut, seul est affiché le span standard nom de la variable
TypeVariable.prototype.aUneAide = false;   // drapeau, si "true" gère une aide dans le bloc préparation
TypeVariable.prototype.champs = [
                                 ["Le bouton qui va","checkbox",true],
                                 ["La liste qui va","menu","option3",
                                  ["","option1","option2","option3"],
                                  ["Choisir...","option1 à moi","option2 à toi","option3 à nous"]],
                                 ["La valeur qui va","edit","Contenu par défaut"]
                                 ];
TypeVariable.prototype.zNodesAide = [];        // titres des noeuds de l'arbre d'aide (zTree)
TypeVariable.prototype.aide = "Aide sur le type de variable. Ceci est le type générique";
// les catégories permettent de classifier les variables par exemple  Dessin Physique Optique
TypeVariable.prototype.categorieObjet = "";     // nom de la catégorie d'objet de ce type de variable, par exemple Dessin, Fonction, ...
TypeVariable.prototype.categorieMatiere = "";     // nom de la catégorie de matière de ce type de variable, par exemple physique, mathématiques, chimie, français,
TypeVariable.prototype.categorieSection = "";     // nom de la catégorie de section de ce type de variable, par exemple optique, analyse, chimie organique, orthographe


//--------- METHODES ----------//

TypeVariable.prototype.creerBloc = function(nom)
/*
 * Méthode qui permet de créer un bloc du type de la variable
 * dans l'onglet préparation
 * fonction générique,
 * à utiliser dans l'essaim dérivé (voir exemple dessinFlydraw)
 * nom : nom de la variable créée
 */
{
    $("#RidPrBloc_Interne_"+nom).children().first().nextAll().remove();
    $("#RidPrBloc_Interne_"+nom).nextAll().remove();
}


//-----------------------------------//



TypeVariable.prototype.chargeEtat = function(elem)
/*
 * Fonction qui permet de charger les valeurs des paramètres de cette variable
 * en fonction de son type.
 * Paramètre : - elem : objet JSON contenant l'objet Variable à charger.
 */
{
    
}

//-----------------------------------//

TypeVariable.prototype.recupDonnees = function()
/*
 * Fonction qui permet de récupérer les valeurs des paramètres de la variable.
 *
 */
{
}

//---------------------------------//

TypeVariable.prototype.toOEF = function()
/*
 * Fonction qui permet de générer le code OEF de la variable.
 * Retourne une chaine de caractère contenant le code OEF.
 * fonction générique.
 *
 */
{
    // Construit le code OEF
    var codePrepVariable = "\n// Code envoyé par la variable générique vide "+this.nom+"\n";
    
    return codePrepVariable;

}

//---------------------------------//

TypeVariable.prototype.toOEFFromStatement = function()
/*
 * Fonction qui permet de générer le code OEF dans le statement correspondant
 * à l'état de la variable.
 * Retourne une chaine de caractère contenant le code OEF.
 * fonction générique.
 * Voir dans l'essaim "QCM" l'exemple d'une surcharge de cette fonction
 */
{
    // Construit le code OEF
    
    var codePrepVariable = "<div>Sortie de la variable générique "+this.nom+" dans l'énoncé</div>";
    
    return codePrepVariable;
}

//---------------------------------//

TypeVariable.prototype.genereImageVarBase64 = function(nomVar, tailleX, tailleY, description, fichierImage)
/*
 * Génération d'une image png en base64 constituée de l'image de fond "fichierImage"
 * sur laquelle on superpose le symbole d'une variable de nom "nomVar"
 *
 * params :     - nomVar : nom de la variable
 *              - tailleX, tailleY : taille en X et Y de l'image
 *              - description : chaine de caractères optionnelle à superposer au centre de l'image
 *              - fichierImage : fichier image de fond (optionnelle).
 *                      Si fichierImage non défini, met un cadre avec une croix.
 */
{
    // Construit un canvas pour le transformer en png, converti en format Base64
    // NE FONCTIONNE QUE SOUS HTML5 (pas sur les anciens navigateurs)

    var c = $("<canvas>",{
              id:"canGenImVar",
              //              style:"display:none",
              });
    c[0].width = tailleX;
    c[0].height = tailleY;
    $("body").append(c);
    var ctx = c[0].getContext("2d");
    //    var img = document.getElementById("scream");
    //    ctx.drawImage(img,0,0);
    
    ctx.font = "14px Arial";
    var txtWidth = ctx.measureText(nomVar).width;
    var radiusArc = 15;
    var xStartRect = 25;
    var xEndRect = xStartRect+txtWidth;
    var yStartRect = 10;
    var yEndRect = yStartRect+2*radiusArc;
    
    ctx.fillStyle = "#F0F0F0";
    ctx.fillRect(0,0,tailleX,tailleY);
    
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.lineTo(tailleX,tailleY);
    ctx.moveTo(tailleX,0);
    ctx.lineTo(0,tailleY);
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#D0D0D0";
    ctx.stroke();
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.rect(0,0,tailleX,tailleY);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.fillStyle = "#D0D0D0";
    ctx.fillText(description,xStartRect,yEndRect+2*radiusArc);
    
    ctx.beginPath();
    ctx.fillStyle = "rgb(175,217,235)";
    ctx.arc(xStartRect, yStartRect+radiusArc, radiusArc, 0 , 2*Math.PI);
    ctx.fill();
    ctx.arc(xEndRect, yStartRect+radiusArc, radiusArc, 0 , 2*Math.PI);
    ctx.fill();
    ctx.fillRect(xStartRect,yStartRect,xEndRect-xStartRect,yEndRect-yStartRect);
    
    ctx.fillStyle = "black";
    ctx.fillText(nomVar,xStartRect,yStartRect+(yEndRect-yStartRect)*0.6);
    var dataUrl = c[0].toDataURL("image/png");
    
    console.log(dataUrl);
    
    $("#canGenImVar").remove();
    
    return dataUrl;
}

//---------------------------------//

/*
 * Déclaration du type de variable (enregistre la classe dans l'objet Ruche)
 * au chargement du code. IMPORTANT : le code des classes dérivées
 * doit être chargé APRES le code de la classe "TypeVariable" de base.
 */

// ne charge pas ce type de variable, il est virtuel
//$(document).ready(function() {
//   rucheSys.initClasseTypeVariable(TypeVariable);
//}

