/*
 * Classe Essaim de Dessin Flydraw :
 * Permet de créer un bloc d'instructions générant un dessin utilisant Flydraw.
 */

EssaimFlydraw = function(num)
{
    // Appelle le constructeur parent
    Essaim.call(this,num);
    
    //--------- ATTRIBUTS ---------//
    
    this.nom = "Flydraw" + num;     // nom de l'élément
    this.numero = num;          // numéro de cet essaim
    this.proto = "EssaimFlydraw";   // nature de la classe

    this.tailleImageEnonceX = 200;  // taille en X de l'image énoncé par défaut
    this.tailleImageEnonceY = 200;  // taille en X de l'image énoncé par défaut
}

    //--------- Déclaration comme classe dérivée de Essaim ---------//

EssaimFlydraw.prototype = Object.create(Essaim.prototype);
EssaimFlydraw.prototype.constructor = EssaimFlydraw;

    // Définit les nouveaux attributs

EssaimFlydraw.prototype.nomAffiche = "Essaim : Dessin Flydraw";   // nom affiché dans le menu
EssaimFlydraw.prototype.proto = "EssaimFlydraw"; // nature de la classe
                                        // ATTENTION : DOIT ETRE LE MEME QUE this.proto CI—DESSUS
EssaimFlydraw.prototype.imageEnonce = "images_essaims/essaimFlydraw.png"; // image à insérer dans l'énoncé
EssaimFlydraw.prototype.gereReponse = false; // drapeau, si "true", gère une réponse dans l'analyse
EssaimFlydraw.prototype.aUneAide = true;   // drapeau, si "true" gère une aide dans le bloc préparation
EssaimFlydraw.prototype.gereTailleImageEnonce = true; // si "true", fixe la taille de l'image dans l'énoncé

    //--------- METHODES ----------//
    

EssaimFlydraw.prototype.initEnonce = function()
/*
 * Initialisation de la partie "énoncé" de l'essaim
 * ajoute un bouton dans la liste d'Essaims de l'énoncé
 * Cas spécial, cet essaim gère aussi la taille de l'image
 */
{
    var tab = document.getElementById('Rid_Enonce_Essaims_List');
    var li = document.createElement('li');
    li.id = "RidEnEs_"+this.nom;
    
    // Bouton ajouté dans la liste des "actions d'Essaim" de l'énoncé
    var bouton = document.createElement('button');
    bouton.id = "boutonEssaimEnonce"+this.nom;
    bouton.className = "Rcl_Surligne_Essaim";
    var txt = document.createTextNode( this.nom );
    bouton.appendChild(txt);
    
    bouton.onclick = function(){
        nomEssaim = li.id.slice("RidEnEs_".length,li.id.length); // On supprime le "RidEnEs_" devant le nom de la variable
        var ind = rucheSys.rechercheIndice(nomEssaim,rucheSys.listeBlocPrepa);
        
        var essaimFd = rucheSys.listeBlocPrepa[ind];
        
        // Si gère réponse, ne peut pas créer deux images "essaim" à la fois
        if (essaimFd.gereReponse == true)
        {
            alert("Problème, cet essaim devrait pouvoir gérer plusieurs dessins. Contactez les développeurs");
        }
        else
        {
            var indice1 = rucheSys.rechercheIndice("tailleX"+essaimFd.nom,rucheSys.listeEditeur);
            var indice2 = rucheSys.rechercheIndice("tailleY"+essaimFd.nom,rucheSys.listeEditeur);
            rucheSys.listeEditeur[indice1].recupDonneesVar();
            rucheSys.listeEditeur[indice2].recupDonneesVar();
            
            // récupère le contenu des éditeurs (taille X et Y)
            var oef_tailleX = Number(rucheSys.listeEditeur[indice1].toOEF());
            var oef_tailleY = Number(rucheSys.listeEditeur[indice2].toOEF());
            if (oef_tailleX<5 || oef_tailleY<5) {
                alert("Une image ne peut pas être en largeur\n ou hauteur plus petite que 5 pixels");
            } else {
                essaimFd.tailleImageEnonceX = oef_tailleX;
                essaimFd.tailleImageEnonceY = oef_tailleY;
            }
            
            rucheSys.enonce.ajoutImageEssaim(essaimFd);
        }
    }
    
    li.appendChild(bouton);
    tab.appendChild(li);
    
//    Essaim.prototype.initEnonce.call(this); // appel de la fonction de base, pas besoin ici
}

