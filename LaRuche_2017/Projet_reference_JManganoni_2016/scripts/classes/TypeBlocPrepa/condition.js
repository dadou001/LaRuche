/*
 * Classe Condition :
 * Permet de créer un bloc d'instruction de type "condition if".
*/

function Condition(numero)
{
	//--------- ATTRIBUTS ---------//


	this.nom = "condition" + numero; // nom de l'élément
	this.proto = "Condition";	// nature de l'élément
    
}

// Hérite (classe dérivée) de BlocProgramme
Condition.prototype = Object.create(BlocProgramme.prototype);
Condition.prototype.constructor = Condition;
Condition.prototype.proto = "Condition"; // nature de la classe
// ATTENTION : DOIT ETRE LE MEME QUE this.proto CI—DESSUS

Condition.prototype.contientAutresBlocs = true;

//--------- METHODES ---------//

Condition.prototype.creerBloc = function()
/*
 * Fonction qui permet de créer un bloc dans l'onglet préparation
 * spécifique pour une instruction de type "condition if".
 */
{
    // Initialisation du bloc vide + entete
    BlocProgramme.prototype.initBloc.call(this);
    
    // Récupération des blocs et créations des nouveaux
    var bloc_pere = document.getElementById("Rid_Prep_Blocs");
    var div_blocDansBloc = document.createElement("DIV");
    var div_zoneDropBdb = document.createElement("DIV");
    var div_zoneDropBdb = document.createElement("DIV");
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
    
    var div_condition = document.createElement("DIV");
    div_condition.id = "cond" + this.nom;
    div_condition.className = "Rcl_Droppable Rcl_Mini_Editor";
    //div_condition.className += "Rcl_Mini_Editor";
    var div_conditionTrue = document.createElement("DIV");
    div_conditionTrue.id = "condT" + this.nom;
    div_conditionTrue.className = "Rcl_Droppable";
    var div_conditionFalse = document.createElement("DIV");
    div_conditionFalse.id = "condF" + this.nom;
    div_conditionFalse.className = "Rcl_Droppable";
    var txt = document.createTextNode("Bloc IF");
    var zoneDropBlocDansBloc = document.createTextNode("[Zone d'insertion de bloc]");
    div_zoneDropBdb.id = "zoneDrop_"+this.liBloc.id;
    div_zoneDropBdb.className = "zoneDrop";
    div_zoneDropBdb.draggable = true;

    
    txt_cond = document.createTextNode("\r\nSi");
    txt_condT = document.createTextNode("\r\nalors");
    txt_condF = document.createTextNode("\r\nsinon");

    //Ajout des éléments dans le div
    this.divBloc.appendChild(txt_cond);
    this.divBloc.appendChild(div_condition);
    this.divBloc.appendChild(txt_condT);
    this.divBloc.appendChild(div_conditionTrue);
    this.divBloc.appendChild(txt_condF);
    this.divBloc.appendChild(div_conditionFalse);
    div_zoneDropBdb.appendChild(zoneDropBlocDansBloc);
    this.liBloc.appendChild(div_zoneDropBdb);
    

    //Création et ajout des éditeurs dans la liste des éditeurs
    var editeurCond = new Editeur(div_condition.id,rucheSys,true);
    var editeurCondT = new Editeur(div_conditionTrue.id,rucheSys,true);
    var editeurCondF = new Editeur(div_conditionFalse.id,rucheSys,true);

    rucheSys.listeEditeur.push(editeurCond);
    rucheSys.listeEditeur.push(editeurCondT);
    rucheSys.listeEditeur.push(editeurCondF);
}

Condition.prototype.supprime = function(event)
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

Condition.prototype.minimise = function(event)
/*
 * Minimisation du bloc programme
 * appelée par un click sur le bouton "minimisation"
 * doit être surchargée dans les objets dérivés
 */
{
    var liBloc = event.target.parentNode.parentNode.parentNode; //
    var nomInstruction = liBloc.id.slice("RidPrBloc_".length,liBloc.id.length);// On supprime le "RidPrBloc_" devant le nom du bloc
    
    var buttonWindow = event.target;
    var div_condition = document.getElementById("cond"+nomInstruction);
    var div_conditionTrue = document.getElementById("condT"+nomInstruction);
    var div_conditionFalse = document.getElementById("condF"+nomInstruction);
    
    if (buttonWindow.className == "Rcl_Button_Minimize")
    {
        buttonWindow.className = "";
        buttonWindow.className = "Rcl_Button_Maximize";
        buttonWindow.parentNode.parentNode.className = "Rcl_Closed";
        div_condition.className += " Rcl_Mini_Editor_hidden";
        div_conditionTrue.className += " Rcl_Mini_Editor_hidden";
        div_conditionFalse.className += " Rcl_Mini_Editor_hidden";
        
        
    }
    else
    {
        buttonWindow.className = "";
        buttonWindow.className = "Rcl_Button_Minimize";
        buttonWindow.parentNode.parentNode.className = "";
        buttonWindow.parentNode.parentNode.className = "Rcl_Bloc_Interne";
        div_condition.className = div_condition.className.replace(" Rcl_Mini_Editor_hidden","");
        div_conditionTrue.className = div_conditionTrue.className.replace(" Rcl_Mini_Editor_hidden","");
        div_conditionFalse.className = div_conditionFalse.className.replace(" Rcl_Mini_Editor_hidden","");
        
    };
}


