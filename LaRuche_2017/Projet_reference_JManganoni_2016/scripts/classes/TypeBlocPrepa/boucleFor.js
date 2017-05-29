/*
 * Classe Boucle for :
 * Permet de créer un bloc d'instruction de type "boucle for".
*/

function BoucleFor(numero)
{	
	//--------- ATTRIBUTS ---------//

    
	this.nom = "for" + numero; // nom de l'élément
	this.proto = "BoucleFor"; // nature de la classe
    
    
    /* On prépare pour le bloc dans bloc */
    
    this.blocContenu = []; // liste des blocs contenus
    this.hidden = false; // dit si le bloc doit être caché ou non
    this.blocLie=null; //Si il y a un bloc dans le bloc inséré dans le champs instructions
    this.div_forDebut = null;
    this.div_forFin = null;
    this.div_forInstruction = null;
    this.numeroBloc = numero;
}

// Hérite (classe dérivée) de BlocProgramme
BoucleFor.prototype = Object.create(BlocProgramme.prototype);
BoucleFor.prototype.constructor = BoucleFor;
BoucleFor.prototype.proto = "BoucleFor"; // nature de la classe
    // ATTENTION : DOIT ETRE LE MEME QUE this.proto CI—DESSUS

BoucleFor.prototype.contientAutresBlocs = true;
    

	//--------- METHODES ----------//
    
