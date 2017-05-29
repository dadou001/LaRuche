/*
 * Classe Reponse :
 * Permet de traiter la variable qui a pour type "Integer".
*/

function Reponse(numero,nomEssaimGerant){

	//--------- ATTRIBUTS ---------//

	this.nom = "reponse"+numero;	// nom de la réponse
	this.idt = "reponse"+numero;	// nom de la réponse
	//this.taille = "";				// taille de la réponse (du reply)
	this.format = null;
    this.nomEssaimGerant = (typeof nomEssaimGerant !== 'undefined') ? nomEssaimGerant : "";
    this.type = (this.nomEssaimGerant !== "") ? "essaim" : "core";  // si type="core", réponse de base
                                    // si type= "essaim", réponse gérée par l'extérieur
                                    // (essaim par exemple)
	this.proto = "Reponse";


	//--------- METHODES ----------//
	

	this.ajoutRepDansMenuListePreparation = function()
	/* 
	 * Ajout d'une réponse dans la liste des variables dans
	 * l'onglet préparation
	 *
	 */
	{
        var divVar = document.getElementById('Rid_Prep_Vars');
        var divName = "RidPrVa_"+this.nom;
        var nomRep = "reponse"+($("#RidAnBlocRep_"+this.nom).index()+1);
        var div = document.createElement('div');
        div.id=divName;
        var button = document.createElement('button');
        button.id = "Rid_Button_Delete_Prep_" + this.nom;
        button.className = "Rcl_Button_Delete";
        var txt = document.createTextNode( this.nom );
        var spantxt = document.createElement('span');
        spantxt.className = "Rcl_Surligne_Variable";
        spantxt.id="RidPrVa_sp_"+this.nom;
        spantxt.style.cursor = "default";
        spantxt.appendChild(txt);
    
        spantxt.draggable = "true";
        spantxt.addEventListener('dragstart', this.debutDeplacement, false);
        // bouton de suppression de variable depuis la liste des variables
        button.onclick = function(){
            var variable = div.id.slice("RidPrVa_".length,div.id.length); // On supprime le "RidAnVa_" devant le nom de la variable
            rucheSys.supprReponse("RidAnBlocRep_"+variable);
            var ind = rucheSys.rechercheIndice(variable,rucheSys.listeBlocPrepa);
            rucheSys.listeBlocPrepa.splice(ind,1);
        }
    
        // double click sur le span -> insertion dans l'éditeur principal
        spantxt.ondblclick = function(){
            var nomVar = div.id.slice("RidPrVa_".length,div.id.length); // On supprime le "RidAnVa_" devant le nom de la variable
            var txtcurr = document.getElementById(divVar.getAttribute("focusedit"));
            console.log(txtcurr.id);
            var indiceE = rucheSys.rechercheIndice(txtcurr.id,rucheSys.listeEditeur);
            console.log(indiceE);
            rucheSys.listeEditeur[indiceE].insertVariableDansEditeur(nomVar);
        }

        div.id = "RidPrVa_"+this.nom;
        div.appendChild(spantxt);
        div.appendChild(button);
        divVar.appendChild(div);

    
	}
	

	//---------------------------------//
	

	this.ajoutRepDansMenuListeAnalyse = function()
	/* 
	 * Fonction qui permet d'ajouter une réponse dans la liste des variables dans
	 * l'onglet analyse
	 *
	 */
	{
        var divVar = document.getElementById('Rid_Analyse_Vars');
        var divName = "RidAnVa_"+this.nom;
        var nomRep = "reponse"+($("#RidAnBlocRep_"+this.nom).index()+1);
        var div = document.createElement('div');
        div.id=divName;
        var button = document.createElement('button');
        button.id = "Rid_Button_Delete_Ana_" + this.nom;
        button.className = "Rcl_Button_Delete";
        var txt = document.createTextNode( this.nom );
        var spantxt = document.createElement('span');
        spantxt.className = "Rcl_Surligne_Variable";
        spantxt.id="RidAnVa_sp_"+this.nom;
        spantxt.style.cursor = "default";
        spantxt.appendChild(txt);
    
        spantxt.draggable = "true";
        spantxt.addEventListener('dragstart', this.debutDeplacement, false);
        // bouton de suppression de variable depuis la liste des variables
        button.onclick = function(){
            var variable = div.id.slice("RidAnVa_".length,div.id.length); // On supprime le "RidAnVa_" devant le nom de la variable
            rucheSys.supprReponse("RidAnBlocRep_"+variable);
            var ind = rucheSys.rechercheIndice(variable,rucheSys.listeBlocPrepa);
            rucheSys.listeBlocPrepa.splice(ind,1);
        }
    
        // double click sur le span -> insertion dans l'éditeur principal
        spantxt.ondblclick = function(){
            var nomVar = div.id.slice("RidAnVa_".length,div.id.length); // On supprime le "RidAnVa_" devant le nom de la variable
            var txtcurr = document.getElementById(divVar.getAttribute("focusedit"));
            console.log(txtcurr.id);
            var indiceE = rucheSys.rechercheIndice(txtcurr.id,rucheSys.listeEditeur);
            console.log(indiceE);
            rucheSys.listeEditeur[indiceE].insertVariableDansEditeur(nomVar);
        }

        div.id = "RidAnVa_"+this.nom;
        div.appendChild(spantxt);
        div.appendChild(button);
        divVar.appendChild(div);

    }
	

	//---------------------------------//


	this.debutDeplacement = function(event)
	/*
	 * Fonction permettant le drag'n'drop.
	 * 
	 */
	{
		event.dataTransfer.setData("texte", event.target.id);
	}


	//---------------------------------//
	

	this.ajoutRepDansAnalyse = function()
	/*
	 * Fonction qui permet d'ajouter le bloc de la réponse dans l'onglet Analyse.
	 */
	{
		var bloc = document.createElement("DIV");
	    bloc.className = "Rcl_Bloc_Interne";
        if (this.type!=="core") {bloc.className += " divRep"+this.nomEssaimGerant;}
	    bloc.id = "RidAnBlocRep_Interne_" + this.idt;

        if (this.type=="core")
        {
            
            /* Crée le sélecteur de type de réponse de base
             * et l'objet réponse de type spécifique */
            
            var select = document.createElement("select");
            select.id = "RidAnBlocRep_Choix_Type_Reponse_" + this.idt;
            select.onchange = function()
            {
                nom = select.id.slice("RidAnBlocRep_Choix_Type_Reponse_".length, select.id.length);
                // on est dans le bouton -> portée des variables = bouton !
                var indice = rucheSys.rechercheIndice(nom, rucheSys.listeReponse);

                switch(select.value)
                {		
                    case "numeric":
                        rucheSys.listeReponse[indice].format = new Numeric(nom);
                        break;

                    case "units":
                        rucheSys.listeReponse[indice].format = new Units(nom);
                        break;

                    case "numexp":
                        rucheSys.listeReponse[indice].format = new NumExp(nom);
                        break;

                    case "function":
                        rucheSys.listeReponse[indice].format = new Function_rep(nom);
                        break;

                    case "range":
                        rucheSys.listeReponse[indice].format = new Range(nom);
                        break;

                    case "vector":
                        rucheSys.listeReponse[indice].format = new Vector(nom);
                        break;

                    case "matrix":
                        rucheSys.listeReponse[indice].format = new Matrix_rep(nom);
                        break;

                    case "correspond":
                        rucheSys.listeReponse[indice].format = new Correspond(nom);
                        break;

                    case "case":
                        rucheSys.listeReponse[indice].format = new Case(nom);
                        break;

                    case "menu":
                        rucheSys.listeReponse[indice].format = new Menu(nom);
                        break;
                        
                    case "Autre":
                        rucheSys.listeReponse[indice].format = new AutreRep(nom);
                        break;

                    default: 
                }
                
                /* crée le bloc des réponses de base */
                
                rucheSys.listeReponse[indice].format.creerBloc(nom);

            }

            // complète le sélecteur de type de réponse
            
            var tabType = ["", "numeric","units","numexp","function","range","vector","matrix","correspond","case","menu","Autre"];
            var tabDescrip = ["", "numerique","numérique avec unités","fractions rationnelles","fonction","intervalle","vecteur","matrice","association","mot(s)","menu déroulant","Autre..."];

            for (var i = 0; i < tabType.length; i++)
            {
                var option = document.createElement("option");
                option.value = tabType[i];
                option.text = tabDescrip[i];
                if (i!=0)
                {
                    option.text += " ("+tabType[i]+")";
                }
                select.appendChild(option);
            }
            
            /* Crée le titre du sélecteur : "réponsexxx" */
            
            var p = document.createElement("p");
            p.innerHTML = this.nom+": ";
            p.id = "RidAnBlocRep_Title_"+this.nom;
            
        }
        else if (this.type=="essaim")
        {
            
            /* crée l'objet "réponse" géré par un essaim et le bloc correspondant */
            this.format = new EssaimRep(this.idt,this.nomEssaimGerant);
        }
        
        var li = document.createElement('li');
        li.className = "Rcl_Bloc"
        li.id = "RidAnBlocRep_"+this.idt;

        if (this.type=="core") {
            /*
             * bouton de suppression de la réponse
             * à mettre à un autre endroit pour les essaims, il est possible
             * que l'essaim ne soit pas conçu pour.
             */
            var button = document.createElement('button');
            var txt = document.createTextNode( this.nom );
            button.id = "Rid_Button_Delete_" + this.idt;
            button.className = "Rcl_Button_Delete";
            
            button.onclick = function()
            {
                rucheSys.supprReponse(li.id);
            }
            
            bloc.appendChild(button);
            
            bloc.appendChild(p);
            bloc.appendChild(select);
        }

		li.appendChild(bloc);
	    document.getElementById("Rid_Analyse_Blocs_Reponses").appendChild(li);
        
        
        if (this.type=="essaim")
        {
            // une fois que le DOM est créé, l'essaim peut fabriquer
            // le bloc réponse
            this.format.creerBloc(this.nomEssaimGerant);
        }
        
	}


	//---------------------------------//


	this.charge = function(elem)
	/*
	 * Fonction qui permet de charger un élément "réponse".
	 * 
	 */
	{
        if (elem.format != null)
        {
            var indice = rucheSys.rechercheIndice(elem.nom, rucheSys.listeReponse);
            var element_select = document.getElementById("RidAnBlocRep_Choix_Type_Reponse_"+this.nom);
            
            if (elem.format.typ == "Essaim")
            {
                // charge l'état de l'interface réponse
                rucheSys.listeReponse[indice].format.chargeEtatInterfaceReponse(elem);
            }
            else
            {
                switch(elem.format.typ)
                {
                    case "numeric":
                        rucheSys.listeReponse[indice].format = new Numeric(elem.nom);
                        element_select.value = "numeric";
                        break;
                        
                    case "units":
                        rucheSys.listeReponse[indice].format = new Units(elem.nom);
                        element_select.value = "units";
                        break;
                        
                    case "numexp":
                        rucheSys.listeReponse[indice].format = new NumExp(elem.nom);
                        element_select.value = "numexp";
                        break;
                        
                    case "function":
                        rucheSys.listeReponse[indice].format = new Function_rep(elem.nom);
                        element_select.value = "function";
                        break;
                        
                    case "range":
                        rucheSys.listeReponse[indice].format = new Range(elem.nom);
                        element_select.value = "range";
                        break;
                        
                    case "vector":
                        rucheSys.listeReponse[indice].format = new Vector(elem.nom);
                        element_select.value = "vector";
                        break;
                        
                    case "matrix":
                        rucheSys.listeReponse[indice].format = new Matrix_rep(elem.nom);
                        element_select.value = "matrix";
                        break;
                        
                    case "correspond":
                        rucheSys.listeReponse[indice].format = new Correspond(elem.nom);
                        element_select.value = "correspond";
                        break;
                        
                    case "case":
                        rucheSys.listeReponse[indice].format = new Case(elem.nom);
                        element_select.value = "case";
                        break;
                        
                    case "menu":
                        rucheSys.listeReponse[indice].format = new Menu(elem.nom);
                        element_select.value = "menu";
                        break;
                        
                    case "AutreRep":
                        rucheSys.listeReponse[indice].format = new AutreRep(elem.nom);
                        element_select.value = "Autre";
                        break;
                        
                    default:
                }
                rucheSys.listeReponse[indice].format.creerBloc(elem.nom,elem.format);
                rucheSys.listeReponse[indice].format.statusOptionsCharge(elem.format._status_options_sauv);
                
            }
        }
    }	


	//---------------------------------//


    this.toOEF = function()
	/*
	 * Fonction qui permet de générer le code oef d'une réponse.
	 * 
	 */
	{
        if (this.type=="core")
        {
            var numeroReponse = $("#RidAnBlocRep_"+this.idt).index()+1;
            
            if (this.format == null)
            {
                return "*** Vous n'avez pas donné de type à votre réponse : Réponse "+numeroReponse+". ***\n";
            }
            else
            {
                indice = rucheSys.rechercheIndice("RidAnBlocRep_Chaine_Analyse_"+this.nom,rucheSys.listeEditeur);
                rucheSys.listeEditeur[indice].recupDonneesVar();
                
                var editeurVersOEF = rucheSys.listeEditeur[indice].toOEF();
                
                if (editeurVersOEF == "" || editeurVersOEF == "undefined")
                {
                    return "*** Vous n'avez pas attribué de valeur à votre réponse : Réponse "+numeroReponse+". ***\n";
                }
                
                if (this.format.typ == "AutreRep"){
                    var typ = this.format.recupTyp();
                    var result0 = "\\answer{}{"+editeurVersOEF;
                    result0 += "}{type="+typ;
                }
                else
                {
                    var result0 = "\\answer{}{"+editeurVersOEF;
                    result0 += "}{type="+this.format.typ;
                }
                
                var iOpt = 0; // indicateur d'options
                for (ic = 0; ic<this.format.optType.length; ic++) {
                    var elemOptId = "#p_opt_checkbox"+this.nom+"_"+ic;
                    var elemOpt = $(elemOptId);
                    if (elemOpt.length>0) {
                        if ($(elemOptId)[0].checked) {
                            if (iOpt==0) {
                                result0 += "}{option="+this.format.optType[ic];
                                iOpt++;
                            } else {
                                result0 += ", "+this.format.optType[ic];
                            }
                        }
                    }
                }
                result0 += "} \n";
                return result0;
            }
        }
        else if (this.type=="essaim")
        {
            
            /* renvoie le code oef de la réponse gérée par un essaim */
            return this.format.toOEF();
        }
	}
}



