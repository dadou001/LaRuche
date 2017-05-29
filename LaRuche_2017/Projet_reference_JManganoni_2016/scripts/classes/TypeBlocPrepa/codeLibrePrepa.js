/*
 * Classe Code Libre (Preparation) :
 * Permet de creer un bloc code libre dans l'onglet préparation
 */
function CodeLibrePrepa(numero)
{
	//--------- ATTRIBUTS ---------//


	this.nom = "codeLibre" + numero; // nom de l'élément
	//this.txt = ""; //
	this.proto = "CodeLibre"; // nature de l'élément
}

// Hérite (classe dérivée) de BlocProgramme
CodeLibrePrepa.prototype = Object.create(BlocProgramme.prototype);
CodeLibrePrepa.prototype.constructor = CodeLibrePrepa;
CodeLibrePrepa.prototype.proto = "CodeLibrePrepa"; // nature de la classe
// ATTENTION : DOIT ETRE LE MEME QUE this.proto CI—DESSUS

CodeLibrePrepa.prototype.contientAutresBlocs = true;

//--------- METHODES ----------//


CodeLibrePrepa.prototype.creerBloc = function()
/*
 * Fonction qui permet de crŽr un bloc dans l'onglet préparation
 * spécifique pour un élément de type code libre.
 */
{
    // Initialisation du bloc vide + entete
    BlocProgramme.prototype.initBloc.call(this);
    
    var bloc_pere = document.getElementById("Rid_Prep_Blocs");
    
    var posDrag = document.createAttribute("posdrag");
    posDrag.value=0;
    bloc_pere.setAttributeNode(posDrag);
    
    /* Modifications pour le drag and drop */
    //On gère l'envoi

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
        var temp=e.target.className;
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

    
    var barre_tache = document.createElement("DIV");
    barre_tache.className = "barre_tache_prepa"; // Pas encore utilisé
    var txt = document.createElement('div');
    
    txt.id = "RidPrBloc_Content_"+this.nom;
    txt.className = "Rcl_Droppable Rcl_Editor";
    txt.style.border = "1px grey solid";
    
    
    var button_latex = document.createElement("button");
    button_latex.id = "Rid_Editor_Button_Latex_"+this.nom;
    button_latex.innerHTML = "latex";
    button_latex.className = "Rcl_Editor_Button_Latex";
    button_latex.onclick=function()
    /*
     * fonction qui permet de définir du code latex depuis le bloc code libre
     *
     */
    {
        var nom = "RidPrBloc_Content_"+this.id.slice("Rid_Editor_Button_Latex_".length,this.id.length);
        rucheSys.etiqueterTexteEnLatex(nom);
    }

    txt_codeL = document.createTextNode("\r\nCode Libre");

    this.divBloc.appendChild(txt_codeL);
    /* Barre Var et Latex */
    barre_tache.appendChild(button_latex);
    this.divBloc.appendChild(barre_tache);
    
    this.divBloc.appendChild(txt);
    
    var editeurVar = new Editeur(txt.id, rucheSys, true); //true = Pas d'éditeur principal
    rucheSys.listeEditeur.push(editeurVar);	
}

CodeLibrePrepa.prototype.supprime = function(event)
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

CodeLibrePrepa.prototype.minimise = function(event)
/*
 * Minimisation du bloc programme
 * appelée par un click sur le bouton "minimisation"
 * doit être surchargée dans les objets dérivés
 */
{
    var liBloc = event.target.parentNode.parentNode.parentNode; //
    var nomInstruction = liBloc.id.slice("RidPrBloc_".length,liBloc.id.length);// On supprime le "RidPrBloc_" devant le nom du bloc
    
    var buttonWindow = event.target;
    var txt = document.getElementById("RidPrBloc_Content_"+nomInstruction);
    
    if (buttonWindow.className == "Rcl_Button_Minimize")
    {
        buttonWindow.className = "Rcl_Button_Maximize";
        buttonWindow.parentNode.parentNode.className = "Rcl_Closed";
        txt.className += " Rcl_Mini_Editor_hidden";
    }
    else
    {
        buttonWindow.className = "Rcl_Button_Minimize";
        buttonWindow.parentNode.parentNode.className = "Rcl_Bloc_Interne";
        txt.className = txt.className.replace(" Rcl_Mini_Editor_hidden","");
        
    };
}


CodeLibrePrepa.prototype.deplaceHaut = function(event)
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

CodeLibrePrepa.prototype.deplaceBas = function(event)
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

CodeLibrePrepa.prototype.reduireBloc = function()
{
    console.log(this.nom);
    if(document.getElementById("Rid_Button_MiniMaxi_"+this.nom).className=="Rcl_Button_Minimize")
    {
        document.getElementById("RidPrBloc_"+this.nom).className="Rcl_Closed";
        document.getElementById("Rid_Button_MiniMaxi_"+this.nom).className="Rcl_Button_Maximize";
        document.getElementById("RidPrBloc_Content_"+this.nom).className+= " Rcl_Mini_Editor_hidden";
    }
}

//---------------------------------//

CodeLibrePrepa.prototype.agrandirBloc =function()
{
    if(document.getElementById("Rid_Button_MiniMaxi_"+this.nom).className=="Rcl_Button_Maximize")
        {
            document.getElementById("Rid_Button_MiniMaxi_"+this.nom).className= "Rcl_Button_Minimize";
            document.getElementById("RidPrBloc_"+this.nom).className= "Rcl_Bloc";
            document.getElementById("RidPrBloc_Content_"+this.nom).className = document.getElementById("RidPrBloc_Content_"+this.nom).className.replace(" Rcl_Mini_Editor_hidden","");
        }
}

//---------------------------------//


CodeLibrePrepa.prototype.toOEF = function()
/*
 * Fonction qui permet de générer le code OEF obtenu grace au bloc " code libre "
 * retourne une chaine de caractère contenant le code OEF.
 */
{	
    indice = rucheSys.rechercheIndice("RidPrBloc_Content_"+this.nom,rucheSys.listeEditeur);
    rucheSys.listeEditeur[indice].recupDonneesVar();		
    return rucheSys.listeEditeur[indice].toOEF()+"\n";
}	