//EssaimFlydraw.prototype.initEnonceVersAnalyse = function()
///*
// * Initialisation de la partie "analyse" de l'essaim
// * lorsqu'on clique sur le bouton "essaim" de l'énoncé
// * de façon générique, ajoute un bloc réponse dans l'onglet "Analyse"
// * peut aussi faire des tas d'autres choses dans les essaims dérivés
// * Pas de nécessité de surcharger ici
// */
//{
//    rucheSys.ajoutReponseEssaim(this); // appel de la fonction effectuée de base
//    ... suite spécifique ...
//}

//Essaim.prototype.initAnalyse = function()
///*
// * Initialisation de la partie "analyse" de l'essaim
// * Pas de nécessité de surcharger ici
// * On peut par exemple penser à ajouter des variables internes au QCM
// * que l'on pourrait utiliser ailleurs.
// */
//{
//
//}


EssaimFlydraw.prototype.creerBloc = function(dataRecup)
/*
 * Création d'un bloc Flydraw dans l'onglet préparation
 * parametre(s) :   - dataRecup : contient l'élément éventuel sauvegardé
 */
{
    Essaim.prototype.initBloc.call(this);
    
    // **** Titre du bloc ****
    
    var titreBloc = document.createElement("DIV");
    var txt = document.createTextNode("Dessin Flydraw ");
    titreBloc.appendChild(txt);
    var span_txtNom = document.createElement("SPAN");
//        span_txtNom.style.fontWeight="bold";
//        span_txtNom.style.border = "2px solid black";
    span_txtNom.style.backgroundColor = "#f7debc";
    span_txtNom.style.margin = "0px 0px 0px 10px";
    span_txtNom.style.padding = "0px 5px 0px 5px";
    span_txtNom.style.borderRadius = "5px";
    var txtNom = document.createTextNode(" "+this.nom+"\n");
    span_txtNom.appendChild(txtNom);
    titreBloc.appendChild(span_txtNom);
    titreBloc.style.textAlign="center";
    
    // **** Fabrication du contenu du bloc ****
    
    // Petit éditeur pour la taille en X
    var div_tailleX = document.createElement("DIV");
    div_tailleX.id = "tailleX" + this.nom;
    div_tailleX.className = "Rcl_Droppable";
    div_tailleX.style.display = "inline-block";
    div_tailleX.style.width="120px";
    div_tailleX.style.verticalAlign="middle";
    
    // Petit éditeur pour la taille en Y
    var div_tailleY = document.createElement("DIV");
    div_tailleY.id = "tailleY" + this.nom;
    div_tailleY.className = "Rcl_Droppable";
    div_tailleY.style.display = "inline-block";
    div_tailleY.style.width="120px";
    div_tailleY.style.verticalAlign="middle";
    
    // Editeur pour le contenu Flydraw
    var div_editFlydraw = document.createElement("DIV");
    div_editFlydraw.id = "editFlydraw" + this.nom;
    div_editFlydraw.className = "Rcl_Droppable";
    
    // *** Barre de tâches pour cet éditeur ***
    
      var barre_tache_editFlydraw = document.createElement("DIV");
    
    // Menu "composants" et bouton "composants"
    var bouton_composant_editFlydraw = document.createElement("button");
    bouton_composant_editFlydraw.id = "boutonComposantFD"+this.nom;
    bouton_composant_editFlydraw.innerHTML = "Composants";
    bouton_composant_editFlydraw.className = "Rcl_Editor_Button_Composant";
    bouton_composant_editFlydraw.onclick=function(){
        var nom = "editFlydraw"+this.id.slice("boutonComposantFD".length,this.id.length);  // id du div contenant l'editeur correspondant
        // retrouve l'essaim
        var nomEssaim = this.id.slice("boutonComposantFD".length,this.id.length);
        var ind = rucheSys.rechercheIndice(nomEssaim,rucheSys.listeBlocPrepa);
        var essaim = rucheSys.listeBlocPrepa[ind];
        // on sait que dans cette classe, le premier menu (num. 1) correspond par convention au bouton composant qui vient d'être cliqué.
        essaim.menuDeroulShow(essaim.menuDeroulIdFind(1),this.id)
    }
    barre_tache_editFlydraw.appendChild(bouton_composant_editFlydraw);

    
    var para_txt_tailleX = document.createElement("P");
    var txt_tailleX = document.createTextNode("\r\nLargeur du dessin (en pixels) :");
    para_txt_tailleX.appendChild(txt_tailleX);
    var txt_tailleY = document.createTextNode("\r\nHauteur du dessin (en pixels) :");
    var txt_editFlydraw = document.createTextNode("\r\nSuite de commandes Flydraw :");
    
    var div_justif = document.createElement("DIV");
    var div_justif1 = document.createElement("DIV");
    

    this.divBloc.appendChild(titreBloc);
    this.divBloc.appendChild(para_txt_tailleX);
    this.divBloc.appendChild(div_tailleX);
    this.divBloc.appendChild(div_justif);
    this.divBloc.appendChild(txt_tailleY);
    this.divBloc.appendChild(div_tailleY);
    this.divBloc.appendChild(div_justif1);
    this.divBloc.appendChild(txt_editFlydraw);
    this.divBloc.appendChild(barre_tache_editFlydraw);
    this.divBloc.appendChild(div_editFlydraw);
    
    // fabrication du menu "composants" et lien avec ce bouton
    var idMenuComposant = this.menuDeroulInit(bouton_composant_editFlydraw.id);
    this.idMenusDeroulants.push(idMenuComposant);
    
    
    // Fabrication des éditeurs
    var editeurTailleX = new Editeur(div_tailleX.id,rucheSys,true);
    var editeurTailleY = new Editeur(div_tailleY.id,rucheSys,true);
    var editeurEditFlydraw = new Editeur(div_editFlydraw.id,rucheSys,true);

    rucheSys.listeEditeur.push(editeurTailleX);
    rucheSys.listeEditeur.push(editeurTailleY);
    rucheSys.listeEditeur.push(editeurEditFlydraw);

    EssaimFlydraw.prototype.initEnonce.call(this);
    
    EssaimFlydraw.prototype.initAnalyse.call(this);

}

