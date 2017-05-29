/*
 * Classe Ruche :
 * Classe principale, gère l'intégralité du développement
 * de l'exercice que crée l'utilisateur.
 */

function Ruche() {

    //--------- CONSTRUCTEUR ---------//

    // attributs spécifiques à l'énoncé


    // attributs spécifiques à la préparation
    this.listeBlocPrepa = [];       // liste des blocs dans la préparation
    this.listeBlocPrepa_sauve = null;
    this.nb_condition = 0;
    this.nb_for = 0;
    this.nb_codeLibre = 0;

    // attributs spécifiques à l'analyse
    this.listeBlocAnalyse = [];     // liste des blocs dans l'analyse qui ne sont pas des réponses
    this.nb_repcodelibre = 0;
    this.nb_repcondition = 0;
    this.nb_repaide = 0;
    this.nb_repfeedback = 0;
    this.nb_repindication = 0;

    // attributs généraux (trans-onglets)
    this.listeReponse = [];			// liste de toutes les réponses de l'exercice.
    this.listeVariables = []; 	    // liste de toutes les variables de l'exercice.
    this.listeTypeVariable = []; 	// liste de tous les types de variables de l'exercice.
    this.listeEditeur = [];			// liste de tous les éditeurs du site.
    this.listeClasseEssaim = [];    // liste des classes/types d'essaims disponibles
    this.listeComposantEssaim = []; // liste de tous les composants d'essaim créés par l'utilisateur
    this.compteComposantEssaim = []; // compteur des objets composants d'essaim créés par l'utilisateur. Doit être géré EN MEME TEMPS QUE this.listeComposantEssaim
    /*this.correspondanceBloc [][]; // Tableau en deux dimension. Sert pour mettre en place le bloc dans les blocs. Indice colonne = Indice du bloc. Ligne 1: Si il contient un bloc, son indice y est écrit. Si ==-1 alors non suivi. Ligne 2 : sert à savoir si le bloc doit être visible ou non. Si la valeur est à 1, il est visible. Sinon caché. */

    this.nb_reponse = 0;
    this.nb_typeVariable = 0;
    this.nb_typeVarCategorie = [0, 0, 0]; // dans l'ordre catégorie d'objet, de matière et de section
    this.nb_classeEssaim = 0;
    this.nb_essaim = 0;
    this.nb_imageEssaim = 0; // numéro de l'image "essaim". Sert à donner un id unique à l'image
    this.nb_imageVariable = 0; // numéro d'une image de variable pour les variables-objets
    this.nb_composantEssaim = 0;

    this.id_dernierMenuClic = ""; // id du dernier bouton parent de menu déroulant cliqué

    this.enonce = new Editeur('ql-editor-1', this, false);	// éditeur principal, qui se trouve dans l'onglet énoncé.
    this.entete = new Entete();		// entête de l'exercice que va initialiser l'utilisateur.

    // Initialisations à la construction de l'événement système

    this.initialisationEvent();  // init de tous les événements
    this.initMenuChoixTypeVar(); // le menu pour choisir les types de variable est unique (pour le moment)

}

//---------------------------------------//
// ********** Initialisations ********** //
//---------------------------------------//