BoucleFor.prototype.creerBloc = function()
/*
 * Fonction qui permet de créer un bloc dans l'onglet préparation
 * spécifique pour une instruction de type "boucle for".
 */
{
    console.log("Entrée dans creerBloc (spec)");
    
    // Initialisation du bloc vide + entete
    BlocProgramme.prototype.initBloc.call(this);
  
    // Récupération des blocs et créations des nouveaux
    
    var bloc_pere = document.getElementById(this.idParent);
//    var liste = document.createElement("LI");
//    liste.id = "RidPrBloc_"+this.nom;
//    var div_fils = document.createElement("DIV");
    var div_blocDansBloc = document.createElement("DIV");
    var div_appartenanceBloc = document.createElement("DIV");
    var div_blocPossede = document.createElement("DIV");
    var div_zoneDropBdb = document.createElement("DIV");
    var posDrag = document.createAttribute("posdrag");
    
    
    posDrag.value=0;
    bloc_pere.setAttributeNode(posDrag);
    
    /* Partie concernant le bloc dans bloc */
    
    div_zoneDropBdb.addEventListener('drop',function(e) { // ce drop concerne uniquement la zone [integrer bloc dans bloc]
            
            
            console.log("Bloc dans bloc activé. IdBlocInseré pour BDB = "+this.id);
            
            // On récupère l'id du bloc inclut
            
            idDIVBlocPose=e.dataTransfer.getData('text/plain');
            console.log("Données recu : "+idDIVBlocPose);
        
            console.info("BLOC CONTENANT = "+this.blocContenu);
            
                var nomBlocPose=idDIVBlocPose.replace("RidPrBloc_",""); // On garde juste le numéro du bloc si c'est un bloc for
                var indicePose = rucheSys.rechercheIndBlocPrepa(nomBlocPose);//On va rechercher à quel indice se trouve le bloc posé dans la liste bloc prépa pour obtenir l'objet correspondant.
            
            //on recupère le bloc hôte
            var nomDIVBlocHote = this.id.replace("zoneDrop_RidPrBloc_","");
            var indiceHote=rucheSys.rechercheIndBlocPrepa(this.id.replace("zoneDrop_RidPrBloc_",""));
            console.log(indiceHote);
            if(indiceHote==-1)
                {
                    
                    var blocHote2= $('[nom*=nomDIVBlocHote]').get(0);
                    
                    console.info("Bloc hote = "+blocHote2);
                    var j=0;
                        while(j<rucheSys.listeBlocPrepa.length &&blocHote==null)
                        {
                            
                            var blocHote=BlocProgramme.rechercheRecurBloc(nomDIVBlocHote,rucheSys.listeBlocPrepa[j]);// on lui donne le nom du bloc hote et le bloc à analyser
                            console.log("passage dans la boucle "+j+"blocHote = "+blocHote);
                            j++;
                            
                        }
                    
                    
                }
        else
            {
        
            var blocHote=rucheSys.listeBlocPrepa[indiceHote];
            
            var blocPose=rucheSys.listeBlocPrepa[indicePose];
            }
            
                        
            //console.log("Bloc recupéré "+blocPose.nom);
            var blocPose=rucheSys.listeBlocPrepa[indicePose];
            var idBlocPose="RidPrBloc_"+blocPose.nom;
            var idBlocHote="RidPrBloc_"+blocHote.nom;
        
        if(idBlocHote==idBlocPose)
            {
                console.error("ERREUR : Le bloc est le même. Annulation de l'opération");
                return;
            }
            //HTMLBlocPose = DIVBlocPose.innerHTML.replace(/<button.*<\/button>/,"");
            
            console.log("IDBLOCHOTE = "+idBlocHote);
            var test =document.getElementById(idBlocHote).innerHTML; 
            console.log("Test de recup de code = "+test);
            $('#indicAppartenance'+blocHote.nom).append($('#'+idBlocPose));
        
             blocHote.blocContenu.push(blocPose);
            rucheSys.listeBlocPrepa.splice(indicePose,1);
    });
    /* Fin de la partie concernant le bloc dans bloc */
    
    
    
    
    /* Modifications pour le drag and drop */
    //On gère l'envoi
//    liste.draggable = true;
    
    this.liBloc.addEventListener('dragstart', function(e) {
                           if(bloc_pere.getAttribute("posdrag")==0){
                           bloc_pere.setAttribute("posdrag",""+e.clientY);
                           }
                           e.dataTransfer.setData('text/plain', this.id);
                           //e.dataTransfer.setDragImage(dragImg, 40, 40); // Une position de 40x40 pixels centrera l'image (de 80x80 pixels) sous le curseur
                           
                           });
    
    // On gère le changement d'apparence entre les deux fonctions.
    
    this.liBloc.addEventListener('dragleave', function(e) {
                           //Lorsqu'on sort d'une zone de drop.
                           this.style.borderBottom="";
                           this.style.borderTop="";
                           console.log('Sortie de zone');
                           });
    
    //On gère la réception
    this.liBloc.addEventListener('dragover', function(e) {
                           e.preventDefault(); // Annule l'interdiction de drop
                           if(e!=this)
                           {
                           console.log("start : "+bloc_pere.getAttribute("posdrag"));
                           console.log("over : "+e.clientY);
                           if(bloc_pere.getAttribute("posdrag")<e.clientY)
                           {
                           this.style.borderBottom="2px dotted red";
                           }
                           else
                           {
                           this.style.borderTop="2px dotted red";
                           }
                           }
                           });
    
    this.liBloc.addEventListener('drop', function(e) {
                           /*Cette fonction sert à décrire ce qui se passera pour le bloc ciblé ce qui se passera lorsqu'on lachera un objet droppable sur lui */
                           
                           this.style.borderBottom="";
                           this.style.borderTop="";
                           if(bloc_pere.getAttribute("posdrag")!=""+0){
                           bloc_pere.setAttribute("posdrag",0);
                           }
                           
                           var nomZoneIn=" "; //on va récupérer l'id du bloc reçu.
                           nomZoneIn=e.dataTransfer.getData('text/plain'); // Affiche le contenu du type MIME « text/plain »
                           console.log('Données reçu : ' + nomZoneIn);
                           //Maintenant nous allons faire en sorte de changer de place le bloc si on passe sur le bloc avant ou après lui
                           
                           var id_drop = document.querySelector('#'+nomZoneIn);
                           //var li = buttonHaut.parentNode.parentNode;
                           
                           // On va gérer le précédent
                           var previous = id_drop.previousElementSibling;//l'élément précédent le bloc droppé
                           
                           var next = id_drop.nextElementSibling;//l'élément suivant le bloc droppé
                           
                           var lgNext= Essaim.prototype.trouverSuivant(id_drop,this); //Permet de donner à cb de cases se trouve le bloc ciblé wxc
                           var lgPrev=0;
                           
                           
                           
                           var lgPrev= Essaim.prototype.trouverPrecedent(id_drop,this);
                           //var actu= id_drop;
                           if(lgNext>0)
                           {
                           
                           
                           for (var i = 0; i < lgNext; i++) { //on fait faire au bloc droppé lgNext descentes vers le bas.
                           
                           if(next){
                           next = next.nextElementSibling;
                           
                           console.log('Un bloc suivant a été trouvé ! Changement...');
                           id_drop.parentNode.insertBefore(id_drop, next);
                           var nom = id_drop.id.slice("RidPrBloc_".length,id_drop.id.length);
                           
                           var ind = rucheSys.rechercheIndice(nom,rucheSys.listeBlocPrepa);
                           
                           var temp = rucheSys.listeBlocPrepa[ind];
                           rucheSys.listeBlocPrepa[ind] = rucheSys.listeBlocPrepa[ind+1];
                           rucheSys.listeBlocPrepa[ind+1] = temp;
                           
                           
                           }
                           else
                           {
                           console.log("Fin du next");
                           }
                           
                           //On change visuellement la place.
                           
                           }
                           }
                           
                           if (lgPrev) {
                           for(var j=0; j< lgPrev;j++)
                           {
                           if (previous) {
                           console.log('Un bloc precedent a été trouvé ! Changement...');
                           id_drop.parentNode.insertBefore(id_drop, previous);
                           var nom = id_drop.id.slice("RidPrBloc_".length,id_drop.id.length);
                           
                           var ind = rucheSys.rechercheIndice(nom,rucheSys.listeBlocPrepa);
                           
                           var temp = rucheSys.listeBlocPrepa[ind];
                           rucheSys.listeBlocPrepa[ind] = rucheSys.listeBlocPrepa[ind-1];
                           rucheSys.listeBlocPrepa[ind-1] = temp;
                           previous = id_drop.previousElementSibling;
                           }
                           else
                           {
                           console.log('Pas de précédent, désolé !');
                           }
                           }
                           }
                           
                           else
                           {
                           console.log('Ni suivant, ne précédent !***********************');
                           }
                           
                           });
    
    /* Fin des modifs */
    
    this.div_forDebut = document.createElement("DIV");
    this.div_forDebut.id = "forDebut" + this.nom;
    this.div_forDebut.className = "Rcl_Droppable Rcl_Mini_Editor";
    //div_forDebut.className = "Rcl_Mini_Editor";
    this.div_forFin = document.createElement("DIV");
    this.div_forFin.id = "forFin" + this.nom;
    this.div_forFin.className = "Rcl_Droppable Rcl_Mini_Editor";
    //div_forFin.className = "Rcl_Mini_Editor";
    this.div_forInstruction = document.createElement("DIV");
    this.div_forInstruction.id = "forInstruction" + this.nom;
    this.div_forInstruction.className = "Rcl_Droppable";
    var txt = document.createTextNode("Bloc FOR");
    
    
    var txt_debut = document.createTextNode("\r\nPour");
    var txt_fin = document.createTextNode("\r\njusqu'à");
    var txt_instruction = document.createTextNode("\r\nInstructions");
    var txt_Bloc = document.createTextNode("Glisser un bloc ci-dessous pour l'insérer");
    var txt_Appartenance = document.createTextNode("");
    var zoneDropBlocDansBloc = document.createTextNode("[Zone d'insertion de bloc]");
    
    //Ajout des éléments dans le div
    
    this.divBloc.appendChild(txt_debut);
    this.divBloc.appendChild(this.div_forDebut);
    this.divBloc.appendChild(txt_fin);
    this.divBloc.appendChild(this.div_forFin);
    
    this.divBloc.appendChild(txt_instruction);
    div_appartenanceBloc.appendChild(txt_Appartenance);
    div_blocPossede.appendChild(txt_Appartenance);
    div_zoneDropBdb.appendChild(zoneDropBlocDansBloc);
    this.divBloc.appendChild(this.div_forInstruction);
    
    
//    liste.className = "Rcl_Bloc";
//    this.divBloc.className = "Rcl_Bloc_Interne";
    div_blocDansBloc.className = "Rcl_Bloc_Interne";
    div_appartenanceBloc.className = "Rcl_Bloc_Interne_appartenance";
    div_appartenanceBloc.id = "indicAppartenance"+this.nom;
    div_blocPossede.className = "Rcl_Bloc_Interne_estDansBloc";
    div_blocPossede.id = "dansBloc_"+this.liBloc.id;
    div_zoneDropBdb.id = "zoneDrop_"+this.liBloc.id;
    div_zoneDropBdb.className = "zoneDrop";
    div_zoneDropBdb.draggable = true;
    
    
    this.liBloc.appendChild(div_blocPossede);
    this.liBloc.appendChild(div_appartenanceBloc);
    this.liBloc.appendChild(div_zoneDropBdb); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! A SUPPRIMER/COMMENTER POUR ENLEVER LES ZONES SENSIBLES !!!!!!!!!!!!!!!!!
    // METTRE bloc_pere.appendChild(liste); ,
    //Création et ajout des éditeurs dans la liste des éditeurs
    var editeurDebut = new Editeur(this.div_forDebut.id,rucheSys,true);
    var editeurFin = new Editeur(this.div_forFin.id,rucheSys,true);
    var editeurInstruction = new Editeur(this.div_forInstruction.id,rucheSys,true);
    
    rucheSys.listeEditeur.push(editeurDebut);
    rucheSys.listeEditeur.push(editeurFin);
    rucheSys.listeEditeur.push(editeurInstruction);
}