EssaimFlydraw.prototype.aideMenuInit = function(zNodes,elementsAide)
/*
 * Construction de la liste (menu) des éléments d'aide.
 * Utilisation du plugin jquery zTree : http://www.ztree.me/
 * parametre(s) :       - zNodes : liste des noeuds cliquables (objet JSON).
 *                                      leur id doivent être dans l'ordre 1,2,..N
 *                      - elementsAide : tableau des chaines (html) contenant les aides.
 *                                      l'ordre est le même que les noeuds zNodes
 *                                      (l'id du noeud est l'indice de l'aide dans le tableau
 */
{
    // Si pas de liste en entrée, fabrique une liste de test
    if (typeof zNodes =='undefined')
    {
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
    }
    if (typeof elementsAide=='undefined')
    {
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
                             "<div class=\"Rcl_Help_Title\">copy x,y,x1,y1,x2,y2,[filename]</div><div class=\"Rcl_Help_Body\">Insère le rectangle de diagonale (x1 ; y1) et (x2 ; y2) (dans le repère en pixels) du fichier filename au point (x ; y) : l’extrémité en haut à gauche de l’image est au point (x; y). Si x1 = y1 = x2 = y2 = -1, tout le fichier est copié. [filename] est l’adresse du fichier à partir du répertoire wims/public_html/gifs ou du répertoire indiqué dans common_images pour les modules OEF.</div>",
                             "<div class=\"Rcl_Help_Title\">copyresized x1,y1,x2,y2,dx1,dy1,dx2,dy2,[filename]</div><div class=\"Rcl_Help_Body\">Insère le rectangle de diagonale (x1 ; y1) et (x2 ; y2) du fichier filename dans le rectangle de diagonale (dx1 ; dy1) et (dx2 ; dy2) (remise à la taille réalisée). si x1 = y1 = x2 = y2 = -1, tout le fichier filename est copié</div>",
                             "<div class=\"Rcl_Help_Title\">affine a,b,c,d,tx,ty</div><div class=\"Rcl_Help_Body\">Applique la transformation affine (x ;y) -> [a,b ;c,d](x ;y)+(tx ;ty) aux objets définis ultérieurement.</div>",
                             "<div class=\"Rcl_Help_Title\">rotation d</div><div class=\"Rcl_Help_Body\">Rotation des objets définis ultérieurement de d degrés dans le sens inverse des aiguilles d’une montre, de centre (0 ;0)</div>"
        ];
    }
    
    Essaim.prototype.aideMenuInit.call(this,zNodes,elementsAide);
}