/*******************************************************************************************************************************************/
/*******************************************************************************************************************************************/



/*
 * Classe Bloc réponse libre :
 * Permet de traiter le bloc libre dans l'onglet Analyse.
*/


function repLibre(numero)
{
	//--------- ATTRIBUTS ----------//

	this.nom = "repcodelibre"+numero; // nom de l'élément
	this.proto = "repLibre"; // nature de l'élément


	//--------- METHODES ----------//


	this.creerBloc = function()
	/*
	 * Fonction qui permet de créer un bloc dans l'onglet analyse
	 * spécifique pour une réponse de type "réponse libre".
	 */
	{
		var pere = document.getElementById('Rid_Analyse_Blocs_Instructions');

		var li = document.createElement('li');
		li.id = this.nom;
		var div = document.createElement('div');

		var button = document.createElement('button');
		button.id = "Rid_Button_Delete_" + this.nom;
		button.className = "Rcl_Button_Delete";
        var barre_tache = document.createElement("DIV");
        barre_tache.className = "Rcl_Barre_Tache_CodeLibre";
        
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
            var nom = "txt"+this.id.slice("Rid_Editor_Button_Latex_".length,this.id.length);
            rucheSys.etiqueterTexteEnLatex(nom);
        }

		// Bouton pour diminuer / agrandir la fenêtre
		var buttonWindow = document.createElement('button');
		buttonWindow.className = "Rcl_Button_Minimize";
		buttonWindow.addEventListener(	
			'click', 
			function (event)
			{ 
				if (buttonWindow.className == "Rcl_Button_Minimize") {
					buttonWindow.className = "";
					buttonWindow.className = "Rcl_Button_Maximize";
					buttonWindow.parentNode.parentNode.className = "Rcl_Bloc Rcl_Closed";
				}
				else
				{
					buttonWindow.className = "";
					buttonWindow.className = "Rcl_Button_Minimize";
					buttonWindow.parentNode.parentNode.className = "";
					buttonWindow.parentNode.parentNode.className = "Rcl_Bloc";
				};
			}, 
			true
		);

		var nom = this.nom;
		button.onclick = function()
		{
			rucheSys.supprBlocAutreAnalyse(nom);
		}

		li.className = "Rcl_Bloc";
		div.className = "Rcl_Bloc_Interne";

		var txt = document.createTextNode("Code libre :");
		var libre = document.createElement('div');
		libre.id = "txt"+this.nom; 
		libre.className = "ql-code-libre";
		libre.style.border = "1px solid grey";

        barre_tache.appendChild(button_latex);
        div.appendChild(barre_tache);
		div.appendChild(button);
		div.appendChild(buttonWindow);

        //div.appendChild(txt);
		div.appendChild(libre);
		li.appendChild(div);
		pere.appendChild(li);

		var editeurLibre = new Editeur(libre.id,rucheSys,true);
        rucheSys.listeEditeur.push(editeurLibre);
	}


	//---------------------------------//


	this.toOEF = function()
	/*
	 * Fonction qui permet de générer le code oef d'une réponse libre.
	 * 
	 */
	{
        //        var elemLibre =document.getElementById("txt"+this.nom);
        indice = rucheSys.rechercheIndice("txt"+this.nom,rucheSys.listeEditeur);
        rucheSys.listeEditeur[indice].recupDonneesVar();
        return rucheSys.listeEditeur[indice].toOEF()+"\n";
	}

}