Ruche.prototype.initialisationEvent = function ()
    /*
     * Initialisation des évènements de notre système
     */ {
    // Event listener sur la touche Entrée dans Préparation	pour valider une variable
    enterKey = document.getElementById("RidPrMe_Champ_New_Var");
    enterKey.addEventListener("keyup", function (e) {
        if (e.keyCode === 13)// Quand on appuie sur entrée
        {
            rucheSys.ajoutVariablePreparation();
        }
    }, false);

    //---------------------------------//

    // Si l'on est sur firefox, les evenements changent
    var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
    var isChrome = !!window.chrome && !isOpera;
    var isFirefox = typeof InstallTrigger !== 'undefined';
    
    /**************************************************************/

    // On recupère l'emplacement ou sont stockés les blocs
    list = document.getElementById("Rid_Prep_Blocs");

    // compteur pour garder la bordure rouge tant qu'on est dans une case "déposable" (pour Firefox)
    var compteurDrag = 0;

    // Quand on entre dans le bloc du drop, la bordure devient rouge
    if (isChrome) // Si l'on est sur google chrome
    {
        // On ajoute une action lorsque le curseur entre dans l'evenement
        list.addEventListener('dragenter', function (e) {
            e.preventDefault();
            if (e.target.className.split(' ')[0] == "Rcl_Droppable") {
                var rect = e.target.getBoundingClientRect();
                if (e.x <= rect.left + rect.width && e.x >= rect.left && e.y <= rect.top + rect.height && e.y >= rect.top) {
                    e.target.style.border = "2px dotted red";
                }
            }
        }, false);
    }
    else // Si l'on est sur firefox
    {
        list.addEventListener('dragenter', function (event) {
            event.preventDefault();
            // si pas de classe, ne tient pas compte de l'evt
            if (typeof event.target.className != 'undefined') {
                if (event.target.className.split(' ')[0] == "Rcl_Droppable") {
                    // bordure devient rouge
                    compteurDrag++;
                    event.target.style.border = "2px dotted red";
                }
                else if (event.target.parentElement.className.split(' ')[0] == "Rcl_Droppable") {
                    // bordure devient rouge
                    compteurDrag++;
                    event.target.parentElement.style.border = "2px dotted red";
                }
                else if (event.target.parentElement.parentElement.className.split(' ')[0] == "Rcl_Droppable") {
                    // bordure devient rouge
                    compteurDrag++;
                    event.target.parentElement.parentElement.style.border = "2px dotted red";
                }
            }
        }, false);
    }

    //---------------------------------//

    // Quand on quitte le bloc, la bordure redevient normale
    if (isChrome) // Si l'on est sur google chrome
    {
        list.addEventListener('dragleave', function (e) {

            e.preventDefault();
            // Si l'on est dans une element fils d'une zone droppable, alors on recupere
            // cette zone afin d'effectuer le drop dedans
            var target = e.target;
            while (target.className.split(' ')[0] == "Rcl_Droppable" && target.id != this.id) {
                target = target.parentNode;
            }

            // Si l'on a bien trouvé une zone droppable, alors on effectue l'action
            if (target.id != this.id) {
                var rect = e.target.getBoundingClientRect();
                if (e.x > rect.left + rect.width || e.x < rect.left || e.y > rect.top + rect.height || e.y < rect.top) {
                    e.target.style.border = "";
                }

            }
        }, false);
    }
    else // Si l'on est sur firefox
    {
        list.addEventListener('dragleave', function (event) {
            event.preventDefault();
            // si pas de classe, ne tient pas compte de l'evt
            if (typeof event.target.className != 'undefined') {
                // On recupere la classe droppable
                if (event.target.className.split(' ')[0] == "Rcl_Droppable") {
                    compteurDrag--;
                    if (compteurDrag === 0) {
                        event.target.style.border = "";
                    }
                }
                else if (event.target.parentElement.className.split(' ')[0] == "Rcl_Droppable") {
                    compteurDrag--;
                }
                else if (event.target.parentElement.parentElement.className.split(' ')[0] == "Rcl_Droppable") {
                    compteurDrag--;
                }
            }
        }, false);
    }

    //---------------------------------//

    list.addEventListener('dragover', function (event) {
        event.preventDefault();
        // event.target.style.border = "10px dotted red";

    }, false);

    //---------------------------------//

    //Quand on lache la selection, on transfere la variable selectionnée dans l'editeur
    if (isChrome) // Si l'on est sur google chrome
    {
        list.addEventListener('drop', function (e) {
            console.log("Ruche 1");
            e.preventDefault();
            // Si l'on est dans une element fils d'une zone droppable, alors on recupere
            // cette zone afin d'effectuer le drop dedans
            var target = e.target;
            while (target.className.split(' ')[0] != "Rcl_Droppable" && target.id != this.id) {
                target = target.parentNode;
            }

            var rect = target.getBoundingClientRect();
            if (e.target.parentElement.parentElement.className.split(' ')[0] == "Rcl_Droppable") {
                
                
                console.log("Troisieme if de ruche  2");
                txt = event.target.parentElement.parentElement;
                elem = document.getElementById(event.dataTransfer.getData("texte"));
                
                console.log("-1-");
                indice = rucheSys.rechercheIndice(txt.id, rucheSys.listeEditeur);
                console.log("-2-");
                
                console.log("Données txt recu = "+ event.dataTransfer.getData('texte'));
                console.log("txt= "+ txt.nodeName);
                console.log("id champs visé "+ rucheSys.listeEditeur[indice].nom);
                console.log("id champs visé (precis) = "+ this.IDvar);
                nameData = event.dataTransfer.getData('text/plain');
                estUnBloc = nameData.indexOf("RidPrBloc"); //vaudra 0 ou plus si c'est un bloc
                console.log("id var recu : "+nameData);
                
                if(estUnBloc>-1)
                    {
                        //blocDrop=document.getElementById(nameData);
                        //blocDrop.integrerBlocDansBloc(rucheSys.listeEditeur[indice].nom);
                        integrerBlocDansBloc(nameData,rucheSys.listeEditeur[indice].nom);// Cette méthode va intégrer un bloc dans un autre. Paramètre :l'id du bloc droppé, l'id de l'éditeur  
                        
                    }
                else
                    {
                        
                        rucheSys.listeEditeur[indice].insertVariableDansEditeur(elem.innerHTML);
                        console.log("-3-");
                    }
                event.target.parentElement.parentElement.style.border = "";
                console.log("-4-");
                        
               
                
                
                compteurDrag = 0; // pour effacer le cadre rouge (Firefox)
            }
            // Si l'on a bien trouvé une zone droppable, alors on effectue l'action
            else if (target.id != this.id) {
                if (e.x <= rect.left + rect.width && e.x >= rect.left && e.y <= rect.top + rect.height && e.y >= rect.top) {
                    var txt = target;
                    console.log("format id : "+txt.id);
                    var elem = document.getElementById(e.dataTransfer.getData("texte"));
                    var indice = rucheSys.rechercheIndice(txt.id, rucheSys.listeEditeur);
                    rucheSys.listeEditeur[indice].insertVariableDansEditeur(elem.innerHTML);
                    target.style.border = "";
                }
            }
        }, false);
    }
    else {
        list.addEventListener('drop', function (event) {
            console.log("Ruche 2 ");
            event.preventDefault();
            // On recupere la classe droppable
            var txt, elem, indice, nameData,estUnBloc; // nameData = le texte recu par les moyens du text/plain dans le cas du bloc dans bloc
            console.log("innerHTML= "+event.target.namespaceURI);
            
            if (event.target.className.split(' ')[0] == "Rcl_Droppable") {

                txt = event.target;
                elem = document.getElementById(event.dataTransfer.getData("texte"));
                console.log("Premier if de ruche 2");
                indice = rucheSys.rechercheIndice(txt.id, rucheSys.listeEditeur);
                rucheSys.listeEditeur[indice].insertVariableDansEditeur(elem.innerHTML);
                event.target.style.border = "";
                compteurDrag = 0; // pour effacer le cadre rouge (Firefox)
            }
            else if (event.target.parentElement.className.split(' ')[0] == "Rcl_Droppable") {
                console.log("Deuxième if de ruche 2");
                txt = event.target.parentElement;
                elem = document.getElementById(event.dataTransfer.getData("texte"));
                indice = rucheSys.rechercheIndice(txt.id, rucheSys.listeEditeur);
                rucheSys.listeEditeur[indice].insertVariableDansEditeur(elem.innerHTML);
                event.target.parentElement.style.border = "";
                compteurDrag = 0; // pour effacer le cadre rouge (Firefox)
            }
            else if (event.target.parentElement.parentElement.className.split(' ')[0] == "Rcl_Droppable") {
                
                
                console.log("Troisieme if de ruche  2");
                txt = event.target.parentElement.parentElement;
                elem = document.getElementById(event.dataTransfer.getData("texte"));
                
                console.log("-1-");
                indice = rucheSys.rechercheIndice(txt.id, rucheSys.listeEditeur);
                console.log("-2-");
                
                console.log("Données txt recu = "+ event.dataTransfer.getData('texte'));
                console.log("txt= "+ txt.nodeName);
                console.log("id champs visé "+ rucheSys.listeEditeur[indice].nom);
                console.log("id champs visé (precis) = "+ this.IDvar);
                nameData = event.dataTransfer.getData('text/plain');
                estUnBloc = nameData.indexOf("RidPrBloc"); //vaudra 0 ou plus si c'est un bloc
                console.log("id var recu : "+nameData);
                
                if(estUnBloc>-1)
                    {
                        //blocDrop=document.getElementById(nameData);
                        //blocDrop.integrerBlocDansBloc(rucheSys.listeEditeur[indice].nom);
                        integrerBlocDansBloc(nameData,rucheSys.listeEditeur[indice].nom);// Cette méthode va intégrer un bloc dans un autre. Paramètre :l'id du bloc droppé, l'id de l'éditeur
                        
                    }
                else
                    {
                        
                        rucheSys.listeEditeur[indice].insertVariableDansEditeur(elem.innerHTML);
                        console.log("-3-");
                    }
                event.target.parentElement.parentElement.style.border = "";
                console.log("-4-");
                        
               
                
                
                compteurDrag = 0; // pour effacer le cadre rouge (Firefox)
            }
        }, false);
    }

    /**************************************************************/

    // On recupère l'emplacement ou sont stockés les blocs
    l = document.getElementById("Rid_Analyse_Blocs_Reponses");

    /* On effectue les même listener que ci-dessus, mais dans la zone des réponses */

    // Quand on entre dans le bloc du drop, la bordure devient rouge
    if (isChrome) {
        l.addEventListener('dragenter', function (e) {
            e.preventDefault();
            if (e.target.className.split(' ')[0] == "Rcl_Droppable") {
                var rect = e.target.getBoundingClientRect();
                if (e.x <= rect.left + rect.width && e.x >= rect.left && e.y <= rect.top + rect.height && e.y >= rect.top) {
                    e.target.style.border = "2px dotted red";
                }
            }
        }, false);
    }
    else {
        l.addEventListener('dragenter', function (event) {
            event.preventDefault();
            if (event.target.className.split(' ')[0] == "Rcl_Droppable") {
                compteurDrag++;
                event.target.style.border = "2px dotted red";
            }
            else if (event.target.parentElement.className.split(' ')[0] == "Rcl_Droppable") {
                // bordure devient rouge
                compteurDrag++;
                event.target.parentElement.style.border = "2px dotted red";
            }
            else if (event.target.parentElement.parentElement.className.split(' ')[0] == "Rcl_Droppable") {
                // bordure devient rouge
                compteurDrag++;
                event.target.parentElement.parentElement.style.border = "2px dotted red";
            }
        }, false);
    }

    //---------------------------------//

    // Quand on quitte le bloc, la bordure redevient normale
    if (isChrome) {
        l.addEventListener('dragleave', function (e) {

            e.preventDefault();
            var target = e.target;
            while (target.className.split(' ')[0] == "Rcl_Droppable" && target.id != this.id) {
                target = target.parentNode;
            }

            if (target.id != this.id) {
                var rect = e.target.getBoundingClientRect();
                if (e.x > rect.left + rect.width || e.x < rect.left || e.y > rect.top + rect.height || e.y < rect.top) {
                    e.target.style.border = "";
                }
            }
        }, false);
    }
    else {
        l.addEventListener('dragleave', function (event) {
            event.preventDefault();
            if (event.target.className.split(' ')[0] == "Rcl_Droppable") {
                compteurDrag--;
                if (compteurDrag === 0) {
                    event.target.style.border = "";
                }
            }
            else if (event.target.parentElement.className.split(' ')[0] == "Rcl_Droppable") {
                compteurDrag--;
            }
            else if (event.target.parentElement.parentElement.className.split(' ')[0] == "Rcl_Droppable") {
                compteurDrag--;
            }
        }, false);
    }

    //---------------------------------//

    l.addEventListener('dragover', function (event) {
        event.preventDefault();
    }, false);

    //---------------------------------//

    //Quand on lache la selection, on transfere la variable selectionnee dans l'editeur
    if (isChrome) {
        l.addEventListener('drop', function (e) {
            console.log("Ruche 3");
            e.preventDefault();

            var target = e.target;
            while (target.className.split(' ')[0] != "Rcl_Droppable" && target.id != this.id) {
                target = target.parentNode;
            }

            var rect = target.getBoundingClientRect();
            if (target.id != this.id) {
                if (e.x <= rect.left + rect.width && e.x >= rect.left && e.y <= rect.top + rect.height && e.y >= rect.top) {
                    var txt = target;
                    var elem = document.getElementById(e.dataTransfer.getData("texte"));
                    var indice = rucheSys.rechercheIndice(txt.id, rucheSys.listeEditeur);
                    rucheSys.listeEditeur[indice].insertVariableDansEditeur(elem.innerHTML);
                    target.style.border = "";
                }
            }
        }, false);
    }
    else {
        l.addEventListener('drop', function (event) {
            console.log("Ruche 4");
            event.preventDefault();

            if (event.target.className.split(' ')[0] == "Rcl_Droppable") {
                var txt = event.target;
                var elem = document.getElementById(event.dataTransfer.getData("texte"));
                var indice = rucheSys.rechercheIndice(txt.id, rucheSys.listeEditeur);
                rucheSys.listeEditeur[indice].insertVariableDansEditeur(elem.innerHTML);
                event.target.style.border = "";
                compteurDrag = 0; // pour effacer le cadre rouge (Firefox)
            }
            else if (event.target.parentElement.className.split(' ')[0] == "Rcl_Droppable") {

                var txt = event.target.parentElement;
                var elem = document.getElementById(event.dataTransfer.getData("texte"));
                var indice = rucheSys.rechercheIndice(txt.id, rucheSys.listeEditeur);
                rucheSys.listeEditeur[indice].insertVariableDansEditeur(elem.innerHTML);
                event.target.parentElement.style.border = "";
                compteurDrag = 0; // pour effacer le cadre rouge (Firefox)
            }
            else if (event.target.parentElement.parentElement.className.split(' ')[0] == "Rcl_Droppable") {

                var txt = event.target.parentElement.parentElement;
                var elem = document.getElementById(event.dataTransfer.getData("texte"));
                var indice = rucheSys.rechercheIndice(txt.id, rucheSys.listeEditeur);
                rucheSys.listeEditeur[indice].insertVariableDansEditeur(elem.innerHTML);
                event.target.parentElement.parentElement.style.border = "";
                compteurDrag = 0; // pour effacer le cadre rouge (Firefox)
            }
        }, false);
    }

    /**************************************************************/

    // On recupère l'emplacement ou sont stockés les blocs
    l1 = document.getElementById("Rid_Analyse_Blocs_Instructions");

    /* On effectue les même listener que ci-dessus, mais dans la zone des réponses */

    // Quand on entre dans le bloc du drop, la bordure devient rouge
    if (isChrome) {
        l1.addEventListener('dragenter', function (e) {
            e.preventDefault();
            if (e.target.className.split(' ')[0] == "Rcl_Droppable") {
                var rect = e.target.getBoundingClientRect();
                if (e.x <= rect.left + rect.width && e.x >= rect.left && e.y <= rect.top + rect.height && e.y >= rect.top) {
                    e.target.style.border = "2px dotted red";
                }
            }
        }, false);
    }
    else {
        l1.addEventListener('dragenter', function (event) {
            event.preventDefault();
            if (event.target.className.split(' ')[0] == "Rcl_Droppable") {
                compteurDrag++;
                event.target.style.border = "2px dotted red";
            }
            else if (event.target.parentElement.className.split(' ')[0] == "Rcl_Droppable") {
                // bordure devient rouge
                compteurDrag++;
                event.target.parentElement.style.border = "2px dotted red";
            }
            else if (event.target.parentElement.parentElement.className.split(' ')[0] == "Rcl_Droppable") {
                // bordure devient rouge
                compteurDrag++;
                event.target.parentElement.parentElement.style.border = "2px dotted red";
            }
        }, false);
    }

    // Quand on quitte le bloc, la bordure redevient normale
    if (isChrome) {
        l1.addEventListener('dragleave', function (e) {
            e.preventDefault();
            var target = e.target;
            while (target.className.split(' ')[0] == "Rcl_Droppable" && target.id != this.id) {
                target = target.parentNode;
            }

            var rect = target.getBoundingClientRect();
            if (target.id != this.id) {
                var rect = e.target.getBoundingClientRect();
                if (e.x > rect.left + rect.width || e.x < rect.left || e.y > rect.top + rect.height || e.y < rect.top) {
                    e.target.style.border = "";
                }

            }
        }, false);
    }
    else {
        l1.addEventListener('dragleave', function (event) {
            event.preventDefault();
            if (event.target.className.split(' ')[0] == "Rcl_Droppable") {
                compteurDrag--;
                if (compteurDrag === 0) {
                    event.target.style.border = "";
                }
            }
            else if (event.target.parentElement.className.split(' ')[0] == "Rcl_Droppable") {
                compteurDrag--;
            }
            else if (event.target.parentElement.parentElement.className.split(' ')[0] == "Rcl_Droppable") {
                compteurDrag--;
            }
        }, false);
    }

    //---------------------------------//

    l1.addEventListener('dragover', function (event) {
        event.preventDefault();

    }, false);

    //Quand on lache la selection, on transfere la variable selectionnée dans l'editeur
    if (isChrome) {
        l1.addEventListener('drop', function (e) {
            console.log("Ruche 5");
            e.preventDefault();

            var target = e.target;
            while (target.className.split(' ')[0] != "Rcl_Droppable" && target.id != this.id) {
                target = target.parentNode;
            }


            var rect = target.getBoundingClientRect();
            if (target.id != this.id) {
                if (e.x <= rect.left + rect.width && e.x >= rect.left && e.y <= rect.top + rect.height && e.y >= rect.top) {
                    var txt = target;
                    var elem = document.getElementById(e.dataTransfer.getData("texte"));
                    var indice = rucheSys.rechercheIndice(txt.id, rucheSys.listeEditeur);
                    rucheSys.listeEditeur[indice].insertVariableDansEditeur(elem.innerHTML);
                    target.style.border = "";
                }
            }
        }, false);
    }
    else {
        l1.addEventListener('drop', function (event) {
            console.log("Ruche 6");
            event.preventDefault();

            if (event.target.className.split(' ')[0] == "Rcl_Droppable") {
                var txt = event.target;
                var elem = document.getElementById(event.dataTransfer.getData("texte"));
                var indice = rucheSys.rechercheIndice(txt.id, rucheSys.listeEditeur);
                rucheSys.listeEditeur[indice].insertVariableDansEditeur(elem.innerHTML);
                event.target.style.border = "";
                compteurDrag = 0; // pour effacer le cadre rouge (Firefox)
            }
            else if (event.target.parentElement.className.split(' ')[0] == "Rcl_Droppable") {

                var txt = event.target.parentElement;
                var elem = document.getElementById(event.dataTransfer.getData("texte"));
                var indice = rucheSys.rechercheIndice(txt.id, rucheSys.listeEditeur);
                rucheSys.listeEditeur[indice].insertVariableDansEditeur(elem.innerHTML);
                event.target.parentElement.style.border = "";
                compteurDrag = 0; // pour effacer le cadre rouge (Firefox)
            }
            else if (event.target.parentElement.parentElement.className.split(' ')[0] == "Rcl_Droppable") {

                var txt = event.target.parentElement.parentElement;
                var elem = document.getElementById(event.dataTransfer.getData("texte"));
                var indice = rucheSys.rechercheIndice(txt.id, rucheSys.listeEditeur);
                rucheSys.listeEditeur[indice].insertVariableDansEditeur(elem.innerHTML);
                event.target.parentElement.parentElement.style.border = "";
                compteurDrag = 0; // pour effacer le cadre rouge (Firefox)
            }
        }, false);
    }

}

//---------------------------------//