BoucleFor.prototype.supprime = function(event)
/*
 * Méthode de suppresion du bloc programme
 * appelée par un click sur le bouton de suppression
 * doit être surchargée dans les objets dérivés
 */
{
    var liBloc = event.target.parentNode.parentNode.parentNode; //
    var nomInstruction = liBloc.id.slice("RidPrBloc_".length,liBloc.id.length);// On supprime le "RidPrBloc_" devant le nom du bloc
    rucheSys.supprInstruction(nomInstruction,rucheSys.listeBlocPrepa);
}

BoucleFor.prototype.minimise = function(event)
/*
 * Minimisation du bloc programme
 * appelée par un click sur le bouton "minimisation"
 * doit être surchargée dans les objets dérivés
 */
{
    var liBloc = event.target.parentNode.parentNode.parentNode; //
    var nomInstruction = liBloc.id.slice("RidPrBloc_".length,liBloc.id.length);// On supprime le "RidPrBloc_" devant le nom du bloc

    var buttonWindow = event.target;
    var div_forDebut = document.getElementById("forDebut"+nomInstruction);
    var div_forFin = document.getElementById("forFin"+nomInstruction);
    var div_forInstruction = document.getElementById("forInstruction"+nomInstruction);
    
    if (buttonWindow.className == "Rcl_Button_Minimize")
    {
        buttonWindow.className = "";
        buttonWindow.className = "Rcl_Button_Maximize";
        buttonWindow.parentNode.parentNode.className = "Rcl_Closed";
        div_forDebut.className += " Rcl_Mini_Editor_hidden";
        div_forFin.className += " Rcl_Mini_Editor_hidden";
        div_forInstruction.className += " Rcl_Mini_Editor_hidden";
        
        
    }
    else
    {
        buttonWindow.className = "";
        buttonWindow.className = "Rcl_Button_Minimize";
        buttonWindow.parentNode.parentNode.className = "";
        buttonWindow.parentNode.parentNode.className = "Rcl_Bloc_Interne";
        div_forDebut.className = div_forDebut.className.replace(" Rcl_Mini_Editor_hidden","");
        div_forFin.className = div_forFin.className.replace(" Rcl_Mini_Editor_hidden","");
        div_forInstruction.className = div_forInstruction.className.replace(" Rcl_Mini_Editor_hidden","");
        
    };
}