/*******************************************************************************************************************************************/
/*******************************************************************************************************************************************/



/*
 * Classe Bloc réponse condition :
 * Permet de traiter le bloc condition dans l'onglet Analyse.
*/


function repCondition(numero)
{
	//--------- ATTRIBUTS ---------//


	this.nom = "repcondition"+numero; // nom de l'élément
	this.proto = "repCondition"; // nature de l'élément


	//--------- METHODES ---------//


	this.creerBloc = function()
	/*
	 * Fonction qui permet de créer un bloc dans l'onglet analyse
	 * spécifique pour une réponse de type "condition".
	 */
	{
		
		var div_pere = document.getElementById('Rid_Analyse_Blocs_Instructions');

		var li = document.createElement('li');
		li.id = this.nom;
		
		var div_fils = document.createElement('div');

		var divdebut = document.createElement('div');
		divdebut.id = "RidAnBlocInstr_Condition_Start_"+this.nom;
		divdebut.className = "Rcl_Droppable";
		var divfin = document.createElement('div');
		divfin.id = "RidAnBlocInstr_Condition_End_"+this.nom;
		divfin.className = "Rcl_Droppable";

		var button = document.createElement('button');
		button.id = "Rid_Button_Delete_" + this.nom;
		button.className = "Rcl_Button_Delete";

		
		// Bouton pour diminuer / agrandir la fenêtre
		var buttonWindow = document.createElement('button');
		buttonWindow.className = "Rcl_Button_Minimize";
		buttonWindow.addEventListener(	
			'click', 
			function (event)
			{ 
				if (buttonWindow.className == "Rcl_Button_Minimize")
				{
					buttonWindow.className = "";
					buttonWindow.className = "Rcl_Button_Maximize";
					buttonWindow.parentNode.parentNode.className = "Rcl_Bloc Rcl_Closed";
				}
				else
				{
					buttonWindow.className = "";
					buttonWindow.className = "Rcl_Button_Minimize";
					buttonWindow.parentNode.parentNode.className = "";
					buttonWindow.parentNode.parentNode.className = "Rcl_Bloc";
				};
			}, 
			true
		);

		var nom = this.nom;
		button.onclick = function()
		{
			rucheSys.supprBlocAutreAnalyse(nom);
		}


		li.className = "Rcl_Bloc";
		div_fils.className = "Rcl_Bloc_Interne";

		var txt_debut = document.createTextNode("Commentaire :");
		var txt_fin = document.createTextNode("La réponse, pour être vraie, doit satisfaire la condition :");

		var barreTache = document.createElement('DIV');
		barreTache.id = "toolbar_"+ divdebut.id;
		barreTache.className ="Rcl_Barre_Tache_Secondaire";

		div_fils.appendChild(button);
		div_fils.appendChild(buttonWindow);
		div_fils.appendChild(txt_debut);
		div_fils.appendChild(barreTache);
		div_fils.appendChild(divdebut);
		div_fils.appendChild(txt_fin);
		div_fils.appendChild(divfin);
		li.appendChild(div_fils);
		div_pere.appendChild(li);

		var editeurDebutRep = new Editeur(divdebut.id,rucheSys,true,2);
		var editeurFinRep = new Editeur(divfin.id,rucheSys,true);

		rucheSys.listeEditeur.push(editeurDebutRep);
		rucheSys.listeEditeur.push(editeurFinRep);

	}


	//---------------------------------//


	this.toOEF = function()
	/*
	 * Fonction qui permet de générer le code oef d'une réponse condition.
	 */
	{
		indice1 = rucheSys.rechercheIndice("RidAnBlocInstr_Condition_Start_"+this.nom,rucheSys.listeEditeur);
		indice2 = rucheSys.rechercheIndice("RidAnBlocInstr_Condition_End_"+this.nom,rucheSys.listeEditeur);

		rucheSys.listeEditeur[indice1].recupDonneesVar();
		rucheSys.listeEditeur[indice2].recupDonneesVar();

		var br = /<div><br><\/div>/;
		
		if (br.test(rucheSys.listeEditeur[indice1].enonce_Html) == false) {
			rucheSys.listeEditeur[indice1].enonce_Html = rucheSys.listeEditeur[indice1].enonce_Html.slice(0, rucheSys.listeEditeur[indice1].enonce_Html.length-6);
		};
		if (br.test(rucheSys.listeEditeur[indice2].enonce_Html) == false) {
			rucheSys.listeEditeur[indice2].enonce_Html = rucheSys.listeEditeur[indice2].enonce_Html.slice(0, rucheSys.listeEditeur[indice2].enonce_Html.length-6);
		};

		return "\\condition{"+rucheSys.listeEditeur[indice1].toOEF()+"}{"+rucheSys.listeEditeur[indice2].toOEF()+"}\n";
	}
}