Condition.prototype.deplaceHaut = function(event)
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

Condition.prototype.deplaceBas = function(event)
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

Condition.prototype.reduireBloc = function()
{
    console.log(this.nom);
    if(document.getElementById("Rid_Button_MiniMaxi_"+this.nom).className=="Rcl_Button_Minimize")
    {
        document.getElementById("RidPrBloc_"+this.nom).className="Rcl_Closed";
        document.getElementById("Rid_Button_MiniMaxi_"+this.nom).className="Rcl_Button_Maximize";
        document.getElementById("cond" + this.nom).className+= " Rcl_Mini_Editor_hidden";
        document.getElementById("condT" + this.nom).className+= " Rcl_Mini_Editor_hidden";
        document.getElementById("condF" + this.nom).className+= " Rcl_Mini_Editor_hidden";
    }
}

//---------------------------------//

Condition.prototype.agrandirBloc = function()
{
    if(document.getElementById("Rid_Button_MiniMaxi_"+this.nom).className=="Rcl_Button_Maximize")
        {
            document.getElementById("RidPrBloc_"+this.nom).className="Rcl_Bloc";
            document.getElementById("Rid_Button_MiniMaxi_"+this.nom).className="Rcl_Button_Minimize";
            document.getElementById("cond" + this.nom).className=document.getElementById("cond" + this.nom).className.replace(" Rcl_Mini_Editor_hidden","");
            document.getElementById("condT" + this.nom).className=document.getElementById("condT" + this.nom).className.replace(" Rcl_Mini_Editor_hidden","").replace(" Rcl_Mini_Editor","");
            document.getElementById("condF" + this.nom).className=document.getElementById("condF" + this.nom).className.replace(" Rcl_Mini_Editor_hidden","").replace(" Rcl_Mini_Editor","");
        }
}


//---------------------------------//


Condition.prototype.toOEF = function()
/*
 * Fonction qui permet de générer le code OEF de l'instruction "if"
 * retourne une chaine de caractère contenant le code OEF.
 */
{
    indice1 = rucheSys.rechercheIndice("cond"+this.nom,rucheSys.listeEditeur);
    indice2 = rucheSys.rechercheIndice("condT"+this.nom,rucheSys.listeEditeur);
    indice3 = rucheSys.rechercheIndice("condF"+this.nom,rucheSys.listeEditeur);
    rucheSys.listeEditeur[indice1].recupDonneesVar();
    rucheSys.listeEditeur[indice2].recupDonneesVar();
    rucheSys.listeEditeur[indice3].recupDonneesVar();

    var br = /<div><br><\/div>/;

    // Retrait du <br> de fin de ligne
    if (br.test(rucheSys.listeEditeur[indice1].enonce_Html) == false)
    {
        rucheSys.listeEditeur[indice1].enonce_Html = rucheSys.listeEditeur[indice1].enonce_Html.slice(0, rucheSys.listeEditeur[indice1].enonce_Html.length-6);
    };
    if (br.test(rucheSys.listeEditeur[indice2].enonce_Html) == false)
    {
        rucheSys.listeEditeur[indice2].enonce_Html = rucheSys.listeEditeur[indice2].enonce_Html.slice(0, rucheSys.listeEditeur[indice2].enonce_Html.length-6);
    };
    if (br.test(rucheSys.listeEditeur[indice3].enonce_Html) == false)
    {
        rucheSys.listeEditeur[indice3].enonce_Html = rucheSys.listeEditeur[indice3].enonce_Html.slice(0, rucheSys.listeEditeur[indice3].enonce_Html.length-6);
    };

    return "\\if{"+rucheSys.listeEditeur[indice1].toOEF()+"}{"+rucheSys.listeEditeur[indice2].toOEF()+"}\n 	{"+rucheSys.listeEditeur[indice3].toOEF()+"}\n";
}	