BoucleFor.prototype.deplaceHaut = function(event)
/*
 * Déplacement du bloc programme vers le haut
 * appelée par un click sur le bouton "haut"
 * doit être surchargée dans les objets dérivés
 */
{
    var buttonHaut = event.target;
    var li = buttonHaut.parentNode.parentNode.parentNode;
    var previous = li.previousElementSibling;
    if (previous) {
        li.parentNode.insertBefore(li, previous);
        var nom = li.id.slice("RidPrBloc_".length,li.id.length);
        var ind = rucheSys.rechercheIndice(nom,rucheSys.listeBlocPrepa);
        var temp = rucheSys.listeBlocPrepa[ind];
        rucheSys.listeBlocPrepa[ind] = rucheSys.listeBlocPrepa[ind-1];
        rucheSys.listeBlocPrepa[ind-1] = temp;
    }
    // Mise à jour du pointeur vers le LI
    // TODO : En vérifier la nécessité
    this.liBloc = li;
}

BoucleFor.prototype.deplaceBas = function(event)
/*
 * Déplacement du bloc programme vers le bas
 * appelée par un click sur le bouton "bas"
 * doit être surchargée dans les objets dérivés
 */
{
    var buttonBas = event.target;
    var li = buttonBas.parentNode.parentNode.parentNode;
    var next = li.nextElementSibling;
    if (next) {
        next = next.nextElementSibling;
        var nom = li.id.slice("RidPrBloc_".length,li.id.length);
        var ind = rucheSys.rechercheIndice(nom,rucheSys.listeBlocPrepa);
        var temp = rucheSys.listeBlocPrepa[ind];
        rucheSys.listeBlocPrepa[ind] = rucheSys.listeBlocPrepa[ind+1];
        rucheSys.listeBlocPrepa[ind+1] = temp;
    }
    li.parentNode.insertBefore(li, next);
    // Mise à jour du pointeur vers le LI
    // TODO : En vérifier la nécessité
    this.liBloc = li;
}


