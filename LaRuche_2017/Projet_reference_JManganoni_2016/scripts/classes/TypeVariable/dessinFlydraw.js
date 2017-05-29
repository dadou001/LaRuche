/*
 * Types de variables de dessin Flydraw.
 * Classe fille de la classe "TypeVariable"
 * Un objet "variable" CONTIENDRA un objet représentant le type.
 * Ceci permet de modifier le type d'une variable à la volée.
 */

DessinFlydraw = function(nom){
    
    //--------- ATTRIBUTS ---------//
    
    
    this.nom = nom;			// nom du type.
    this.valeur = "";		// valeur du composant
    this.proto = "DessinFlydraw";   // nature de la classe parente
    
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

// Définit DessinFlydraw comme une classe dérivée de TypeVariable
DessinFlydraw.prototype = Object.create(TypeVariable.prototype);
DessinFlydraw.prototype.constructor = DessinFlydraw;   // y parait qu'il faut corriger le constructeur...

// Définit les nouveaux attributs (de la classe dérivée

DessinFlydraw.prototype.proto = "DessinFlydraw";   // nature de la classe parente
DessinFlydraw.prototype.nomAffiche = "dessin Flydraw";  // nom affiché dans le menu
DessinFlydraw.prototype.gereDessinEnonce = true;    // - true : c'est la variable qui gère le dessin à envoyer
                                                    //          dans l'énoncé grâce à la fonction "htmlDessinEnonce"
                                                    // - false : cas par défaut, seul est affiché le span standard nom de la variable
DessinFlydraw.prototype.champs = [
                                 ];
DessinFlydraw.prototype.aUneAide = true;   // drapeau, si "true" gère une aide dans le bloc préparation
DessinFlydraw.prototype.aide = "Aide sur les dessins Flydraw";
// les catégories permettent de classifier les variables par exemple  Dessin Physique Optique
DessinFlydraw.prototype.categorieObjet = "Dessin";     // nom de la catégorie d'objet de ce type de variable, par exemple Dessin, Fonction, ...
DessinFlydraw.prototype.categorieMatiere = "";     // nom de la catégorie de matière de ce type de variable, par exemple physique, mathématiques, chimie, français,
DessinFlydraw.prototype.categorieSection = "";     // nom de la catégorie de section de ce type de variable, par exemple optique, analyse, chimie organique, orthographe


//--------- METHODES ----------//

DessinFlydraw.prototype.creerBloc = function(nom)
/*
 * Méthode qui permet de créer un bloc du type de la variable
 * dans l'onglet préparation
 * nom : nom de la variable créée
 */
{
    // Appel de la fonction de la classe parente pour créer
    // le squelette du bloc
    TypeVariable.prototype.creerBloc(nom);
    
    // **** Fabrication du contenu du bloc ****
    
    var divBloc = $("#RidPrBloc_Interne_"+nom);
    
    divBloc.append("<div>");
    // Petit éditeur pour la taille en X
    var div_tailleX = document.createElement("DIV");
    div_tailleX.id = "tailleX" + nom;
    div_tailleX.className = "Rcl_Droppable";
    div_tailleX.style.display = "inline-block";
    div_tailleX.style.width="100px";
    div_tailleX.style.verticalAlign="middle";
    
    // Petit éditeur pour la taille en Y
    var div_tailleY = document.createElement("DIV");
    div_tailleY.id = "tailleY" + nom;
    div_tailleY.className = "Rcl_Droppable";
    div_tailleY.style.display = "inline-block";
    div_tailleY.style.width="100px";
    div_tailleY.style.verticalAlign="middle";
    
    // Editeur pour le contenu Flydraw
    var div_editFlydraw = document.createElement("DIV");
    div_editFlydraw.id = "editFlydraw" + nom;
    div_editFlydraw.className = "Rcl_Droppable";
    
    var div_justif = document.createElement("DIV");
    var div_justif1 = document.createElement("DIV");
    
    // Attention, Mettre les textes dans un span
    // (sinon, ils ne sont pas éliminés quand ce sera nécessaire)
    divBloc.append("<span>\r\nLargeur du dessin (en pixels) :</span>");
    divBloc.append(div_tailleX);
    divBloc.append(div_justif);
    divBloc.append("<span>\r\nHauteur du dessin (en pixels) :</span>");
    divBloc.append(div_tailleY);
    divBloc.append(div_justif1);
    divBloc.append("<span>\r\nSuite de commandes Flydraw :</span>");
    divBloc.append(div_editFlydraw);
    
    // Fabrication des éditeurs
    var editeurTailleX = new Editeur(div_tailleX.id,rucheSys,true);
    var editeurTailleY = new Editeur(div_tailleY.id,rucheSys,true);
    var editeurEditFlydraw = new Editeur(div_editFlydraw.id,rucheSys,true);
    
    rucheSys.listeEditeur.push(editeurTailleX);
    rucheSys.listeEditeur.push(editeurTailleY);
    rucheSys.listeEditeur.push(editeurEditFlydraw);
    
//    EssaimFlydraw.prototype.initEnonce.call(this);
    
//    EssaimFlydraw.prototype.initAnalyse.call(this);
    
}

DessinFlydraw.prototype.creerAide =function(nom)
/*
 * Création de la partie "Aide" de la variable. Dépend du type.
 */
{
    if (this.aUneAide==true) {
        var nomVar = rucheSys.id_dernierMenuClic.slice("RidPrBloc_Choix_Type_Variable_".length,rucheSys.id_dernierMenuClic.length);
        var li = $("#RidPrBloc_"+nomVar);
        var indice = rucheSys.rechercheIndice(nom, rucheSys.listeVariables);

        li.append(rucheSys.listeVariables[indice].aideInit($("#editFlydraw"+nom)[0].id));
 
        // Positionne le bouton d'aide en face de l'éditeur de commandes
        $("#aideVar"+nom).css("margin","30px 7px 0 0");
    
        
        // remplit la liste des noeuds pour l'aide des commandes Flydraw
        var zNodes = [
                      {idAide:1, id:1, pId:0, name:"Commandes Flydraw", open: true},
                      {idAide:2,  id:2, pId:1, name:"Tracé de points, droites, flèches", open: true},
                      {idAide:3,  id:3, pId:2, name:"pixels"},
                      {idAide:4,  id:4, pId:2, name:"setpixel"},
                      {idAide:5,  id:5, pId:2, name:"point"},
                      {idAide:6,  id:6, pId:2, name:"points"},
                      {idAide:7,  id:7, pId:2, name:"crosshair"},
                      {idAide:8,  id:8, pId:2, name:"crosshairs"},
                      {idAide:9,  id:9, pId:2, name:"crosshairsize"},
                      {idAide:10,  id:10, pId:2, name:"segment"},
                      {idAide:11,  id:11, pId:2, name:"polyline"},
                      {idAide:12,  id:12, pId:2, name:"rays"},
                      {idAide:13,  id:13, pId:2, name:"parallel"},
                      {idAide:14,  id:14, pId:2, name:"hline"},
                      {idAide:15,  id:15, pId:2, name:"vline"},
                      {idAide:16,  id:16, pId:2, name:"dlines"},
                      {idAide:17,  id:17, pId:2, name:"dhlines"},
                      {idAide:18,  id:18, pId:2, name:"dvlines"},
                      {idAide:19,  id:19, pId:2, name:"arrow"},
                      {idAide:20,  id:20, pId:2, name:"arrow2"},
                      {idAide:21,  id:21, pId:2, name:"darrow"},
                      {idAide:22,  id:22, pId:2, name:"darrow2"},
                      {idAide:23,  id:23, pId:1, name:"Tracé d'arc, ellipse, polygone"},
                      {idAide:24,  id:24, pId:23, name:"arc"},
                      {idAide:25,  id:25, pId:23, name:"circle"},
                      {idAide:26,  id:26, pId:23, name:"ellipse"},
                      {idAide:27,  id:27, pId:23, name:"polygon"},
                      {idAide:28,  id:28, pId:23, name:"rect"},
                      {idAide:29,  id:29, pId:23, name:"square"},
                      {idAide:30,  id:30, pId:23, name:"triangle"},
                      {idAide:31,  id:31, pId:1, name:"Figures pleines, coloriage de régions"},
                      {idAide:32,  id:32, pId:31, name:"fcircle"},
                      {idAide:33,  id:33, pId:31, name:"fellipse"},
                      {idAide:34,  id:34, pId:31, name:"fpoly"},
                      {idAide:35,  id:35, pId:31, name:"frect"},
                      {idAide:36,  id:36, pId:31, name:"fsquare"},
                      {idAide:37,  id:37, pId:31, name:"ftriangle"},
                      {idAide:38,  id:38, pId:31, name:"diamondfill"},
                      {idAide:39,  id:39, pId:31, name:"dotfill"},
                      {idAide:40,  id:40, pId:31, name:"fill"},
                      {idAide:41,  id:41, pId:31, name:"filltoborder"},
                      {idAide:42,  id:42, pId:31, name:"gridfill"},
                      {idAide:43,  id:43, pId:31, name:"hatchfill"},
                      {idAide:44,  id:44, pId:1, name:"Paramètres du dessin"},
                      {idAide:45,  id:45, pId:44, name:"range"},
                      {idAide:46,  id:46, pId:44, name:"xrange"},
                      {idAide:47,  id:47, pId:44, name:"yrange"},
                      {idAide:48,  id:48, pId:44, name:"linewidth"},
                      {idAide:49,  id:49, pId:44, name:"trange"},
                      {idAide:50,  id:50, pId:44, name:"transparent"},
                      {idAide:51,  id:51, pId:1, name:"Texte"},
                      {idAide:52,  id:52, pId:51, name:"text"},
                      {idAide:53,  id:53, pId:51, name:"textup"},
                      {idAide:54,  id:54, pId:51, name:"comment"},
                      {idAide:55,  id:55, pId:1, name:"Tracé de fonctions, surfaces"},
                      {idAide:56,  id:56, pId:55, name:"plot"},
                      {idAide:57,  id:57, pId:55, name:"plotjump"},
                      {idAide:58,  id:58, pId:55, name:"plotstep"},
                      {idAide:59,  id:59, pId:55, name:"levelcurve"},
                      {idAide:60,  id:60, pId:55, name:"levelstep"},
                      {idAide:61,  id:61, pId:1, name:"Insertion d'une image, transformation"},
                      {idAide:62,  id:62, pId:61, name:"copy"},
                      {idAide:63,  id:63, pId:61, name:"copyresized"},
                      {idAide:64,  id:64, pId:61, name:"affine"},
                      {idAide:65,  id:65, pId:61, name:"rotation"}
                      ];
        var elementsAide = [
                            "<div class=\"Rcl_Help_Title\">Liste des commandes Flydraw</div>",
                            "<div class=\"Rcl_Help_Title\">Tracé de points, de droites et de flèches</div>",
                            "<div class=\"Rcl_Help_Title\">pixels [color],x1,y1,x2,y2,...</div><div class=\"Rcl_Help_Body\">Points de diamètre 1 aux coordonnées (x1 ; y1), (x2 ; y2), ... de couleur optionelle color</div>",
                            "<div class=\"Rcl_Help_Title\">setpixel x,y,[color]</div><div class=\"Rcl_Help_Body\">Point de coordonnées (x ; y) et de diamètre 1. Couleur optionelle color</div>",
                            "<div class=\"Rcl_Help_Title\">point x,y,[color]</div><div class=\"Rcl_Help_Body\">Point de coordonnées (x; y) et de diamètre l’épaisseur de trait. L'épaisseur est fixée par la commande linewidth w</div>",
                            "<div class=\"Rcl_Help_Title\">points [color],x1,y1,x2,y2,...</div><div class=\"Rcl_Help_Body\">Points de coordonnées (x1; y1), (x2; y2), ... et de diamètre l’épaisseur de trait.</div>",
                            "<div class=\"Rcl_Help_Title\">crosshair x1,y1,[color]</div><div class=\"Rcl_Help_Body\">Dessine une croix en (x1,y1)</div>",
                            "<div class=\"Rcl_Help_Title\">crosshairs [color],x1,y1,x2,y2,...</div><div class=\"Rcl_Help_Body\">Dessine des croix aux points de coordonnées (x1,y1), (x2,y2), ...</div>",
                            "<div class=\"Rcl_Help_Title\">crosshairsize w</div><div class=\"Rcl_Help_Body\">fixe la taille (en points) des croix</div>",
                            "<div class=\"Rcl_Help_Title\">segment x1,y1,x2,y2,[color]</div><div class=\"Rcl_Help_Body\">Segment entre les points de coordonnées (x1 ; y1) et (x2 ; y2).</div>",
                            "<div class=\"Rcl_Help_Title\">polyline [color],x1,y1,x2,y2,x3,y3...</div><div class=\"Rcl_Help_Body\">Ligne polygonale joignant les points (x1; y1), (x2; y2), (x3 ; y3) ...</div>",
                            "<div class=\"Rcl_Help_Title\">rays [color],x0,y0,x1,y1,x2,y2...</div><div class=\"Rcl_Help_Body\">Segments joignant (x0; y0) et (x1; y1), (x0; y0) et (x2 ; y2), ...</div>",
                            "<div class=\"Rcl_Help_Title\">parallel x1,y1,x2,y2,xv,yv,n,[color]</div><div class=\"Rcl_Help_Body\">Trace n segments parallèles partant du segment d’extrémités (x1; y1) et (x2; y2) avec le déplacement de vecteur (xv ; yv).</div>",
                            "<div class=\"Rcl_Help_Title\">hline x,y,[color]</div><div class=\"Rcl_Help_Body\">Droite horizontale passant par le point (x ; y).</div>",
                            "<div class=\"Rcl_Help_Title\">vline x,y,[color]</div><div class=\"Rcl_Help_Body\">Droite verticale passant par le point (x ; y).</div>",
                            "<div class=\"Rcl_Help_Title\">dlines [color],x1,y1,x2,y2,x3,y3...</div><div class=\"Rcl_Help_Body\">Ligne polygonale en pointillés joignant les points (x1; y1), (x2; y2), (x3; y3) ...</div>",
                            "<div class=\"Rcl_Help_Title\">dhline x,y,[color]</div><div class=\"Rcl_Help_Body\">Droite horizontale en pointillés passant par le point (x ; y).</div>",
                            "<div class=\"Rcl_Help_Title\">dvline x,y,[color]</div><div class=\"Rcl_Help_Body\">Droite verticale en pointillés passant par le point (x ; y).</div>",
                            "<div class=\"Rcl_Help_Title\">arrow x1,y1,x2,y2,l,[color]</div><div class=\"Rcl_Help_Body\">Flèche allant du point (x1 ; y1) vers le point (x2 ; y2) et dont la tête est de longueur l pixels.</div>",
                            "<div class=\"Rcl_Help_Title\">arrow2 x1,y1,x2,y2,l,[color]</div><div class=\"Rcl_Help_Body\">Flèche entre les points (x1; y1) et (x2; y2) à deux têtes de longueur l pixels.</div>",
                            "<div class=\"Rcl_Help_Title\">darrow x1,y1,x2,y2,l,[color]</div><div class=\"Rcl_Help_Body\">Flèche en pointillés allant du point (x1; y1) vers le point (x2 ; y2) dont la tête est de longueur l pixels.</div>",
                            "<div class=\"Rcl_Help_Title\">darrow2 x1,y1,x2,y2,l,[color]</div><div class=\"Rcl_Help_Body\">Flèche en pointillés entre les points (x1 ; y1) et (x2 ; y2) et à deux têtes de longueur l pixels.</div>",
                            "<div class=\"Rcl_Help_Title\">Tracés d’arcs, d'ellipses, de polygones</div>",
                            "<div class=\"Rcl_Help_Title\">arc x,y,w,h,a1,a2,[color]</div><div class=\"Rcl_Help_Body\">Arc de l’ellipse de largeur w et de hauteur h centrée en (x,y) (coordonnées mathématiques) entre l’angle a1 et l’angle a2 en degrés.</div>",
                            "<div class=\"Rcl_Help_Title\">circle x,y,d,[color]</div><div class=\"Rcl_Help_Body\">Cercle de centre (x ; y) et de diamètre d pixels.</div>",
                            "<div class=\"Rcl_Help_Title\">ellipse x,y,w,h,[color]</div><div class=\"Rcl_Help_Body\">Ellipse de largeur w et de hauteur h centrée en (x,y).</div>",
                            "<div class=\"Rcl_Help_Title\">polygon [color],x1,y1,x2,y2,x3,y3...</div><div class=\"Rcl_Help_Body\">Polygone de sommets (x1 ; y1), (x2 ; y2), (x3 ; y3)...</div>",
                            "<div class=\"Rcl_Help_Title\">rect x1,y1,x2,y2,[color]</div><div class=\"Rcl_Help_Body\">Rectangle de diagonale (x1 ; y1) et (x2 ; y2).</div>",
                            "<div class=\"Rcl_Help_Title\">square x,y,s,[color]</div><div class=\"Rcl_Help_Body\">Carré de coin supérieur gauche (x ; y) et de côté r.</div>",
                            "<div class=\"Rcl_Help_Title\">triangle x1,y1,x2,y2,x3,y3,[color]</div><div class=\"Rcl_Help_Body\">Triangle de sommet (x1 ; y1), (x2 ; y2), (x3 ; y3).</div>",
                            "<div class=\"Rcl_Help_Title\">Figures pleines et coloriage de régions</div>",
                            "<div class=\"Rcl_Help_Title\">fcircle x,y,d,[color]</div><div class=\"Rcl_Help_Body\">Disque de centre (x ; y) et de diamètre d pixels.</div>",
                            "<div class=\"Rcl_Help_Title\">fellipse x,y,w,h,[color]</div><div class=\"Rcl_Help_Body\">Ellipse de largeur w et de hauteur h centrée en (x,y) et remplie avec la couleur color.</div>",
                            "<div class=\"Rcl_Help_Title\">fpoly [color],x1,y1,x2,y2,x3,y3...</div><div class=\"Rcl_Help_Body\">Polygone de sommets (x1 ; y1), (x2 ; y2), (x3 ; y3) ... et rempli avec la couleur color</div>",
                            "<div class=\"Rcl_Help_Title\">frect x1,y1,x2,y2,[color]</div><div class=\"Rcl_Help_Body\">Rectangle de diagonale (x1 ; y1) et (x2 ; y2) et rempli avec la couleur color.</div>",
                            "<div class=\"Rcl_Help_Title\">fsquare x,y,s,[color]</div><div class=\"Rcl_Help_Body\">Carré de coin supérieur gauche (x; y) et de côté de longueur s, rempli avec la couleur color.</div>",
                            "<div class=\"Rcl_Help_Title\">ftriangle x1,y1,x2,y2,x3,y3,[color]</div><div class=\"Rcl_Help_Body\">Triangle de sommets (x1 ; y1), (x2 ; y2), (x3 ; y3) et rempli avec la couleur color.</div>",
                            "<div class=\"Rcl_Help_Title\">diamondfill x,y,nx,ny,[color]</div><div class=\"Rcl_Help_Body\">Remplit la région contenant le point (x ; y) avec des lignes de couleur color (quadrillage oblique). (nx; ny) est la distance verticale et horizontale (en pixels) entre deux lignes.</div>",
                            "<div class=\"Rcl_Help_Title\">dotfill x,y,nx,ny,[color]</div><div class=\"Rcl_Help_Body\">Remplit la région contenant le point (x ; y) avec de gros points de couleur color. (nx ; ny) est la distance verticale et horizontale entre deux points.</div>",
                            "<div class=\"Rcl_Help_Title\">fill x,y,[color]</div><div class=\"Rcl_Help_Body\">Colorie la région contenant le point (x; y) avec la couleur color</div>",
                            "<div class=\"Rcl_Help_Title\">filltoborder x,y,[color1],[color2]</div><div class=\"Rcl_Help_Body\">Colorie avec la couleur color2 la région contenant (x ; y) et délimitée par la couleur color1.</div>",
                            "<div class=\"Rcl_Help_Title\">gridfill x,y,nx,ny,[color]</div><div class=\"Rcl_Help_Body\">Remplit la région contenant le point (x ; y) avec des lignes de couleur color (quadrillage droit) . (nx ; ny) est la distance verticale et horizontale entre deux lignes.</div>",
                            "<div class=\"Rcl_Help_Title\">hatchfill x,y,nx,ny,[color]</div><div class=\"Rcl_Help_Body\">Remplit la région contenant le point (x ; y) avec des lignes (simples) de couleur color. (nx ; ny) est la dis- tance verticale et horizontale entre deux lignes.</div>",
                            "<div class=\"Rcl_Help_Title\">Paramètres d’une figure</div>",
                            "<div class=\"Rcl_Help_Title\">range x1,x2,y1,y2</div><div class=\"Rcl_Help_Body\">Fixe les coordonnées des bords de l’image.</div>",
                            "<div class=\"Rcl_Help_Title\">xrange x1,x2</div><div class=\"Rcl_Help_Body\">Détermine les coordonnées horizontales mathéma- tiques des bords de l’image.</div>",
                            "<div class=\"Rcl_Help_Title\">yrange y1,y2</div><div class=\"Rcl_Help_Body\">Détermine les coordonnées verticales mathématiques des bords de l’image.</div>",
                            "<div class=\"Rcl_Help_Title\">linewidth w</div><div class=\"Rcl_Help_Body\">Epaisseur des traits à w pixels.</div>",
                            "<div class=\"Rcl_Help_Title\">trange t1,t2</div><div class=\"Rcl_Help_Body\">Intervalle du paramètre pour le tracé des courbes paramétriques (par défaut 0 et 1).</div>",
                            "<div class=\"Rcl_Help_Title\">transparent [color]</div><div class=\"Rcl_Help_Body\">Définit la couleur color comme transparente.</div>",
                            "<div class=\"Rcl_Help_Title\">Insertion de texte</div>",
                            "<div class=\"Rcl_Help_Title\">text [color],x,y,[font],[string]</div><div class=\"Rcl_Help_Body\">Ecrit string au point de coordonnées (x; y) avec la police font=small,medium,large ou giant.</div>",
                            "<div class=\"Rcl_Help_Title\">textup [color],x,y,[font],[string]</div><div class=\"Rcl_Help_Body\">Ecrit string de bas en haut au point de coordonnées (x; y) avec la police font=small,medium,large ou giant.</div>",
                            "<div class=\"Rcl_Help_Title\">comment</div><div class=\"Rcl_Help_Body\">Ligne de commentaire.</div>",
                            "<div class=\"Rcl_Help_Title\">Tracé de fonctions et de surfaces</div>",
                            "<div class=\"Rcl_Help_Title\">plot [color],[formula]</div><div class=\"Rcl_Help_Body\">Courbe représentative de la fonction formula.</div>",
                            "<div class=\"Rcl_Help_Title\">plotjump j</div><div class=\"Rcl_Help_Body\">Saut de la courbe tracée si deux points consécutifs ont une distance de plus de j pixels. Utile afin d’éviter de dessiner des fonctions discontinues comme des fonctions continues. Valeur par défaut : 200.</div>",
                            "<div class=\"Rcl_Help_Title\">plotstep n</div><div class=\"Rcl_Help_Body\">Nombre de points calculés dans le tracé de courbes. Valeur par défaut : 100.</div>",
                            "<div class=\"Rcl_Help_Title\">levelcurve [color],[expression],l1,l2,...</div><div class=\"Rcl_Help_Body\">Dessine des courbes de niveau de la surface décrite par une expression de niveaux l1, l2,...</div>",
                            "<div class=\"Rcl_Help_Title\">levelstep n</div><div class=\"Rcl_Help_Body\">Règle le nombre d’étapes en pixels utilisé pour le dessin des courbes de niveaux. Entre 1 et 16, defaut : 4.</div>",
                            "<div class=\"Rcl_Help_Title\">Insertion d’une image dans un dessin et transformations d’un dessin (voir l’aide en ligne de createxo pour toutes les commandes)</div>",
                            "<div class=\"Rcl_Help_Title\">copy x,y,x1,y1,x2,y2,[filename]</div><div class=\"Rcl_Help_Body\">Insère le rectangle de diagonale (x1 ; y1) et (x2 ; y2) (dans le repère en pixels) du fichier filename au point (x ; y) : l’extrémité en haut à gauche de l’image est au point (x; y). Si x1 = y1 = x2 = y2 = -1, tout le fichier est copié. [filename] est l’adresse du fichier à partir du répertoire rucheSys/public_html/gifs ou du répertoire indiqué dans common_images pour les modules OEF.</div>",
                            "<div class=\"Rcl_Help_Title\">copyresized x1,y1,x2,y2,dx1,dy1,dx2,dy2,[filename]</div><div class=\"Rcl_Help_Body\">Insère le rectangle de diagonale (x1 ; y1) et (x2 ; y2) du fichier filename dans le rectangle de diagonale (dx1 ; dy1) et (dx2 ; dy2) (remise à la taille réalisée). si x1 = y1 = x2 = y2 = -1, tout le fichier filename est copié</div>",
                            "<div class=\"Rcl_Help_Title\">affine a,b,c,d,tx,ty</div><div class=\"Rcl_Help_Body\">Applique la transformation affine (x ;y) -> [a,b ;c,d](x ;y)+(tx ;ty) aux objets définis ultérieurement.</div>",
                            "<div class=\"Rcl_Help_Title\">rotation d</div><div class=\"Rcl_Help_Body\">Rotation des objets définis ultérieurement de d degrés dans le sens inverse des aiguilles d’une montre, de centre (0 ;0)</div>"
                            ];
    
        rucheSys.listeVariables[indice].aideMenuInit(zNodes,elementsAide);
    }

}

//-----------------------------------//

DessinFlydraw.prototype.htmlDessinEnonce = function()
/*
 * Renvoie le dessin ou le code html à mettre dans l'énoncé à la place de la variable
 *
 */
{
    
    // Gère la taille de l'image
    var tailleImageX = rucheSys.contenuNombreEditeur("tailleX"+this.nom);
    var tailleImageY = rucheSys.contenuNombreEditeur("tailleY"+this.nom);
    // Taille image min = 20 pixels
    if (tailleImageX<20) {tailleImageX = 200;}
    if (tailleImageY<20) {tailleImageY = 200;}
    
    var tagsTailleImage = "width=\""+tailleImageX+"\" height=\""+tailleImageY+"\"";
    var dessinBase64 = TypeVariable.prototype.genereImageVarBase64(this.nom, tailleImageX, tailleImageY, "");
    
    // id de l'image : "imVariableAAAAA_XX"
    // avec AAAAA = nom de la variable, XX = numéro de l'image, unique dans tout l'éditeur.
    rucheSys.nb_imageVariable++;
    var idImVariable = "imVariable"+this.nom+"_"+rucheSys.nb_imageVariable;

    // classes d'image associées :
    //    - imVariableXXXX, avec XXXX = type d'essaim (proto)
    //    - nomEssaimYYYY, avec YYYY = nom de l'essaim particulier
    // id de type "reponseZZ" avec ZZ = n° de la reponse associée
    htmlDessin = "<img "+tagsTailleImage+" id=\""+idImVariable+"\" class=\"imObjetVar"+this.proto+" "+"\" src=\""+dessinBase64+"\"></img>";
    
    // htmlDessin = TypeVariable.prototype.genereImg(tailleImageX,tailleImageY,dessinBase64);
    return htmlDessin;
}

DessinFlydraw.prototype.chargeEtat = function(elem)
/*
 * Fonction qui permet de charger les valeurs des paramètres de cette variable
 * en fonction de son type.
 * Paramètre : - elem : objet JSON contenant l'objet Variable à charger.
 */
{
    
}

//-----------------------------------//

DessinFlydraw.prototype.recupDonnees = function()
/*
 * Fonction qui permet de récupérer les valeurs des paramètres de la variable.
 *
 */
{
}

//---------------------------------//

DessinFlydraw.prototype.toOEF = function()
/*
 * Fonction qui permet de générer le code OEF de la variable.
 * Retourne une chaine de caractère contenant le code OEF.
 *
 */
{
    // Construit le code OEF
    var indice1 = rucheSys.rechercheIndice("tailleX"+this.nom,rucheSys.listeEditeur);
    var indice2 = rucheSys.rechercheIndice("tailleY"+this.nom,rucheSys.listeEditeur);
    var indice3 = rucheSys.rechercheIndice("editFlydraw"+this.nom,rucheSys.listeEditeur);
    rucheSys.listeEditeur[indice1].recupDonneesVar();
    rucheSys.listeEditeur[indice2].recupDonneesVar();
    rucheSys.listeEditeur[indice3].recupDonneesVar();
    
    // récupère le contenu des éditeurs
    var oef_tailleX = rucheSys.listeEditeur[indice1].toOEF();
    var oef_tailleY = rucheSys.listeEditeur[indice2].toOEF();
    var oef_editFlydraw = rucheSys.listeEditeur[indice3].toOEF();
    
    // Construit le code OEF
    var codePrepFD = "\\text{"+this.nom+" = draw("+oef_tailleX+", ";
    codePrepFD += oef_tailleY+"\n";
    codePrepFD += oef_editFlydraw+")\n}\n";
    
    return codePrepFD;
}

//---------------------------------//

DessinFlydraw.prototype.toOEFFromStatement = function()
/*
 * Fonction qui permet de générer le code OEF dans le statement correspondant
 * à l'état de la variable.
 * Retourne une chaine de caractères contenant le code OEF.
 */
{
    // Construit le code OEF
    
    var codePrepVariable = "<div>Sortie de la variable dessin "+this.nom+" dans l'énoncé</div>";
    
    return codePrepVariable;
}

//---------------------------------//

/*
 * Déclaration du type de variable (enregistre la classe dans l'objet système Ruche)
 * au chargement du code. IMPORTANT : le code des classes dérivées
 * doit être chargé APRES le code de la classe "TypeVariable" de base.
 */

$(document).ready(function() {
   rucheSys.initClasseTypeVariable(DessinFlydraw);
});