EssaimFlydraw.prototype.menuDeroulInit = function(elemId, zNodes, classesItems)
/*
 * Initialisation du menu déroulant. Il peut y en avoir plusieurs.
 * Utilisation du plugin jquery zTree : http://www.ztree.me/
 * parametre(s) :       - elemId : id de l'élément en dessous duquel on met le menu.
 *                      - zNodes : liste des noeuds cliquables (objet JSON).
 *                                      leur id doivent être dans l'ordre 1,2,..N
 *                      - classesComp : tableau des classes de composants
 */
{
    // Si pas de liste en entrée, la fabrique
    if (typeof zNodes =='undefined')
    {
        var zNodes = [
                      { idAction:0, id:1, pId:0, name:"Coomposants de dessin", open: true},
                      { idAction:1, id:2, pId:1, name:"Grille"},
                      { idAction:2, id:3, pId:1, name:"Repère"},
                      { idAction:3, id:4, pId:1, name:"Inclusion d'image"}
                      ];
    }
    if (typeof classesItems =='undefined')
    {
        // Tableau des classes de composants (constructeurs). Ils sont pointés
        // par l'identificateur "idAction" dans le tableau zNodes des noeuds
        // du menu déroulant en cours de fabrication.
        // Les composants qui ne sont pas encore définis ont une classe virtuelle
        var classesItems = [
                           null,
                           Composant,
                           Composant,
                           CoInclusionImage
                           ];
    }
    
    return Essaim.prototype.menuDeroulInit.call(this,elemId,zNodes,classesItems);
}

EssaimFlydraw.prototype.nouveauComposant = function(classeComposant)
/*
 * construit un nouveau composant de classe "classeComposant"
 * correspondant à cet essaim
 */
{
    // le nom de l'éditeur est le nom du div qui le contient,
    // pour cet essaim-ci, on a décidé que c'était "editFlydraw"+nom de l'essaim
    
    // va s'enregistrer dans l'objet système rucheSys
    rucheSys.ajoutComposantEssaim("editFlydraw"+this.nom, classeComposant);
}


//EssaimFlydraw.prototype.chargeEtat = function(elem)
///*
// * Chargement de l'état de l'objet depuis les variables de l'objet JSON elem
// * parametre(s) :    - elem : objet JSON
// * Pas de surcharge ici
// */
//{
//}