//---------------------------------//


BoucleFor.prototype.setblocLie = function(blocAbsorbe)
{
    this.blocLie = blocAbsorbe; 
}

BoucleFor.prototype.reduireBloc = function()
{
    console.log(this.nom);
    if(document.getElementById("Rid_Button_MiniMaxi_"+this.nom).className=="Rcl_Button_Minimize")
    {
        document.getElementById("RidPrBloc_"+this.nom).className="Rcl_Closed";
        document.getElementById("Rid_Button_MiniMaxi_"+this.nom).className="Rcl_Button_Maximize";
        document.getElementById("forDebut" + this.nom).className += " Rcl_Mini_Editor_hidden";
        document.getElementById("forFin" + this.nom).className += " Rcl_Mini_Editor_hidden";
        document.getElementById("forInstruction" + this.nom).className += " Rcl_Mini_Editor_hidden";
    }
}

BoucleFor.prototype.agrandirBloc = function()
{
    if(document.getElementById("Rid_Button_MiniMaxi_"+this.nom).className=="Rcl_Button_Maximize")
    {
        document.getElementById("Rid_Button_MiniMaxi_"+this.nom).className= "Rcl_Button_Minimize";
        document.getElementById("RidPrBloc_"+this.nom).className = "Rcl_Bloc";
        document.getElementById("forDebut" + this.nom).className=document.getElementById("forDebut" + this.nom).className.replace(" Rcl_Mini_Editor_hidden","");
        document.getElementById("forFin" + this.nom).className=document.getElementById("forFin" + this.nom).className.replace(" Rcl_Mini_Editor_hidden","");
        document.getElementById("forInstruction" + this.nom).className=document.getElementById("forInstruction" + this.nom).className.replace(" Rcl_Mini_Editor_hidden","");
    }
}