/*******************************************************************************************************************************************/
/*******************************************************************************************************************************************/



/*
 * Classe Bloc réponse aide :
 * Permet de traiter le bloc aide dans l'onglet Analyse.
*/

function repAide(numero)
{
	//--------- ATTRIBUTS ---------//


	this.nom = "repaide"+numero; // nom de l'élément
	this.proto = "repAide"; // nature de l'élément


	//--------- METHODES ---------//


	this.creerBloc = function()
	/*
	 * Fonction qui permet de créer un bloc dans l'onglet analyse
	 * spécifique pour une réponse de type "aide".
	 */
	 {

		var pere = document.getElementById('Rid_Analyse_Blocs_Instructions');

		var li = document.createElement('li');
		li.id = this.nom;
		var div = document.createElement('div');

		var button = document.createElement('button');
		button.id = "Rid_Button_Delete_" + this.nom;
		button.className = "Rcl_Button_Delete";

		
		// Bouton pour diminuer / agrandir la fenêtre
		var buttonWindow = document.createElement('button');
		buttonWindow.className = "Rcl_Button_Minimize";
		buttonWindow.addEventListener(	
			'click', 
			function (event) { 
				if (buttonWindow.className == "Rcl_Button_Minimize") {
					buttonWindow.className = "";
					buttonWindow.className = "Rcl_Button_Maximize";
					buttonWindow.parentNode.parentNode.className = "Rcl_Bloc Rcl_Closed";
				}
				else {
					buttonWindow.className = "";
					buttonWindow.className = "Rcl_Button_Minimize";
					buttonWindow.parentNode.parentNode.className = "";
					buttonWindow.parentNode.parentNode.className = "Rcl_Bloc";
				};
			}, 
			true
		);

		var nom = this.nom;
		button.onclick = function(){
		/**********************************************************************************************/
			rucheSys.supprBlocAutreAnalyse(nom);

		}


		li.className = "Rcl_Bloc";
		div.className = "Rcl_Bloc_Interne";

		var txt = document.createTextNode("Aide :");
		var libre = document.createElement('DIV');
		libre.id = "aide"+this.nom;
		libre.style.border = "1px grey solid"; 
        libre.className = "Rcl_Droppable";

		var barreTache = document.createElement('DIV');
		barreTache.id = "toolbar_"+ libre.id;
		barreTache.className ="Rcl_Barre_Tache_Secondaire";

		div.appendChild(button);
		div.appendChild(buttonWindow);
		div.appendChild(txt);
		div.appendChild(barreTache);
		div.appendChild(libre);
		li.appendChild(div);
		pere.appendChild(li);

		var editeurLibre = new Editeur(libre.id,rucheSys,true,1);
		rucheSys.listeEditeur.push(editeurLibre);
	}


	//---------------------------------//


	this.toOEF = function()
	/*
	 * Fonction qui permet de générer le code oef d'une réponse "aide".
	 */
	 {
		var indice1 = rucheSys.rechercheIndice("aide"+this.nom,rucheSys.listeEditeur);

		rucheSys.listeEditeur[indice1].recupDonneesVar();

		var br = /<div><br><\/div>/;
		
		if (br.test(rucheSys.listeEditeur[indice1].enonce_Html) == false) {
			rucheSys.listeEditeur[indice1].enonce_Html = rucheSys.listeEditeur[indice1].enonce_Html.slice(0, rucheSys.listeEditeur[indice1].enonce_Html.length-6);
		}
		return "\\help{"+rucheSys.listeEditeur[indice1].toOEF()+"}\n";
	}

}