Ruche.prototype.initMenuChoixTypeVar = function ()
    /*
     * Initialisation du menu de choix du type de variable
     * Utilisation du plugin jquery zTree : http://www.ztree.me/
     * Ce menu est unique pour le moment, sera adapté dans l'avenir
     * si le nombre de choix devient trop important
     */ {
    // Init du div contenant le menu. div qui sera dans "body", invisible au départ
    var divMenuChoixType = $("<div>", {
        id: "divMenuChoixType",
        class: "menuContent",
        style: "display: none; position: absolute;"
    });
    $("body").append(divMenuChoixType);

    // Init des paramètres du menu zTree
    var curMenu = null, zTree_Menu = null;
    var settings = {
        view: {
            showLine: false,
            showIcon: false,
            selectedMulti: false,
            dblClickExpand: false,
            addDiyDom: Variable.prototype.menuChoixTypeAddDiyDom
        },
        data: {
            simpleData: {
                enable: true
            }
        },
        callback: {
            beforeClick: Variable.prototype.menuChoixTypePreClickMenu,
            onClick: Variable.prototype.menuChoixTypeClickMenu
        }
    };

    // Fabrique la liste des types de variables
    // Cette liste sera complétée par l'ajout de types de variables (classes filles
    // de la classe TypeVariable).
    // Elements du noeud :  - idTypeVar : indice du type de la variable (classe fille
    //                               de TypeVariable) dans le tableau Ruche.listeTypeVariable[]
    //                               si = -1, type de base
    //                                  = -2 noeud parent Objet
    //                                  = -3 noeud parent Matière
    //                                  = -4 noeud parent Section
    //                      - id : identifiant unique du noeud,
    //                                  id < 50 : variable de type de base
    //                                  49 < id < 10000 : variable de type final (feuille),
    //                                                  qui n'a pas de classe fille
    //                                  9999 < id < 11000 : noeud parent, "Objet"
    //                                  10999 < id < 12000 : noeud parent, "Matiere"
    //                                  11999 < id < 13000 : noeud parent, "Section"

    var zNodesMenuType = [
        {idTypeVar: -1, id: 1, pId: 0, name: "Types de base", open: true},
        {idTypeVar: -1, id: 2, pId: 1, name: "Réel"},
        {idTypeVar: -1, id: 3, pId: 1, name: "Entier"},
        {idTypeVar: -1, id: 4, pId: 1, name: "Matrice"},
        {idTypeVar: -1, id: 5, pId: 1, name: "Complexe"},
        {idTypeVar: -1, id: 6, pId: 1, name: "Texte"},
        {idTypeVar: -1, id: 7, pId: 1, name: "Fonction"},
        {idTypeVar: -1, id: 8, pId: 1, name: "Autre..."}
    ];

    // Fabrication du menu zTree

    var treeObj = $("<ul>", {
        id: "menuChoixType",
        class: "ztree ztreeMenuDeroul",
        style: "margin-top: 0; background-color: "
    });
    var divMenuChoixtype = $("#divMenuChoixType");
    divMenuChoixtype.prepend(treeObj);

    $.fn.zTree.init(treeObj, settings, zNodesMenuType);
    zTree_Menu = $.fn.zTree.getZTreeObj("menuChoixType");
    curMenu = zTree_Menu.getNodes()[0];
    zTree_Menu.selectNode(curMenu);

    treeObj.hover(function () {
        if (!treeObj.hasClass("showIcon")) {
            treeObj.addClass("showIcon");
        }
    }, function () {
        treeObj.removeClass("showIcon");
    });

}

//---------------------------------//

Ruche.prototype.initClasseEssaim = function (ClasseEssaimDerivee)
    /*
     * Déclaration du type d'essaim (enregistre la classe dans l'objet Ruche)
     * au chargement du code. IMPORTANT : le code des classes dérivées
     * doit être chargé APRES le code de la classe "Essaim" de base
     */ {
    this.nb_classeEssaim++;
    this.listeClasseEssaim.push(ClasseEssaimDerivee);

    var div_menu_prepa = document.getElementById("Rid_Prep_Menu");
    var boutonEssaim = document.createElement('button');
    var nomEssaimAffiche = document.createTextNode(ClasseEssaimDerivee.prototype.nomAffiche);
    boutonEssaim.appendChild(nomEssaimAffiche);
    boutonEssaim.id = "bloc" + ClasseEssaimDerivee.nomAffiche;
    boutonEssaim.className = "Rcl_Side_Menu_Button";
    boutonEssaim.addEventListener('click', function (event) {
            rucheSys.ajoutBlocEssaim(ClasseEssaimDerivee);
        },
        true);

    div_menu_prepa.appendChild(boutonEssaim);
}

//---------------------------------//

Ruche.prototype.initClasseTypeVariable = function (TypeVariableDerivee)
    /*
     * Déclaration du type de variable (enregistre la classe/type dans l'objet Ruche)
     * au chargement du code. IMPORTANT : le code des classes dérivées
     * doit être chargé APRES le code de la classe "TypeVariable" de base
     */ {
    this.nb_typeVariable++;
    this.listeTypeVariable.push(TypeVariableDerivee);

    // Ajouter une option dans le menu des variables
    zTree_Menu = $.fn.zTree.getZTreeObj("menuChoixType");

    var catObjet = TypeVariableDerivee.prototype.categorieObjet;
    var catMatiere = TypeVariableDerivee.prototype.categorieMatiere;
    var catSection = TypeVariableDerivee.prototype.categorieSection;

    // construit le noeud. Voir les éléments dans Ruche.prototype.initMenuChoixTypeVar
    var typeNode = {
        idTypeVar: this.nb_typeVariable - 1,
        id: 50 + this.nb_typeVariable,
        pId: 10000,
        name: TypeVariableDerivee.prototype.nomAffiche
    };

    // Crée les catégories si elles n'existent pas. Commence par la catégorie objet.
    // Cherche la catégorie objet de ce type
    var noeudObjet = zTree_Menu.getNodesByFilter(function (noeud) {
        return noeud.id < 11000 && noeud.id > 9999 && noeud.name == catObjet
    }, true);

    var noeudParentNext = null; // noeud qui va servir de parent pour la suite
    if (noeudObjet == null && catObjet != "") {
        this.nb_typeVarCategorie[0]++;
        noeudObjet = {idTypeVar: -2, id: 9999 + this.nb_typeVarCategorie[0], pId: 0, name: catObjet};
        zTree_Menu.addNodes(null, noeudObjet, true);
        noeudParentNext = zTree_Menu.getNodeByParam("id", noeudObjet.id);
    }

    // Crée la catégorie matière si elle n'existe pas
    var noeudMatiere = zTree_Menu.getNodesByFilter(function (noeud) {
        return noeud.id < 12000 && noeud.id > 10999 && noeud.name == catMatiere
    }, true, noeudParentNext);
    if (noeudMatiere == null && catMatiere != "") {
        this.nb_typeVarCategorie[1]++;
        var idNoeudParentNext = 0;
        if (noeudParentNext != null) {
            idNoeudParentNext = noeudParentNext.id;
        }
        noeudMatiere = {
            idTypeVar: -3,
            id: 10999 + this.nb_typeVarCategorie[1],
            pId: idNoeudParentNext,
            name: catMatiere
        };
        zTree_Menu.addNodes(noeudParentNext, noeudMatiere, true);
        noeudParentNext = zTree_Menu.getNodeByParam("id", noeudMatiere.id);
    }

    // Crée la catégorie section si elle n'existe pas
    var noeudSection = zTree_Menu.getNodesByFilter(function (noeud) {
        return noeud.id < 13000 && noeud.id > 11999 && noeud.name == catSection
    }, true, noeudParentNext);
    if (noeudSection == null && catSection != "") {
        this.nb_typeVarCategorie[2]++;
        var idNoeudParentNext = 0;
        if (noeudParentNext != null) {
            idNoeudParentNext = noeudParentNext.id;
        }
        noeudSection = {
            idTypeVar: -4,
            id: 11999 + this.nb_typeVarCategorie[2],
            pId: idNoeudParentNext,
            name: catSection
        };
        zTree_Menu.addNodes(noeudParentNext, noeudSection, true);
        noeudParentNext = zTree_Menu.getNodeByParam("id", noeudSection.id);
    }

    // Crée le noeud final (feuille)
    zTree_Menu.addNodes(noeudParentNext, typeNode, true);


}


//--------------- METHODES ----------------//

//-----------------------------------//
// ********** Utilitaires ********** //
//-----------------------------------//

//---------------------------------//

Ruche.prototype.rechercheIndice = function (id, tab)
    /*
     * Retourne l'indice de la variable dans le tableau.
     * Paramètre(s) : 	- id : variable à rechercher.
     */ {
    var ind = -1;
    for (var i = 0; i < tab.length; i++) {
        if (tab[i].nom == id) {
            ind = i;
        }
    }
    return ind;
}

//---------------------------------//

Ruche.prototype.contenuNombreEditeur = function (id)
    /*
     * Retourne le contenu de l'éditeur "id" sous forme de nombre
     */ {
    var indice = rucheSys.rechercheIndice(id, rucheSys.listeEditeur);
    rucheSys.listeEditeur[indice].recupDonneesVar();
    return Number(rucheSys.listeEditeur[indice].toOEF());
}

//---------------------------------//