//---------------------------------//


BoucleFor.prototype.toOEF = function()
/*
 * Fonction qui permet de générer le code OEF de l'instruction "for"
 * retourne une chaine de caractère contenant le code OEF.
 * 
 */
{

    var indice1 = rucheSys.rechercheIndice("forDebut"+this.nom,rucheSys.listeEditeur);
    var indice2 = rucheSys.rechercheIndice("forFin"+this.nom,rucheSys.listeEditeur);
    var indice3 = rucheSys.rechercheIndice("forInstruction"+this.nom,rucheSys.listeEditeur);
    rucheSys.listeEditeur[indice1].recupDonneesVar();
    rucheSys.listeEditeur[indice2].recupDonneesVar();
    rucheSys.listeEditeur[indice3].recupDonneesVar();

    var br = /<div><br><\/div>/;

    // Retrait du <br> de fin de ligne
    if (br.test(rucheSys.listeEditeur[indice1].enonce_Html) == false)
    {
        rucheSys.listeEditeur[indice1].enonce_Html = rucheSys.listeEditeur[indice1].enonce_Html.slice(0, rucheSys.listeEditeur[indice1].enonce_Html.length-6);
    };
    if (br.test(rucheSys.listeEditeur[indice2].enonce_Html) == false) {
        rucheSys.listeEditeur[indice2].enonce_Html = rucheSys.listeEditeur[indice2].enonce_Html.slice(0, rucheSys.listeEditeur[indice2].enonce_Html.length-6);
    };
    if (br.test(rucheSys.listeEditeur[indice3].enonce_Html) == false) {
        rucheSys.listeEditeur[indice3].enonce_Html = rucheSys.listeEditeur[indice3].enonce_Html.slice(0, rucheSys.listeEditeur[indice3].enonce_Html.length-6);
    };
    
    console.log("FONCTION TO OEF : VALEUR DE BDB = "+this.blocLie);
    if(this.blocContenu.length){ // si il y a un bloc inclus on ajoute son toOEF au tout.
        console.log("1er if de OEF");
        var chaineFinale="";//La chaine qui contiendra le résultat de la fonction toOEF() de tous les enfants. 
        for(var i=0;i<this.blocContenu.length;i++)
            {
                chaineFinale=chaineFinale+this.blocContenu[i].toOEF();
                console.log("chaine finale rotation"+i+" = "+chaineFinale);
            };
        //console.log("chaine Finale ="+chaineFinale);
        return "\\for{"+rucheSys.listeEditeur[indice1].toOEF()+" to "+rucheSys.listeEditeur[indice2].toOEF()+"}\n 	{ 1erif "+rucheSys.listeEditeur[indice3].toOEF()+chaineFinale+"}\n";
    }
    else {
            console.log("2er if de OEF");
              return "\\for{"+rucheSys.listeEditeur[indice1].toOEF()+" to "+rucheSys.listeEditeur[indice2].toOEF()+"2eme if}\n 	{"+rucheSys.listeEditeur[indice3].toOEF()+"}\n";
    }
    
}


    
// On va rechercher l'objet bloc auquel appartient l'éditeur
// On va intégrer le nom du bloc posé sur le bloc qu'on viens de récupérer
// blocCible.div_fils.appendChild(nomBlocIntegre);

// On va maintenant afficher dans le bloc qu'on viens d'insérer un champs tete spécifiant qu'il a été intégré dans un autre bloc

// Et enfin, intégrer l'encapsulation au sein même du code. 
    

BoucleFor.prototype.setIndicAppartenance = function(txtAMaj)
/* Cette fonction permet d'écrire un nouveau texte indicatif pour montrer quand un bloc for est intégré dans un autre bloc.
INPUT :
- txtAMaj : le texte qu'on veux insérer dans la fonction.
*/
{
    txtAMaj=document.getElementById("indicAppartenance"+this.nom);
}