/*******************************************************************************************************************************************/
/*******************************************************************************************************************************************/



/*
 * Classe Bloc réponse feedback :
 * Permet de traiter le bloc feedback dans l'onglet Analyse.
*/


function repFeedback(numero)
{
	//--------- ATTRIBUTS ---------//


	this.nom = "repfeedback"+numero; // nom de l'élément
	this.proto = "repfeedback"; // nature de l'élément


	//--------- METHODES ---------//


	this.creerBloc = function()
	/*
	 * Fonction qui permet de créer un bloc dans l'onglet analyse
	 * spécifique pour une réponse de type "Feedback".
	 */
	{
		var div_pere = document.getElementById('Rid_Analyse_Blocs_Instructions');

		var li = document.createElement('li');
		li.id = this.nom;
		
		var div_fils = document.createElement('div');

		var divdebut = document.createElement('div');
		divdebut.id = "RidAnBlocInstr_Condition_Start_"+this.nom;
		divdebut.className = "Rcl_Droppable";

		var barreTache1 = document.createElement('DIV');
		barreTache1.id = "toolbar_"+ divdebut.id;
		barreTache1.className ="Rcl_Barre_Tache_Secondaire";

		var divfin = document.createElement('div');
		divfin.id = "RidAnBlocInstr_Condition_End_"+this.nom;
		divfin.className = "Rcl_Droppable";

		var barreTache2 = document.createElement('DIV');
		barreTache2.id = "toolbar_"+ divfin.id;
		barreTache2.className ="Rcl_Barre_Tache_Secondaire";

		var button = document.createElement('button');
		button.id = "Rid_Button_Delete_" + this.nom;
		button.className = "Rcl_Button_Delete";

		// Bouton pour diminuer / agrandir la fenêtre
		var buttonWindow = document.createElement('button');
		buttonWindow.className = "Rcl_Button_Minimize";
		buttonWindow.addEventListener(	
			'click', 
			function (event) { 
				if (buttonWindow.className == "Rcl_Button_Minimize") {
					buttonWindow.className = "";
					buttonWindow.className = "Rcl_Button_Maximize";
					buttonWindow.parentNode.parentNode.className = "Rcl_Bloc Rcl_Closed";
				}
				else {
					buttonWindow.className = "";
					buttonWindow.className = "Rcl_Button_Minimize";
					buttonWindow.parentNode.parentNode.className = "";
					buttonWindow.parentNode.parentNode.className = "Rcl_Bloc";
				};
			}, 
			true
		);

		var nom = this.nom;
		button.onclick = function(){
		/**********************************************************************************************/
			rucheSys.supprBlocAutreAnalyse(nom);

		}

		li.className = "Rcl_Bloc";
		div_fils.className = "Rcl_Bloc_Interne";

		var txt = document.createTextNode("Diagnostic pédagogique :");

		div_fils.appendChild(button);
		div_fils.appendChild(buttonWindow);
		div_fils.appendChild(txt);
		div_fils.appendChild(barreTache1);
		div_fils.appendChild(divdebut);
		div_fils.appendChild(barreTache2);
		div_fils.appendChild(divfin);
		li.appendChild(div_fils);
		div_pere.appendChild(li);

		var editeurDebutRep = new Editeur(divdebut.id,rucheSys,true);
		var editeurFinRep = new Editeur(divfin.id,rucheSys,true,2);

		rucheSys.listeEditeur.push(editeurDebutRep);
		rucheSys.listeEditeur.push(editeurFinRep);

	}


	//---------------------------------//


	this.toOEF = function()
	/*
	 * Fonction qui permet de créer un bloc dans l'onglet analyse
	 * spécifique pour une réponse de type "Feedback".
	 */
	{
		indice1 = rucheSys.rechercheIndice("RidAnBlocInstr_Condition_Start_"+this.nom,rucheSys.listeEditeur);
		indice2 = rucheSys.rechercheIndice("RidAnBlocInstr_Condition_End_"+this.nom,rucheSys.listeEditeur);

		rucheSys.listeEditeur[indice1].recupDonneesVar();
		rucheSys.listeEditeur[indice2].recupDonneesVar();

		var br = /<div><br><\/div>/;
		
		if (br.test(rucheSys.listeEditeur[indice1].enonce_Html) == false) {
			rucheSys.listeEditeur[indice1].enonce_Html = rucheSys.listeEditeur[indice1].enonce_Html.slice(0, rucheSys.listeEditeur[indice1].enonce_Html.length-6);
		};
		if (br.test(rucheSys.listeEditeur[indice2].enonce_Html) == false) {
			rucheSys.listeEditeur[indice2].enonce_Html = rucheSys.listeEditeur[indice2].enonce_Html.slice(0, rucheSys.listeEditeur[indice2].enonce_Html.length-6);
		};

		return "\\feedback{"+rucheSys.listeEditeur[indice1].toOEF()+"}{"+rucheSys.listeEditeur[indice2].toOEF()+"}\n";
	}
}