Ruche.prototype.genereImageVarBase64 = function (nomVar, tailleX, tailleY, description, fichierImage)
    /*
     * Génération d'une image png en base64 constituée de l'image de fond "fichierImage"
     * sur laquelle on superpose le symbole d'une variable de nom "nomVar"
     *
     * params :     - nomVar : nom de la variable
     *              - tailleX, tailleY : taille en X et Y de l'image
     *              - description : chaine de caractères optionnelle à superposer au centre de l'image
     *              - fichierImage : fichier image de fond (optionnelle).
     *                      Si fichierImage non défini, met un cadre avec une croix.
     */ {
    // Construit un canvas pour le transformer en png, converti en format Base64
    // NE FONCTIONNE QUE SOUS HTML5 (pas sur les anciens navigateurs)
    var c = $("<canvas>", {
        id: "canGenImVar"
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
    var xEndRect = xStartRect + txtWidth;
    var yStartRect = 10;
    var yEndRect = yStartRect + 2 * radiusArc;

    ctx.fillStyle = "#F0F0F0";
    ctx.fillRect(0, 0, tailleX, tailleY);

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(tailleX, tailleY);
    ctx.moveTo(tailleX, 0);
    ctx.lineTo(0, tailleY);
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#D0D0D0";
    ctx.stroke();
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.rect(0, 0, tailleX, tailleY);
    ctx.stroke();

    ctx.beginPath();
    ctx.fillStyle = "#D0D0D0";
    ctx.fillText(description, xStartRect, yEndRect + 2 * radiusArc);

    ctx.beginPath();
    ctx.fillStyle = "rgb(175,217,235)";
    ctx.arc(xStartRect, yStartRect + radiusArc, radiusArc, 0, 2 * Math.PI);
    ctx.fill();
    ctx.arc(xEndRect, yStartRect + radiusArc, radiusArc, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillRect(xStartRect, yStartRect, xEndRect - xStartRect, yEndRect - yStartRect);

    ctx.fillStyle = "black";
    ctx.fillText(nomVar, xStartRect, yStartRect + (yEndRect - yStartRect) * 0.6);
    var dataUrl = c[0].toDataURL("image/png");

    console.log(dataUrl);

    return dataUrl;
}

//---------------------------------//

Ruche.prototype.varObject = function (variable)
    /*
     * Renvoie l'objet variable de nom "variable" si il existe
     * sert aussi à vérifier qu'une variable ne se trouve pas déjà dans le tableau.
     * Paramètre(s) : 	variable : variable à vérifier.
     */ {
    // Fonction qui vérifie qu'une variable n'est pas en double dans le tableau de variables.
    for (var i = 0; i < rucheSys.listeVariables.length; i++) {
        if (variable == rucheSys.listeVariables[i].nom) {
            return rucheSys.listeVariables[i];
        }
    }
    return false;
}

//---------------------------------//

Ruche.prototype.composantDouble = function (composant)
    /*
     * Fonction qui vérifie qu'un composant ne se trouve pas en double dans la liste.
     * Paramètre(s) : 	- composant : nom du composant à vérifier.
     * Retour :         - numéro du composant existant dans la liste des composants
     */ {
    // Fonction qui vérifie qu'un composant n'est pas en double dans le tableau de composants.
    for (var i = 0; i < this.listeComposantEssaim.length; i++) {
        if (composant == this.listeComposantEssaim[i].nom) {
            return i;
        }
    }
    return -1;
}

//---------------------------------//

//-------------------------------------------------//
// ********** Ajouts de variables/blocs ********** //
//-------------------------------------------------//

Ruche.prototype.ajoutVariable = function (edit)
    /*
     * Appelé quand on appuie sur le bouton de la barre de menus "Var" = "Ajouter une variable".
     *
     * Fonction qui permet d'ajouter (créer) une variable dans la ruche à travers l'éditeur principal.
     * Vérifie si elle est valide (sans espace et sans caractère interdits) et qu'elle
     * ne soit pas en double, si c'est ok, l'ajoute dans le tableau de variables.
     */ {
    if (edit == null) {
        document.getElementById('ql-editor-1').focus();
    }

    else {

        var ind = this.rechercheIndice(edit, this.listeEditeur);
        this.listeEditeur[ind].edit.focus();
    }

    var selection = window.getSelection();
    selection = selection.toString().trim();
    var regex = /^[a-zA-Z_][a-zA-Z0-9_]*$/;

    // Si la variable est valide
    if (regex.test(selection)) {
        if (edit == null) {
            this.enonce.colorieEnVar(selection);
        }
        else {
            this.listeEditeur[ind].colorieEnVarSecondaire(selection);
        }

        var existe = this.varObject(selection);

        // Si la variable n'est pas deja definie
        if (!existe) {

            var var0 = new Variable(selection);
            this.listeVariables.push(var0);

            var0.ajoutVarDansListe();
            var0.ajoutVarDansMenuListePreparation();
            var0.ajoutVarDansMenuListeAnalyse();
            var0.initBloc();

            this.listeBlocPrepa.push(var0);
        }
    }
    else {
        alert("Nom de variable incorrect, uniquement l'alphanumérique et le '_' sont autorisés");
    }
}

//---------------------------------//

Ruche.prototype.ajoutVariableJSON = function (elem, tab)
    /*
     * Ajoute une variable à partir d'une sauvegarde
     */ {

    var var0 = new Variable(elem.nom);
    this.listeVariables.push(var0);
    this.listeBlocPrepa.push(var0);
    var0.ajoutVarDansListe();
    var0.ajoutVarDansMenuListePreparation();
    var0.ajoutVarDansMenuListeAnalyse();
    var0.initBloc();
    var0.charge(elem);


}

//---------------------------------//

Ruche.prototype.ajoutVariablePreparation = function ()
    /*
     * Appelé quand on appuie sur le bouton "Créer variable" de l'onglet préparation.
     *
     * Fonction qui permet d'ajouter une variable Preparation dans l'onglet préparation.
     * Vérifie si elle est valide (sans espace et sans caractère interdits) et qu'elle
     * ne soit pas en double, si c'est ok, l'ajoute dans le tableau de variables.
     */ {
    var regex = /^[a-zA-Z_][a-zA-Z0-9_]*$/;
    var input = document.getElementById('RidPrMe_Champ_New_Var').value;

    // Si la variable est valide
    if (regex.test(input)) {
        var existe = this.varObject(input);

        // Si la variable n'est pas deja definie
        if (!existe) {
            document.getElementById("Rid_Warning_Variable_Exists").style.display = 'none';

            var var0 = new Variable(input);
            this.listeVariables.push(var0);
            this.listeBlocPrepa.push(var0);
            var0.ajoutVarDansListe();
            var0.ajoutVarDansMenuListePreparation();
            var0.ajoutVarDansMenuListeAnalyse();
            var0.initBloc();
        }
        else {
            document.getElementById("Rid_Warning_Variable_Exists").style.display = 'block';
        }
    }
    else {
        alert("Nom de variable incorrect, uniquement l'alphanumérique et le '_' sont autorisés");
    }

    document.getElementById('RidPrMe_Champ_New_Var').value = ""; // réinitialiser le champ à "vide"
    document.getElementById('RidPrMe_Champ_New_Var').focus(); // remettre le focus dans le champ 

}

//---------------------------------//

Ruche.prototype.ajoutComposantEssaim = function (nomEdit, classeComposant)
    /*
     * Appelé quand on sélectionne un élément du menu déroulant "Composants" d'un éditeur.
     * Ajoute un composant dans l'éditeur.
     * Vérifie si son nom est valide (sans espace et sans caractère interdits) et qu'il
     * ne soit pas en double, si c'est ok, l'ajoute dans la liste de composants.
     * paramètre(s) :       - nomEdit : nom de l'éditeur dans lequel on travaille
     *                      - classeComposant : type de composant (classe)
     */ {
    var ind = this.rechercheIndice(nomEdit, this.listeEditeur);
    this.listeEditeur[ind].edit.focus();

    var selection = window.getSelection();
    selection = selection.toString().trim();
    var regex = /^[a-zA-Z_][a-zA-Z0-9_]*$/;

    // Si pas de sélection, information utilisateur
    if (selection == "") {
        alert("Sélectionnez un mot dans l'éditeur puis cliquez sur le menu\nLe mot sélectionné deviendra le nom du nouveau composant.");
        return;
    }

    // Si la variable est valide
    if (regex.test(selection)) {
        var iExiste = this.composantDouble(selection);

        // Si la variable n'est pas deja definie
        if (iExiste < 0) {
            // Colorie et met la bonne classe de span
            this.listeEditeur[ind].ajoutCouleurComposant(selection);
            var comp0 = new classeComposant(selection);
            this.listeComposantEssaim.push(comp0);
            this.compteComposantEssaim.push(1);
        }
        else {
            if (this.listeComposantEssaim[iExiste].proto != classeComposant.prototype.proto) {
                // Si le composant existant déjà n'est pas du même type
                alert("Ce nom de composant est déjà utilisé pour un autre type.\nVeuillez changer de nom");
                return;
            }
            // Colorie et met la bonne classe de span
            this.listeEditeur[ind].ajoutCouleurComposant(selection);

            this.compteComposantEssaim[iExiste]++;
        }

        // montre le popup du composant pour pouvoir le modifier de suite (sauf si le composant existait déjà)
        if (typeof comp0 != 'undefined') {
            // doit envoyer le nom du span entourant le composant
            comp0.blocPopupShow("spanComposant" + selection);
        }
    }
    else {
        alert("Nom de composant incorrect, seuls les caractères alphanumériques\n et le '_' sont autorisés, le nom doit commencer par une lettre.");
    }
}

//---------------------------------//

Ruche.prototype.etiqueterTexteEnLatex = function (edit)
    /*
     * Fonction qui permet d'étiqueter du texte comme latex dans un éditeur.
     * paramètre edit : vaut null si on est sur l'éditeur principal , non null si on est sur un éditeur secondaire
     */ {
    if (edit == null) {
        document.getElementById('ql-editor-1').focus();
        var range = editor.getSelection(); // n'est pas l'objet "Selection" de Javascript, ni l'objet "Range" d'ailleurs !!!

        // Test general de la configuration de la selection.
        // Si on selectionne uniquement un bout de formule deja tagge Latex, alors on le de-tagge
        // (enleve la propriete latex). Sinon, on tagge.
        // Test basé sur les propriétés de Range et DocumentFragment
        var rangeContent = window.getSelection().getRangeAt(0);
        
        // test si startContainer et endContainer contiennent la meme chaine de texte
        var testRC1 = false;
        if (rangeContent.endContainer.data == rangeContent.startContainer.data) {
            testRC1 = true;
        }
        
        var rangeStartContParentName = rangeContent.startContainer.parentNode.nodeName;
        var rangeEndContParentName = rangeContent.endContainer.parentNode.nodeName;
        
        // test si les conteneur start et end sont des span et qu'on est dans un span "latex"
        var testRC2 = false;
        if (rangeStartContParentName == "SPAN" && rangeEndContParentName == "SPAN" && nodeCur.nodeName != "DIV") {
            var testLatexSpanBkgdColor = rangeContent.startContainer.parentNode.style.backgroundColor;
            if (testLatexSpanBkgdColor == "rgb(255, 202, 143)") testRC2 = true;

        }
        
        // test si le contenu de la selection est constitue de 3 Nodes
        // avec 1 ou 2 text nodes vides + test si le noeud parent est un span
        var selectionContents = rangeContent.cloneContents(); // extrait le contenu de la selection
        var testSC = true;
        for (var i=0;i<selectionContents.childNodes.length;i++) {
            nodeCur =selectionContents.childNodes[i];
            if (nodeCur.nodeName != "#text" && nodeCur.nodeName != "SPAN" && nodeCur.nodeName != "DIV") {
                testSC = false;
                break;
            }
            if (nodeCur.nodeName == "#text" && nodeCur.data != "") {
                testSC = false;
                break;
            }
            if (nodeCur.nodeName == "SPAN" && nodeCur.style.backgroundColor !="rgb(255, 202, 143)") {
                testSC = false;
                break;
            }
            if (nodeCur.nodeName == "DIV") {
                if (nodeCur.childNodes.length != 0) {
                    if (nodeCur.childNodes.length!=1) {
                        testSC = false;
                        break;
                    }
                    if (nodeCur.childNodes[0].nodeName == "#text" && nodeCur.childNodes[0].data != "") {
                        testSC = false;
                        break;
                    }
                    if (typeof nodeCur.childNodes[0].style === 'undefined') {
                        testSC = false;
                        break;
                    }
                    if (nodeCur.childNodes[0].style.backgroundColor !="rgb(255, 202, 143)") {
                        testSC = false;
                        break;
                    }
                }
            }
        }
        
        //--- variables de test pretes
        
        if ( (testRC1==true && testRC2==true) || testSC==true) {
            // remove latex format
            editor.formatText(range.start, range.end, {
                              'background': '',
                              });
        } else {
            // set latex format
           editor.formatText(range.start, range.end, {
               'background': 'rgb(255, 202, 143)',
           });
        }

        var taille = editor.getLength();

        if (taille == range.end + 1) {
            editor.insertText(range.end, " ");
            editor.setSelection(range.end + 1, range.end + 1);
        }
    }
    else {
        var ind = this.rechercheIndice(edit, this.listeEditeur);
        this.listeEditeur[ind].edit.focus();

        var range = this.listeEditeur[ind].edit.getSelection();

        // Test general de la configuration de la selection.
        // Si on selectionne uniquement un bout de formule deja tagge Latex, alors on le de-tagge
        // (enleve la propriete latex). Sinon, on tagge.
        // Test basé sur les propriétés de Range et DocumentFragment
        var rangeContent = window.getSelection().getRangeAt(0);
        
        // test si startContainer et endContainer contiennent la meme chaine de texte
        var testRC1 = false;
        if (rangeContent.endContainer.data == rangeContent.startContainer.data) {
            testRC1 = true;
        }
        
        var rangeStartContParentName = rangeContent.startContainer.parentNode.nodeName;
        var rangeEndContParentName = rangeContent.endContainer.parentNode.nodeName;
        
        // test si les conteneur start et end sont des span et qu'on est dans un span "latex"
        var testRC2 = false;
        if (rangeStartContParentName == "SPAN" && rangeEndContParentName == "SPAN") {
            var testLatexSpanBkgdColor = rangeContent.startContainer.parentNode.style.backgroundColor;
            if (testLatexSpanBkgdColor == "rgb(255, 202, 143)") testRC2 = true;
            
        }
        
        // test si le contenu de la selection est constitue de 3 Nodes
        // avec 1 ou 2 text nodes vides + test si le noeud parent est un span
        var selectionContents = rangeContent.cloneContents(); // extrait le contenu de la selection
        var testSC = true;
        for (var i=0;i<selectionContents.childNodes.length;i++) {
            nodeCur =selectionContents.childNodes[i];
            if (nodeCur.nodeName != "#text" && nodeCur.nodeName != "SPAN" && nodeCur.nodeName != "DIV") {
                testSC = false;
                break;
            }
            if (nodeCur.nodeName == "#text" && nodeCur.data != "") {
                testSC = false;
                break;
            }
            if (nodeCur.nodeName == "SPAN" && nodeCur.style.backgroundColor !="rgb(255, 202, 143)") {
                testSC = false;
                break;
            }
            if (nodeCur.nodeName == "DIV") {
                if (nodeCur.childNodes.length != 0) {
                    if (nodeCur.childNodes.length!=1) {
                        testSC = false;
                        break;
                    }
                    if (nodeCur.childNodes[0].nodeName == "#text" && nodeCur.childNodes[0].data != "") {
                        testSC = false;
                        break;
                    }
                    if (typeof nodeCur.childNodes[0].style === 'undefined') {
                        testSC = false;
                        break;
                    }
                    if (nodeCur.childNodes[0].style.backgroundColor !="rgb(255, 202, 143)") {
                        testSC = false;
                        break;
                    }
                }
            }
        }
        
        //--- variables de test pretes
        
        
        if ( (testRC1==true && testRC2==true) || testSC==true) {
            // remove latex format
            this.listeEditeur[ind].edit.formatText(range.start, range.end, {
                              'background': '',
                              });
        } else {
            // set latex format
            this.listeEditeur[ind].edit.formatText(range.start, range.end, {
                              'background': 'rgb(255, 202, 143)',
                              });
        }

        var taille = this.listeEditeur[ind].edit.getLength();

        if (taille == range.end + 1) {
            this.listeEditeur[ind].edit.insertText(range.end, " ");
            this.listeEditeur[ind].edit.setSelection(range.end + 1, range.end + 1);
        }
    }
}

//---------------------------------//

Ruche.prototype.etiqueterTexteEnCodeLibre = function (edit)
    /*
     * Fonction qui permet de déclarer du code libre (c'est à dire directement du OEF)
     * dans l'éditeur.
     * paramètre edit : vaut null si on est sur l'éditeur principal , non null si on est sur un éditeur secondaire
     */ {
    if (edit == null) {
        document.getElementById('ql-editor-1').focus();

        var range = editor.getSelection();

        // Test general de la configuration de la selection.
        // Si on selectionne uniquement un bout de code libre, alors on le de-tagge
        // (enleve la propriete code libre). Sinon, on tagge.
        // Test basé sur les propriétés de Range et DocumentFragment
        var rangeContent = window.getSelection().getRangeAt(0);
        
        // test si startContainer et endContainer contiennent la meme chaine de texte
        var testRC1 = false;
        if (rangeContent.endContainer.data == rangeContent.startContainer.data) {
            testRC1 = true;
        }
        
        var rangeStartContParentName = rangeContent.startContainer.parentNode.nodeName;
        var rangeEndContParentName = rangeContent.endContainer.parentNode.nodeName;
        
        // test si les conteneur start et end sont des span et qu'on est dans un span specifique
        var testRC2 = false;
        if (rangeStartContParentName == "SPAN" && rangeEndContParentName == "SPAN") {
            var testSpecificSpanBkgdColor = rangeContent.startContainer.parentNode.style.backgroundColor;
            if (testSpecificSpanBkgdColor == "rgb(252, 254, 142)") testRC2 = true;
            
        }
        
        // test si le contenu de la selection est constitue de 3 Nodes
        // avec 1 ou 2 text nodes vides + test si le noeud parent est un span
        var selectionContents = rangeContent.cloneContents(); // extrait le contenu de la selection
        var testSC = true;
        for (var i=0;i<selectionContents.childNodes.length;i++) {
            var nodeCur =selectionContents.childNodes[i];
            if (nodeCur.nodeName != "#text" && nodeCur.nodeName != "SPAN" && nodeCur.nodeName != "DIV") {
                testSC = false;
                break;
            }
            if (nodeCur.nodeName == "#text" && nodeCur.data != "") {
                testSC = false;
                break;
            }
            if (nodeCur.nodeName == "SPAN" && nodeCur.style.backgroundColor !="rgb(252, 254, 142)") {
                testSC = false;
                break;
            }
            if (nodeCur.nodeName == "DIV") {
                if (nodeCur.childNodes.length != 0) {
                    if (nodeCur.childNodes.length!=1) {
                        testSC = false;
                        break;
                    }
                    if (nodeCur.childNodes[0].nodeName == "#text" && nodeCur.childNodes[0].data != "") {
                        testSC = false;
                        break;
                    }
                    if (typeof nodeCur.childNodes[0].style === 'undefined') {
                        testSC = false;
                        break;
                    }
                    if (nodeCur.childNodes[0].style.backgroundColor !="rgb(252, 254, 142)") {
                        testSC = false;
                        break;
                    }
                }
            }
        }
        
        //--- variables de test pretes
        
        if ( (testRC1==true && testRC2==true) || testSC==true) {
            // remove specific format
            editor.formatText(range.start, range.end, {
                              'background': '',
                              });
        } else {
            // set specific format
            editor.formatText(range.start, range.end, {
                              'background': 'rgb(252, 254, 142)',
                              });
        }
        
//        editor.formatText(range.start, range.end, {
//            'background': 'rgb(252, 254, 142)',
//        });

        var txtlibre = editor.getText(range.start, range.end);

        var taille = editor.getLength();

        if (taille == range.end + 1) {
            editor.insertText(range.end, "\n");
            editor.setSelection(range.end + 1, range.end + 1);
        }
    }
    else {
        var ind = this.rechercheIndice(edit, this.listeEditeur);
        this.listeEditeur[ind].edit.focus();

        var range = this.listeEditeur[ind].edit.getSelection();

        // Test general de la configuration de la selection.
        // Si on selectionne uniquement un bout de code libre, alors on le de-tagge
        // (enleve la propriete code libre). Sinon, on tagge.
        // Test basé sur les propriétés de Range et DocumentFragment
        var rangeContent = window.getSelection().getRangeAt(0);
        
        // test si startContainer et endContainer contiennent la meme chaine de texte
        var testRC1 = false;
        if (rangeContent.endContainer.data == rangeContent.startContainer.data) {
            testRC1 = true;
        }
        
        var rangeStartContParentName = rangeContent.startContainer.parentNode.nodeName;
        var rangeEndContParentName = rangeContent.endContainer.parentNode.nodeName;
        
        // test si les conteneur start et end sont des span et qu'on est dans un span specifique
        var testRC2 = false;
        if (rangeStartContParentName == "SPAN" && rangeEndContParentName == "SPAN") {
            var testSpecificSpanBkgdColor = rangeContent.startContainer.parentNode.style.backgroundColor;
            if (testSpecificSpanBkgdColor == "rgb(252, 254, 142)") testRC2 = true;
            
        }
        
        // test si le contenu de la selection est constitue de 3 Nodes
        // avec 1 ou 2 text nodes vides + test si le noeud parent est un span
        var selectionContents = rangeContent.cloneContents(); // extrait le contenu de la selection
        var testSC = true;
        for (var i=0;i<selectionContents.childNodes.length;i++) {
            var nodeCur =selectionContents.childNodes[i];
            if (nodeCur.nodeName != "#text" && nodeCur.nodeName != "SPAN" && nodeCur.nodeName != "DIV") {
                testSC = false;
                break;
            }
            if (nodeCur.nodeName == "#text" && nodeCur.data != "") {
                testSC = false;
                break;
            }
            if (nodeCur.nodeName == "SPAN" && nodeCur.style.backgroundColor !="rgb(252, 254, 142)") {
                testSC = false;
                break;
            }
            if (nodeCur.nodeName == "DIV") {
                if (nodeCur.childNodes.length != 0) {
                    if (nodeCur.childNodes.length!=1) {
                        testSC = false;
                        break;
                    }
                    if (nodeCur.childNodes[0].nodeName == "#text" && nodeCur.childNodes[0].data != "") {
                        testSC = false;
                        break;
                    }
                    if (typeof nodeCur.childNodes[0].style === 'undefined') {
                        testSC = false;
                        break;
                    }
                    if (nodeCur.childNodes[0].style.backgroundColor !="rgb(252, 254, 142)") {
                        testSC = false;
                        break;
                    }
                }
            }
        }
        
        //--- variables de test pretes
        
        if ( (testRC1==true && testRC2==true) || testSC==true) {
            // remove specific format
            this.listeEditeur[ind].edit.formatText(range.start, range.end, {
                              'background': '',
                              });
        } else {
            // set specific format
            this.listeEditeur[ind].edit.formatText(range.start, range.end, {
                              'background': 'rgb(252, 254, 142)',
                              });
        }

        var taille = this.listeEditeur[ind].edit.getLength();

        if (taille == range.end + 1) {
            this.listeEditeur[ind].edit.insertText(range.end, "\n");
            this.listeEditeur[ind].edit.setSelection(range.end + 1, range.end + 1);
        }
    }
}

//---------------------------------//

Ruche.prototype.ajoutReponse = function ()
    /*
     * Appelé quand on appuie sur le bouton "Réponse" de l'éditeur.
     * Fonction qui permet d'ajouter une réponse dans l'éditeur.
     *
     */ {
    if (document.getElementById('Rid_Warning_No_Answer') != null) {
        document.getElementById('Rid_Warning_No_Answer').style.display = "none";
    }

    this.nb_reponse += 1; // On incrémente le nombre de réponses de l'exercice

    document.getElementById('ql-editor-1').focus();
    var range = editor.getSelection(); // position du curseur


    this.enonce.ajoutSpanRep(range);

    var rep = new Reponse(this.nb_reponse);
    this.listeReponse.push(rep);
    rep.ajoutRepDansAnalyse();
    rep.ajoutRepDansMenuListePreparation();
    rep.ajoutRepDansMenuListeAnalyse();
}

//---------------------------------//

Ruche.prototype.ajoutReponseEssaim = function (essaim)
    /*
     * Ajout d'un bloc réponse par un essaim dans l'analyse.
     * Fonction qui permet d'ajouter une réponse dans l'éditeur.
     * Paramètre(s) : 	- essaim : essaim gérant cette réponse.
     */ {
    $('#Rid_Warning_No_Answer').css('display', 'none'); // cache l'avertissement

    this.nb_reponse += 1; // On incrémente le nombre de réponses de l'exercice

    var rep = new Reponse(this.nb_reponse, essaim.nom);
    this.listeReponse.push(rep);
    rep.ajoutRepDansAnalyse();
    rep.ajoutRepDansMenuListePreparation();
    rep.ajoutRepDansMenuListeAnalyse();
}

//---------------------------------//

Ruche.prototype.ajoutReponseJSON = function (elem)
    /*
     * Appelé quand on charge les réponses d'une sauvegarde.
     * paramètre elem : élément JSON
     * gère aussi l'ajout d'une réponse "essaim"
     * elem.nom est de format "reponseXXX"
     *
     */ {
    $('#Rid_Warning_No_Answer').css('display', 'none'); // cache l'avertissement

    var numRepSauve = elem.nom.substring(7, elem.nom.length); // enlève le "reponse" et laisse le numero XXX

    if (numRepSauve > this.nb_reponse) {
        this.nb_reponse = Number(numRepSauve);
    }

    var rep = new Reponse(numRepSauve, elem.nomEssaimGerant);
    this.listeReponse.push(rep);
    rep.ajoutRepDansAnalyse();
    rep.ajoutRepDansMenuListePreparation();
    rep.ajoutRepDansMenuListeAnalyse();
    rep.charge(elem);
}

//---------------------------------//

Ruche.prototype.ajoutIfPreparation = function (data)
    /*
     * Fonction qui ajoute un bloc If dans la partie préparation
     * paramètre data : vaut quelque chose si le if est créé depuis une sauvegarde
     */ {

    this.nb_condition++;
    var c = new Condition(this.nb_condition, data);
    this.listeBlocPrepa.push(c);
    c.creerBloc();
}

//---------------------------------//

Ruche.prototype.ajoutForPreparation = function (data)
    /*
     * Fonction qui ajoute un bloc For dans la partie préparation
     * paramètre data : vaut quelque chose si le for est créé depuis une sauvegarde
     */ {
    this.nb_for++;
    var c = new BoucleFor(this.nb_for, data);
    this.listeBlocPrepa.push(c);
    c.creerBloc();
}

//---------------------------------//

Ruche.prototype.ajoutCodeLibrePreparation = function ()
    /*
     * Fonction qui ajoute un bloc code libre dans la partie préparation
     */ {
    this.nb_codeLibre++;
    var c = new CodeLibrePrepa(this.nb_codeLibre);
    this.listeBlocPrepa.push(c);
    c.creerBloc();
}

//---------------------------------------------//
Ruche.prototype.toutReduire = function ()
/* fonction qui permet de réduire tous les blocs 
*/ 
{
    for (i=0 ; i < this.listeBlocPrepa.length; i++)
    {
        this.listeBlocPrepa[i].reduireBloc();
    }
}
//---------------------------------//
Ruche.prototype.toutAgrandir = function ()
/* fonction qui permet de réduire tous les blocs 
*/ 
{
    for (i=0 ; i < this.listeBlocPrepa.length; i++)
    {
        this.listeBlocPrepa[i].agrandirBloc();
    }
}
//---------------------------------//

Ruche.prototype.ajoutBlocEssaim = function (ClasseDeriveeEssaim, elemRecup)
    /*
     * Fonction qui ajoute un bloc Essaim dans la partie préparation
     * paramètres :     - ClasseDeriveeEssaim = classe dérivée de la classe Essaim (sic!)
     *                  - elemRecup = objet Essaim récupéré dans une sauvegarde
     */ {
    if (typeof elemRecup != 'undefined') {
        // Création d'une classe essaim à partir d'une sauvegarde
        if (elemRecup.numero > this.nb_essaim) {
            this.nb_essaim = elemRecup.numero;
        }
        var c = new ClasseDeriveeEssaim(elemRecup.numero);
        this.listeBlocPrepa.push(c);
        c.creerBloc(elemRecup);
        c.chargeEtat(elemRecup);
    }
    else {
        this.nb_essaim++;
        var c = new ClasseDeriveeEssaim(this.nb_essaim);
        this.listeBlocPrepa.push(c);
        c.creerBloc();
    }
}

//---------------------------------//

Ruche.prototype.ajoutCodeLibreAnalyse = function ()
    /*
     * Fonction qui ajoute un bloc "code libre" dans l'onglet analyse
     */ {

    this.nb_repcodelibre += 1;
    var libre = new repLibre(this.nb_repcodelibre);
    libre.creerBloc();
    this.listeBlocAnalyse.push(libre);

}

//---------------------------------//

Ruche.prototype.ajoutConditionAnalyse = function ()
    /*
     * Fonction qui ajoute un bloc condition dans l'onglet analyse
     */ {

    this.nb_repcondition += 1;
    var cond = new repCondition(this.nb_repcondition);
    cond.creerBloc();
    this.listeBlocAnalyse.push(cond);
}

//---------------------------------//

Ruche.prototype.ajoutAideAnalyse = function ()
    /*
     * Fonction qui ajoute un bloc aide dans l'onglet analyse
     */ {

    this.nb_repaide += 1;
    var aide = new repAide(this.nb_repaide);
    aide.creerBloc();
    this.listeBlocAnalyse.push(aide);
}

//---------------------------------//

Ruche.prototype.ajoutFeedbackAnalyse = function ()
    /*
     * Fonction qui ajoute un bloc feedback dans l'onglet analyse
     */ {
    this.nb_repfeedback += 1;
    var feedback = new repFeedback(this.nb_repfeedback);
    feedback.creerBloc();
    this.listeBlocAnalyse.push(feedback);
}

//---------------------------------//

Ruche.prototype.ajoutIndicationAnalyse = function ()
    /*
     * Fonction qui ajoute un bloc indication dans l'onglet analyse
     */ {
    this.nb_repindication += 1;
    var indication = new repHint(this.nb_repindication);
    indication.creerBloc();
    this.listeBlocAnalyse.push(indication);
}

//---------------------------------//

//------------------------------------------------------//
// ********** Suppression de variables/blocs ********** //
//------------------------------------------------------//

Ruche.prototype.supprVariable = function (nomVar)
    /*
     * Fonction qui supprime une variable du tableau.
     * Paramètre(s) : 	- nomVar : variable à supprimer.
     */ {

    var indice = this.rechercheIndice(nomVar, this.listeVariables);

    this.supprimeBlocHtml(this.listeVariables[indice].nom);
    this.supprVarDansEditeur(nomVar);
    this.supprVarDuMenuListePreparation(nomVar);
    this.supprVarDuMenuListeAnalyse(nomVar);
    this.listeVariables.splice(indice, 1);

}

//---------------------------------//

Ruche.prototype.supprVariableJson = function (nomVar)
    /*
     * Fonction qui supprime une variable du tableau.
     * Paramètre(s) : 	- nomVar : variable à supprimer.
     */ {
    this.supprimeBlocHtml(nomVar);
    this.supprVarDansEditeur(nomVar);
    this.supprVarDuMenuListePreparation(nomVar);
    this.supprVarDuMenuListeAnalyse(nomVar);
}

//---------------------------------//

Ruche.prototype.supprVarDansEditeur = function (selection)
    /*
     * Fonction qui supprime une variable de l'éditeur.
     * Paramètre(s) : 	- selection : variable à supprimer.
     */ {
    var fini = false;
    var tabVar = document.getElementsByClassName("Rcl_Variable_In_Editor_" + selection);

    if (tabVar.length == 0) {
        fini = false;
        return;
    }

    // Tant qu'il reste une variable non supprimée, on continue
    while (!fini) {
        span = tabVar[0];
        pere = span.parentNode;
        pere.remove();

        tabVar = document.getElementsByClassName("Rcl_Variable_In_Editor_" + selection);

        if (tabVar.length == 0) {
            fini = false;
            return;
        }
    }

}

//---------------------------------//

Ruche.prototype.supprVarDuMenuListePreparation = function (selection)
    /*
     * Fonction qui supprime une variable de la liste des variables "draggables".
     * Paramètre(s) : 	- selection : variable à supprimer.
     */ {

    var divVar = document.getElementById("Rid_Prep_Vars");
    var div = document.getElementById("RidPrVa_" + selection);

    if (div != null) {
        divVar.removeChild(div);
    }
}

//---------------------------------//

Ruche.prototype.supprVarDuMenuListeAnalyse = function (selection)
    /*
     * Fonction qui supprime une variable du tableau des variables "draggables".
     * Paramètre(s) : 	- selection : variable à supprimer.
     */ {
    var divVar = document.getElementById("Rid_Analyse_Vars");
    var div = document.getElementById("RidAnVa_" + selection);

    if (div != null) {
        divVar.removeChild(div);
    }
}

//---------------------------------//

Ruche.prototype.supprimeBlocHtml = function (varRemove)
    /*
     * Fonction qui supprime le bloc correspond à la variable dans les onglets.
     *
     * Paramètre(s) : 	- varRemove : nom de variable qui permettra de retrouver le bloc à supprimer.
     */ {

    if (document.getElementById("RidEnVa_" + varRemove) != null) {
        document.getElementById("RidEnVa_" + varRemove).remove();
    }

    if (document.getElementById("RidPrBloc_" + varRemove) != null) {
        document.getElementById("RidPrBloc_" + varRemove).remove();
    }

    if (document.getElementById("RidAnBlocRep_" + varRemove) != null) {
        document.getElementById("RidAnBlocRep_" + varRemove).remove();
    }

    // Supprime les blocs dont l'id est juste le nom de la variable.
    // Pour le moment, concerne juste les images dans l'éditeur principal
    if (document.getElementById(varRemove) != null) {
        document.getElementById(varRemove).remove();
    }


}

//---------------------------------//

Ruche.prototype.supprReponse = function (id)
    /*
     * Suppression d'une réponse
     * parametres - id : id de la réponse à supprimer, de la forme "RidAnBlocRep_reponseXXXX"
     */ {

    //id correspond à "RidAnBlocRep_"+nom de la réponse
    var variable = id.slice("RidAnBlocRep_".length, id.length);	// on supprime le "RidAnBlocRep_" pour récupérer le "reponseXXX"...

    // supprime l'éditeur intégré à la réponse (c'est le même pour tous les types
    // à changer lorsqu'on considèrera les spécificités de chaque type de réponse
    var indice_edit = this.rechercheIndice("RidAnBlocRep_Chaine_Analyse_" + variable, this.listeEditeur);
    if (indice_edit != -1) {
        this.listeEditeur.splice(indice_edit, 1);
    }

    // supprime la réponse dans la liste des réponses
    var indice = this.rechercheIndice(variable, this.listeReponse);
    this.listeReponse.splice(indice, 1);

    // supprime le bloc html
    var idBlocRepAnalyse = "#" + id;
    $(idBlocRepAnalyse).remove();  // détruit le bloc

    // supprime l'image si elle existe dans l'éditeur principal
    $("img#" + variable).remove();

    // remet l'avertissement si plus de réponse
    if (this.listeReponse.length == 0) {
        $("#Rid_Warning_No_Answer").css('display', 'inline-block');
    }

    this.verifReponse();
}

//---------------------------------//

Ruche.prototype.supprRepDansEditeur = function (repRemove)
    /*
     * Fonction qui supprime la span de la réponse dans l'éditeur.
     * parametre : repRemove : id de la réponse à supprimer dans l'éditeur
     *
     */ {
    document.getElementById('ql-editor-1').focus();
    document.getElementById(repRemove).remove();
}

//---------------------------------//

Ruche.prototype.supprInstruction = function (nomVar, tab)
    /*
     * Fonction qui supprime un bloc et l'enlève du tableau.
     * Paramètre(s) : 	- nomVar : instruction à supprimer.
     */ {

    var indice = this.rechercheIndice(nomVar, tab);
    this.supprimeBlocHtml(tab[indice].nom);
    tab.splice(indice, 1);

}

//---------------------------------//

Ruche.prototype.supprBlocAutreAnalyse = function (id)
    /*
     * Fonction qui supprime un bloc de type autre ( bloc condition/aide/feedback/indication ) de l'onglet analyse
     */ {

    var indice = this.rechercheIndice(id, this.listeBlocAnalyse);
    document.getElementById(id).remove();
    this.listeBlocAnalyse.splice(indice, 1);

}

//---------------------------------//

//------------------------------------------------------------------------------//
// ********** Vérifications-Nettoyages lors d'un changement d'onglet ********** //
//------------------------------------------------------------------------------//

Ruche.prototype.verifReponse = function ()
    /*
     * Fonction qui vérifie sur une réponse a été supprimée depuis l'éditeur
     */ {
    this.supprVariablesRepDansMenuListe(); // Efface les variables "replyXXX"
    this.nettoieListeReponses();
    this.reordonneReponsesAnalyse();
    this.ajoutVariablesRepDansMenuListe(); // Reconstruit les variables "replyXXX"
}

//---------------------------------//

Ruche.prototype.supprVariablesRepDansMenuListe = function ()
    /*
     * Fonction qui supprime les réponses des listes de variable dans l'onglet analyse et préparation ( liste sur la droite )
     */ {
    $("[id^=RidPrVa_reponse]").remove();
    $("[id^=RidAnVa_reponse]").remove();
}

//---------------------------------//

Ruche.prototype.nettoieListeReponses = function ()
    /*
     * Nettoyage de la liste des réponses.
     * Si l'image d'une réponse est supprimée dans l'éditeur, supprime cette réponse dans la liste des réponses et son bloc dans l'analyse
     */ {
    for (var i = 0; i < rucheSys.listeReponse.length; i++) {
        var idImgRepEditeur = "#" + rucheSys.listeReponse[i].idt;
        var idBlocRepAnalyse = "#RidAnBlocRep_" + rucheSys.listeReponse[i].idt;
        if ($(idImgRepEditeur).length == 0) {
            rucheSys.listeReponse.splice(i, 1); // enlève réponse de la liste de réponses
            $(idBlocRepAnalyse).remove();  // détruit le bloc
            i--; // on a détruit une réponse, le tableau a une longueur plus petite
        }
    }
    // remet l'avertissement si plus de réponse
    if (this.listeReponse.length == 0) {
        $("#Rid_Warning_No_Answer").css('display', 'inline-block');
    }

}

//---------------------------------//

Ruche.prototype.reordonneReponsesAnalyse = function ()
    /*
     * Reordonne les blocs réponse présents dans l'onglet "Analyse"
     * en fonction de leur emplacement dans l'éditeur principal
     */ {
    var listeImgRepEditeur = $("img[id^=reponse]");
    for (i = 0; i < listeImgRepEditeur.length; i++) {
        var nomRep = listeImgRepEditeur[i].id; // id (et numéro) de la réponse : reponseXXXX
        $("#Rid_Analyse_Blocs_Reponses").append($("#RidAnBlocRep_" + nomRep));    // déplace le bloc à la fin des blocs réponse de l'analyse. A la fin de la boucle, tous les blocs sont bien mis
    }

    // Réordonne les noms apparents dans les blocs
    var listePRepAnalyse = $("[id^=p_reponse]");
    for (i = 0; i < listePRepAnalyse.length; i++) {
        // Récupère l'index (le numéro d'ordre) du "li" dans la liste des blocs de réponse
        var indBlocRep = listePRepAnalyse.eq(i).parent().parent().index();
        listePRepAnalyse.eq(i).html("Reponse" + (indBlocRep + 1) + " : "); // change le nom de la réponse pour que l'utilisateur ne s'embrouille pas. L'ordre dans l'énoncé correspond à l'ordre dans le bloc analyse.
    }
}

//---------------------------------//

Ruche.prototype.ajoutVariablesRepDansMenuListe = function ()
    /*
     * Fonction qui ajoute les variables représentant les réponses ("replyXXX")
     * dans les listes de variable des onglets analyse et préparation ( liste sur la droite )
     */ {

    //Boucle qui réécrit les reponses dans la colonne des variables
    for (var i = 0; i < this.listeReponse.length; i++) {
        this.listeReponse[i].ajoutRepDansMenuListePreparation();
        this.listeReponse[i].ajoutRepDansMenuListeAnalyse();

    }
}

//---------------------------------//

//-------------------------------------------------------//
// ************** Génération du code OEF *************** //
//-------------------------------------------------------//


Ruche.prototype.genereCode = function ()
    /*
     * Appelé lorsqu'on appuie sur le bouton "Prévisualiser".
     * Fonction qui permet de générer le code OEF.
     *
     */ {
    $('#Rcl_Code_Genere').remove();

    var code = document.createElement('textarea');
    code.id = 'Rcl_Code_Genere';

    var principal = document.getElementById('Rid_Contenu_Onglet_Previsu');
    principal.appendChild(code);


    this.entete.recupDonnees();
    this.enonce.recupDonnees();
    var l_v = "";
    var l_r = "";
    var l_c = "";
    var l_f = "";
    var l_a = "";
    var elements = "";

    for (var i = 0; i < this.listeBlocPrepa.length; i++) {
         
        elements += this.listeBlocPrepa[i].toOEF();
        
        console.log("Liste "+i+" : "+this.listeBlocPrepa[i].hidden);
    }


    /********************/
    // Récupère l'ordre des réponses à partir de l'ordre dans l'éditeur principal
    var repEditeur = $("img[id^=reponse]");
    for (var i = 0; i < repEditeur.length; i++) {
        var ind = this.rechercheIndice(repEditeur[i].id, this.listeReponse)
        l_r += this.listeReponse[ind].toOEF();
    }

    /********************/

    for (var i = 0; i < this.listeBlocAnalyse.length; i++) {
        l_a += this.listeBlocAnalyse[i].toOEF();
    }

    var code = this.entete.toOEF() + elements + this.enonce.toOEF() + l_r + l_a;

    $('#Rcl_Code_Genere')[0].innerHTML = code;


}

//-------------------------------------------------------------//
// ***** Sauvegarde/Chargement des données de l'éditeur *****
//-------------------------------------------------------------//

Ruche.prototype.reset = function (elem)
    /*
     * Fonction qui remet a zéro la ruche avant un chargement
     */ {
    for (var i = 0; i < this.listeBlocPrepa.length; i++) {
        // Teste si l'élément de la liste ordonnée est un essaim de type connu
        var essaimTrouve = false;
        for (var j = 0; j < this.listeClasseEssaim.length; j++) {
            if (this.listeBlocPrepa[i].proto == this.listeClasseEssaim[j].prototype.proto) {
                // On a trouvé le bon type, fait la destruction
                this.listeBlocPrepa[i].detruitBloc();
                essaimTrouve = true;
                i--;  // On enlève l'élément de la liste, donc revient en arrière pour l'indice
                break;
            }
        }

        // Si pas un essaim, le détruit
        if (!(essaimTrouve)) {
            this.supprimeBlocHtml(this.listeBlocPrepa[i].nom);
            if (this.listeBlocPrepa[i].proto == "Variable") {
                this.supprVarDuMenuListePreparation(this.listeBlocPrepa[i].nom);
                this.supprVarDuMenuListeAnalyse(this.listeBlocPrepa[i].nom);
            }
        }
    }

    // Supprime les blocs
    for (var i = 0; i < this.listeReponse.length; i++) {
        this.supprimeBlocHtml(this.listeReponse[i].nom);
    }

    for (var i = 0; i < this.listeBlocAnalyse.length; i++) {
        this.supprimeBlocHtml(this.listeBlocAnalyse[i].nom)
    }

    this.listeBlocPrepa.splice(0, this.listeBlocPrepa.length);
    this.listeReponse.splice(0, this.listeReponse.length);
    this.listeVariables.splice(0, this.listeVariables.length);  // liste de toutes les variables de l'utilisateur.
    this.listeEditeur.splice(0, this.listeEditeur.length);			// liste de tous les éditeurs du site.
    //		this.listeCondition.splice(0,this.listeCondition.length);		// liste de toutes les conditions.
    //		this.listeBoucleFor.splice(0,this.listeBoucleFor.length);		// liste de toutes les boucles for.
    this.listeBlocAnalyse.splice(0, this.listeBlocAnalyse.length);

    this.listeBlocPrepa_sauve = null;

    this.nb_reponse = 0;
    this.nb_condition = 0;
    this.nb_for = 0;
    this.nb_essaim = 0;
    this.nb_imageEssaim = 0;
    this.nb_imageVariable = 0;
    this.nb_repcodelibre = 0;
    this.nb_repcondition = 0;
    this.nb_repaide = 0;
    this.nb_codeLibre = 0;
    this.nb_repfeedback = 0;
    this.nb_repindication = 0;
}

//---------------------------------//

Ruche.prototype.prepareSauvegarde = function ()
    /*
     * Préparation de la sauvegarde. Sauve l'état des interfaces.
     * Les interfaces ne sont pas sauvegardées, seul l'est l'objet système.
     * L'état des interfaces est sauvegardé dans les objets eux-mêmes.
     * Pas la peine pour les éditeurs, leur contenu est sauvé par ailleurs.
     */ {
    // Sauve l'état des options des réponses
    for (var i = 0; i < this.listeReponse.length; i++) {
        if (this.listeReponse[i].format != null) {
            if (this.listeReponse[i].format.typ == "Essaim") {
                this.listeReponse[i].format.sauveEtatInterface();
            }
            else if (typeof this.listeReponse[i].format.statusOptionsCheck == "function") {
                this.listeReponse[i].format.statusOptionsCheck();
            }
        }
    }

    // Sauve l'état de l'interface des essaims
    for (var i = 0; i < this.listeBlocPrepa.length; i++) {
        if (typeof this.listeBlocPrepa[i].estUnEssaim != 'undefined') {
            this.listeBlocPrepa[i].sauveEtatInterface();
        }
    }

}

//---------------------------------//

Ruche.prototype.sauvegarde = function ()
    /*
     * Fonction qui effectue la sauvegarde de l'objet ruche
     */ {
    this.genereCode();
    this.prepareSauvegarde(); // Prépare certains objets pour la sauvegarde
    var seen = [];
    var objetRuche = this;
	 
    var json = JSON.stringify(objetRuche, function (key, val) {
        if (val != null && typeof val == "object") {
            if (seen.indexOf(val) >= 0) {
                return;
            }

            val.edit = "null";
            seen.push(val);
        }

        // liste noire d'objets qu'il est inutile de sauver
        // à transformer (plus tard) en liste blanche
        // ces objets ne sont de toute façon pas sauvés pour le moment.

        if (key == "divBloc") {
            return;
        }
        if (key == "buttonSuppr") {
            return;
        }
        if (key == "buttonWindow") {
            return;
        }
        if (key == "buttonHaut") {
            return;
        }
        if (key == "buttonBas") {
            return;
        }

	return val;

    }, 6);
    document.getElementById("Rid_Zone_Sauvegarde").value = json;
    this.charge();
    $(".Rcl_OK_Light_SaveLoad").css("visibility", "visible");
    setTimeout(function () {
        $(".Rcl_OK_Light_SaveLoad").css("visibility", "hidden")
    }, 300);
    // local storage
    var local = store.existLocal("json", json);
    if(local){
        store.local("json", json)
    }
};


//---------------------------------//


Ruche.prototype.charge = function ()
    /*
     * Fonction qui charge tous les éléments de l'objet JSON donné par l'utilisateur
     */ {

    var txt = store.local("json") || document.getElementById("Rid_Zone_Sauvegarde").value;
    $("#Rid_Zone_Sauvegarde").html(txt);
    if (txt != "") {
        var errorJSON = false;
        try {
            var json = JSON.parse(txt);
        }
        catch (e) {
            alert("Ereur de format dans le fichier de sauvegarde (erreur JSON)");
            errorJSON = true;
        }
        if (!errorJSON) {
            editor.deleteText(0, editor.getLength());
            this.reset(json);
            editor.setHTML(json.enonce.enonce_Html_sauve);
            this.entete.charge(json.entete);
            this.chargerElementAnalyse(json.listeBlocAnalyse);
            this.chargerInstructionVar(json); // A faire AVANT les réponses (à cause des Essaims)
            this.chargerReponses(json.listeReponse);
            this.reloadEditors(json.listeEditeur);
            this.modifieVarJson();
        }
	console.log(json);
    }

    $(".Rcl_OK_Light_SaveLoad").css("visibility", "visible");
    setTimeout(function () {
        $(".Rcl_OK_Light_SaveLoad").css("visibility", "hidden")
    }, 300);
}

//---------------------------------//

Ruche.prototype.modifieVarJson = function ()
    /*
     * Fonction qui redéfinit la span de la variable après chargement
     */ {

    // Ajout la fonction de suppression de variable dans les petits editeur
    var edit = document.getElementById("ql-editor-1");
    for (var i = 0; i < this.listeVariables.length; i++) {
        selection = this.listeVariables[i].nom;
        var tabVar = document.getElementsByClassName("Rcl_Variable_In_Editor_" + selection);
        var span;
        var pere;

        for (var j = 0; i < tabVar.length; i++) {
            span = tabVar[i];

            span.addEventListener("keydown", function (event) {

                    var key = event.keyCode || event.which;

                    if (key == 46 || key == 8) {
                        event.target.parentNode.removeChild(event.target);

                    }
                    else {
                        event.preventDefault();
                        return false;
                    }

                }
                , false
            );


        }
    }


    // Ajout la fonction de suppression de variable dans l'editeur principal
    var edit = document.getElementById("ql-editor-1");
    for (var i = 0; i < this.listeVariables.length; i++) {
        selection = this.listeVariables[i].nom;
        var tabVar = edit.getElementsByClassName("Rcl_Variable_In_Editor_" + selection);
        var span;
        var pere;

        for (var j = 0; i < tabVar.length; i++) {
            span = tabVar[i];

            span.addEventListener("keydown", function (event) {

                    var key = event.keyCode || event.which;

                    if (key == 46 || key == 8) {
                        event.target.parentNode.removeChild(event.target);
                        var nomVar = event.target.textContent;

                        var edit = document.getElementById("ql-editor-1");
                        var tabVar = edit.getElementsByClassName("Rcl_Variable_In_Editor_" + nomVar);

                        if (tabVar.length == 0) {
                            var nomVar = event.target.textContent;
                            var indice = rucheSys.rechercheIndice(nomVar, rucheSys.listeVariables);

                            rucheSys.supprimeBlocHtml(rucheSys.listeVariables[indice].nom);
                            rucheSys.supprVarDansEditeur(nomVar);
                            rucheSys.supprVarDuMenuListePreparation(nomVar);
                            rucheSys.supprVarDuMenuListeAnalyse(nomVar);
                            rucheSys.listeVariables.splice(indice, 1);

                            indice = rucheSys.rechercheIndice(nomVar, rucheSys.listeBlocPrepa);
                            rucheSys.listeBlocPrepa.splice(indice, 1);

                        }

                    }
                    else {
                        event.preventDefault();
                        return false;
                    }

                }
                , false
            );

        }
    }

}

//---------------------------------//

Ruche.prototype.chargerInstructionVar = function (elem)
    /*
     * Fonction qui charge toutes les instructions ( variables/if/for/codelibre )
     * parametre : elem : objet JSON contenant l'objet ruche
     */ {
    for (var i = 0; i < elem.listeBlocPrepa.length; i++) {

        // Teste si l'élément chargé de la liste ordonnée est un essaim de type connu
        var essaimTrouve = false;
        for (var j = 0; j < this.listeClasseEssaim.length; j++) {
            if (elem.listeBlocPrepa[i].proto == this.listeClasseEssaim[j].prototype.proto) {
                // On a trouvé le bon type, fait le chargement
                this.ajoutBlocEssaim(this.listeClasseEssaim[j], elem.listeBlocPrepa[i]);
                essaimTrouve = true;
            }
        }

        // Teste les autres types d'éléments
        if (essaimTrouve == false) {
            switch (elem.listeBlocPrepa[i].proto) {
                case "Variable":
                    this.ajoutVariableJSON(elem.listeBlocPrepa[i], elem.listeEditeur);
                    break;

                case "Condition":
                    this.ajoutIfPreparation(elem.listeBlocPrepa[i].nom);
                    break;

                case "BoucleFor":
                    this.ajoutForPreparation(elem.listeBlocPrepa[i].nom);
                    break;

                case "CodeLibre":
                    this.ajoutCodeLibrePreparation(elem.listeBlocPrepa[i].nom);
                    break;

                default:
                    console.log("Erreur chargement instruction/variables");
                    break;

            }
        }
    }
}

//---------------------------------//

Ruche.prototype.chargerReponses = function (elem)
    /*
     * Fonction qui permet de charger les réponses
     * parametre elem : objet JSON contenant la liste des réponses de la ruche
     */ {
    for (var i = 0; i < elem.length; i++) {
        this.ajoutReponseJSON(elem[i]);
    }
}

//---------------------------------//

Ruche.prototype.chargerElementAnalyse = function (elem)
    /*
     * Fonction qui charge tous les éléments de l'onglet analyse autre que des réponses.
     * parametre elem : objet JSON contenant la listeBlocAnalyse de la ruche
     */ {
    for (var i = 0; i < elem.length; i++) {
        switch (elem[i].proto) {
            case "repLibre":
                this.ajoutCodeLibreAnalyse();
                break;

            case "repCondition":
                this.ajoutConditionAnalyse();
                break;

            case "repAide":
                this.ajoutAideAnalyse();
                break;

            case "repfeedback":
                this.ajoutFeedbackAnalyse();
                break;

            case "repHint":
                this.ajoutIndicationAnalyse();
                break;

            default:
                console.log("Erreur chargement element analyse");
                break;
        }
    }
}

//---------------------------------//

Ruche.prototype.reloadEditors = function (elem)
    /*
     * Fonction qui recharge tous les éditeurs de type QUILL présent dans la liste d'éditeur de la ruche.
     * parametre elem : objet JSON contenant la liste d'éditeurs de la ruche.
     */ {
    for (var i = 0; i < elem.length; i++) {
        var indice = this.rechercheIndice(elem[i].nom, this.listeEditeur);
        if (indice != -1) {
            this.listeEditeur[indice].edit.setHTML(elem[i].enonce_Html_sauve);
        }
    }
}

//-------------------Gestion des fonctions concernant la liste de bloc Prepa -----------------------//

//Ruche.prototype.recherche
Ruche.prototype.rechercheIndBlocPrepa = function (id)
    /*
     * Retourne l'indice de la variable dans le tableau.
     * Paramètre(s) : 	- id : variable à rechercher.
     */ {
    var ind = -1;
    var tab=rucheSys.listeBlocPrepa;
    for (var i = 0; i < tab.length; i++) {
        if (tab[i].nom == id) {
            ind = i;
        }
    }
    return ind;
}




//------------ GLOBAL -----------//


$(document).ready(function () {
    rucheSys = new Ruche();
});

/* Fonction gérant le bloc dans les blocs */

integrerBlocDansBloc = function(idBlocDrop,idEditeur)
/* Cette méthode permet d'intégrer un bloc dans un autre bloc
INPUT : 
idEditeur = id de l'éditeur sur lequel l'objet this a été droppé
*/
{
    
    
    console.log('Dans la fonction blocDansBloc');
    //On extrait toutes les données nécessaires à la chose
    var BlocIntegre = document.getElementById(idBlocDrop);//On récupère l'objet à intégrer à partir de l'id
    
    var cibleEstUnFor = idEditeur.indexOf("for");
    var cibleEstUnAlors = idEditeur.indexOf("condT");
    var cibleEstUnSinon = idEditeur.indexOf("condF");
    
    if(cibleEstUnFor>-1) // si l'éditeur est contenu par un bloc for
        {
            console.log("La cible est un for");
            var numBlocRecepteur=idEditeur.replace("forInstructionfor",""); // On garde juste le numéro du bloc si c'est un bloc for
            console.log("Numéro de bloc :",numBlocRecepteur);
            // On va rechercher l'objet bloc auxquel appartient l'éditeur
            var idBlocRecepteur = "RidPrBloc_for" + numBlocRecepteur;
            console.log("Bloc obtenu : ",idBlocRecepteur);
            
            
            
            
            
            BlocRecepteur = document.getElementById(idBlocRecepteur); //on récupère l'objet bloc qui correspond au bon id
            console.log("(confirmation) : " + BlocRecepteur.id);
            var numIndRec=rucheSys.rechercheIndBlocPrepa("for"+numBlocRecepteur);
            alert(BlocRecepteur.id+numIndRec);
            var numIndDrop=idBlocDrop.replace("RidPrBloc_","");
            numIndDrop=numIndDrop.replace("condTcondition","");
            numIndDrop = rucheSys.rechercheIndBlocPrepa(numIndDrop);
            /* 6ème approche : par tableauBlocPrepa */
            console.log("Num bloc droppé : "+numIndDrop);
            
            rucheSys.listeBlocPrepa[numIndRec].integrerBlocDansBloc(rucheSys.listeBlocPrepa[numIndDrop],idBlocDrop);
            
            
            
            /* 2e tentative objet */
           // BlocRecepteur.integrerBlocDansBloc(idBlocDrop,idEditeur);
            
            
            
            var txtInfo="Contient le bloc [<b>"+ idBlocRecepteur+"</b>]";
            
            // On va intégrer le nom du bloc posé sur le bloc qu'on viens de récupérer
             
            console.log("id indic modifié : indicAppartenancefor"+numBlocRecepteur);
            /*document.getElementById("indicAppartenancefor1").innerHTML=txtInfo;
        
            // On va maintenant afficher dans le bloc qu'on viens d'insérer un champs tete spécifiant qu'il a été intégré dans un autre bloc
            
            txtInfo="Est contenu dans le bloc [<b>"+idBlocRecepteur+"</b>]";
            
            txtInfo="Code contenu : "+ BlocRecepteur.innerHTML.replace(/<button.*<\/button>/,""); //on copie le code html du for dans le bloc recepteur
            /* On va modeler le code html pour qu'il affice correctement de bloc interne */
            
            /*txtInfo="<div class='BlocInterieur'>"+txtInfo+"</div>";
            document.getElementById("dansBloc_"+idBlocDrop).innerHTML=txtInfo;
            
            //On doit maintenant détruire le bloc existant en l'enlevant de la liste des blocs.
            liste=document.getElementById("RidPrBloc_"+BlocRecepteur.nom);
            var n = liste.id.slice("RidPrBloc_".length,liste.id.length);*/
			//rucheSys.supprInstruction(n,rucheSys.listeBlocPrepa);
            
            
            /*======================================================================
            Autre stratégie : on utilise un emplacement spécialement prévu à cet effet dans l'objet
            ========================================================================*/
            /*var nomBlocIntegre = BlocRecepteur.nom;
            
            console.log("Bloc Intégré = "+BlocIntegre);
            
            var codeVisuel; //le code que l'on va intégrer dans le code pour le visuel
            
            console.log("Bloc Recepteur : "+BlocRecepteur);
            console.log("Numéro de bloc :",numBlocRecepteur);
        
        
            BlocIntegre.hidden = true; // on rend le blocIntegre invisible.
            //BlocIntegre.setAttribute(hidden,true);
            console.log("BLOC INTEGRE DOIT ETRE TRUE : "+BlocIntegre.hidden);
            /*ETAPE COURANTE*/
            
            
            
            
            /*BlocRecepteur.blocLie =BlocIntegre;
            //BlocRecepteur.setblocLie(BlocIntegre);
            console.log("Bloc contenu dans "+BlocRecepteur+" : "+BlocRecepteur.blocLie.id);
            codeVisuel = BlocRecepteur.blocLie.innerHTML.replace(/<button.*<\/button>/,"");
            codeVisuel = "<div class='BlocInterieur'>"+codeVisuel+"</div>";
            
            console.log("Code visuel = "+codeVisuel);
            document.getElementById("indicAppartenancefor"+numBlocRecepteur).innerHTML=codeVisuel;
            
        
            document.getElementById("dansBloc_"+numBlocRecepteur).innerHTML=txtInfo;
            
            //BlocIntegre.innerHTML.replace(/<div.*<\/div>,"");
            BlocIntegre.innerHTML=" ";
            
            
            
        
            // Et enfin, intégrer l'encapsulation au sein même du code. 
            */

            
        }
    else if(cibleEstUnAlors>-1)
        {
            console.log("La cible est un alors");
            var numBlocRecepteur=idEditeur.replace("forInstructionfor",""); // On garde juste le numéro du bloc si c'est un bloc for
            console.log("Numéro de bloc :",numBlocRecepteur);
            // On va rechercher l'objet bloc auxquel appartient l'éditeur
            var idBlocRecepteur = "RidPrBloc_condition" + numBlocRecepteur;
            console.log("Bloc obtenu : ",idBlocRecepteur);
            
            
            BlocRecepteur = document.getElementById(idBlocRecepteur); //on récupère l'objet bloc qui correspond au bon id
            console.log("(confirmation) : " + BlocRecepteur.id);
            var txtInfo="Contient le bloc [<b>"+ idBlocRecepteur+"</b>]";
            
            // On va intégrer le nom du bloc posé sur le bloc qu'on viens de récupérer
             
            console.log("id indic modifié : indicAppartenancefor"+numBlocRecepteur);
            document.getElementById("indicAppartenancefor1").innerHTML=txtInfo;
        
            // On va maintenant afficher dans le bloc qu'on viens d'insérer un champs tete spécifiant qu'il a été intégré dans un autre bloc
            
            txtInfo="Est contenu dans le bloc [<b>"+idBlocRecepteur+"</b>]";
            
            txtInfo="Code contenu : "+ BlocRecepteur.innerHTML.replace(/<button.*<\/button>/,""); //on copie le code html du for dans le bloc recepteur
            
            document.getElementById("dansBloc_"+idBlocDrop).innerHTML=txtInfo;
            
            //On doit maintenant détruire le bloc existant en l'enlevant de la liste des blocs.
            liste=document.getElementById("RidPrBloc_"+BlocRecepteur.nom);
            var n = liste.id.slice("RidPrBloc_".length,liste.id.length);
			rucheSys.supprInstruction(n,rucheSys.listeBlocPrepa); 
        }
    
    idEditeur.replace("#condTCondition",""); //On garde le numéro du bloc si c'est un bloc de condition, dans l'emplacement
    
    
    var nomBlocRecepteur= document.getElementById(idEditeur);
    
    
        
    // On va rechercher l'objet bloc auxquel appartient l'éditeur
        
    // On va intégrer le nom du bloc posé sur le bloc qu'on viens de récupérer
        
      // blocCible.div_fils.appendChild(nomBlocIntegre);
        
    // On va maintenant afficher dans le bloc qu'on viens d'insérer un champs tete spécifiant qu'il a été intégré dans un autre bloc
        
    // Et enfin, intégrer l'encapsulation au sein même du code. 
}