//EssaimFlydraw.prototype.creerBlocReponse = function(dataRecup)
///*
// * Création d'un bloc réponse dans l'onglet analyse
// * géré par cet essaim.
// * Pas de surcharge ici, cet essaim ne gère pas de réponse
// */
//{
//
//}

//EssaimFlydraw.prototype.sauveEtatInterfaceReponse = function()
///*
// * Sauvegarde l'état de l'interface du bloc réponse dans les variables internes
// * de l'essaim. Sert juste avant la sauvegarde, permet de rétablir l'état au rechargement
// * Pas de surcharge ici, cet essaim ne gère pas de réponse
// */
//{
//
//}


//EssaimFlydraw.prototype.chargeEtatInterfaceReponse = function(elem)
///*
// * Chargement de l'état de l'interface du bloc réponse depuis les variables de l'objet JSON elem
// * parametre(s) :    - elem : objet JSON
// * Pas de surcharge ici, cet essaim ne gère pas de réponse
// */
//{
//
//}


//EssaimFlydraw.prototype.sauveEtatInterface = function()
///*
// * Sauvegarde l'état de l'interface du bloc (boutons...) dans les variables internes
// * de l'essaim. Sert juste avant la sauvegarde, permet de rétablir l'état au rechargement
// */
//{
//    // fonction inutile pour le bloc dessin Flydraw
//}


EssaimFlydraw.prototype.detruitBloc = function()
/*
 * Destruction du bloc et de toutes les dépendances (boutons, réponses, editeurs...)
 */
{
    // Détruit le bloc, la réponse éventuelle associée et les images correspondantes
    Essaim.prototype.detruitBloc.call(this);

    // Détruit le contenu du bloc qui n'a pas été détruit (les éditeurs).
    var indice1 = rucheSys.rechercheIndice("tailleX"+this.nom,rucheSys.listeEditeur);
    var indice2 = rucheSys.rechercheIndice("tailleY"+this.nom,rucheSys.listeEditeur);
    var indice3 = rucheSys.rechercheIndice("editFlydraw"+this.nom,rucheSys.listeEditeur);
    rucheSys.listeEditeur.splice(indice1,1);
    rucheSys.listeEditeur.splice(indice2,1);
    rucheSys.listeEditeur.splice(indice3,1);
}


EssaimFlydraw.prototype.toOEF = function()
/*
 * Fonction qui permet de générer le code OEF du bloc
 * retourne une chaine de caractère contenant le code OEF.
 */
{
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
    var codePrepFD = "\\text{dessin"+this.nom+" = draw("+oef_tailleX+", ";
    codePrepFD += oef_tailleY+"\n";
    codePrepFD += oef_editFlydraw+")\n}\n";
    
    return codePrepFD;

}


EssaimFlydraw.prototype.toOEFFromStatement = function(idReponse)
/*
 * Fonction qui permet de générer le code OEF correspondant
 * à l'action de l'essaim dans le statement
 * retourne une chaine de caractère contenant le code OEF.
 * fonction générique.
 */
{
    
    // Construit le numero correspondant à la réponse gérée par l'essaim
    var numeroReponse = $("#RidAnBlocRep_"+idReponse).index()+1;
    
    // Construit le code OEF
    var codePrepFD = "<img src=\"\\dessin"+this.nom+"\"/>";
    
    return codePrepFD;
}


//EssaimFlydraw.prototype.toOEFFromAnswer = function()
///*
// * Fonction qui permet de générer le code OEF correspondant
// * à la réponse gérée par le QCM dans l'analyse
// * retourne une chaine de caractères contenant le code OEF.
// * Une image flydraw ne renvoie pas de code "réponse"
// */
//{
//    
//}

/*
 * Déclaration du type d'essaim (enregistre la classe dans l'objet système Ruche)
 * au chargement du code. IMPORTANT : le code des classes dérivées
 * doit être chargé APRES le code de la classe "Essaim" de base.
 */

$(document).ready(function() {
    rucheSys.initClasseEssaim(EssaimFlydraw);
});