/*******************************************************************************************************************************************/
/*******************************************************************************************************************************************/



/*
 * Classe Bloc réponse indication :
 * Permet de traiter le bloc indication dans l'onglet Analyse.
*/


function repHint(numero)
{
	//--------- ATTRIBUTS ---------//


	this.nom = "rephint"+numero; // nom de l'élément
	this.proto = "repHint"; // nature de l'élément


	//--------- METHODES ---------//


	this.creerBloc = function()
	/*
	 * Fonction qui permet de créer un bloc dans l'onglet analyse
	 * spécifique pour une réponse de type "indication".
	 */
	 {

		var pere = document.getElementById('Rid_Analyse_Blocs_Instructions');

		var li = document.createElement('li');
		li.id = this.nom;
		var div = document.createElement('div');

		var button = document.createElement('button');
		button.id = "Rid_Button_Delete_" + this.nom;
		button.className = "Rcl_Button_Delete";

		/* Bouton pour diminuer / agrandir la fenêtre */
		var buttonWindow = document.createElement('button');
		buttonWindow.className = "Rcl_Button_Minimize";
		buttonWindow.addEventListener(	
			'click', 
			function (event) { 
				if (buttonWindow.className == "Rcl_Button_Minimize") {
					buttonWindow.className = "";
					buttonWindow.className = "Rcl_Button_Maximize";
					buttonWindow.parentNode.parentNode.className = "Rcl_Bloc Rcl_Closed";
				}
				else {
					buttonWindow.className = "";
					buttonWindow.className = "Rcl_Button_Minimize";
					buttonWindow.parentNode.parentNode.className = "";
					buttonWindow.parentNode.parentNode.className = "Rcl_Bloc";
				};
			}, 
			true
		);

		var nom = this.nom;
		button.onclick = function(){
		/**********************************************************************************************/
			rucheSys.supprBlocAutreAnalyse(nom);

		}


		li.className = "Rcl_Bloc";
		div.className = "Rcl_Bloc_Interne";

		var txt = document.createTextNode("Indications :");
		var libre = document.createElement('DIV');
		libre.id = "hint"+this.nom;
		libre.style.border = "1px grey solid"; 

		var barreTache = document.createElement('DIV');
		barreTache.id = "toolbar_"+ libre.id;
		barreTache.className ="Rcl_Barre_Tache_Secondaire";

		div.appendChild(button);
		div.appendChild(buttonWindow);
		div.appendChild(txt);
		div.appendChild(barreTache);
		div.appendChild(libre);
		li.appendChild(div);
		pere.appendChild(li);

		var editeurLibre = new Editeur(libre.id,rucheSys,true,1);
		rucheSys.listeEditeur.push(editeurLibre);

	}


	//---------------------------------//


	this.toOEF = function()
	/*
	 * Fonction qui permet de créer un bloc dans l'onglet analyse
	 * spécifique de type "indication".
	 */
	{
		var indice1 = rucheSys.rechercheIndice("hint"+this.nom,rucheSys.listeEditeur);

		rucheSys.listeEditeur[indice1].recupDonneesVar();

		var br = /<div><br><\/div>/;
		
		if (br.test(rucheSys.listeEditeur[indice1].enonce_Html) == false) {
			rucheSys.listeEditeur[indice1].enonce_Html = rucheSys.listeEditeur[indice1].enonce_Html.slice(0, rucheSys.listeEditeur[indice1].enonce_Html.length-6);
		}
		return "\\hint{"+rucheSys.listeEditeur[indice1].toOEF()+"}\n";
	}

}