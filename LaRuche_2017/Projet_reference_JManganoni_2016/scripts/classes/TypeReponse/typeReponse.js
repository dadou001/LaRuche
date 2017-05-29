/*
 * Classe Numeric :
 * Permet de traiter la réponse qui a pour type "Numeric".
*/


function Numeric(nom){

	//--------- ATTRIBUTS ---------//

	this.typ = "numeric";	// type de la réponse
	this.resultat = "";		// résultat de la réponse.
	this.nom = nom;			// nom de la réponse qui est associée à ce type.
	this.valeur = ""; 		// valeur de notre réponse numeric.
    this._status_options_sauv = []; // etat des boutons d'option pour la sauvegarde uniquement

	//--------- METHODES ----------//

	this.creerBloc = function(id)
	/*
	 * Fonction qui permet de créer un bloc dans l'onglet analyse
	 * spécifique pour une réponse de type numeric.
	 * Paramètre(s) : 	- id : nom de la réponse.
	 */
	{
		nom = "RidAnBlocRep_Interne_"+id;
        
        // Enlève tout ce qui suit le sélecteur
        var divContent = $("#RidAnBlocRep_Interne_"+id).children();
        var indexSelect = $("#RidAnBlocRep_Choix_Type_Reponse_"+id).index();
        for (var i=indexSelect+1; i<divContent.length;i++)
        {
            divContent.eq(i).remove();
        }

        // Construit le bloc en fonction du type
		var div = $("#"+nom)[0];
		var select = $("#RidAnBlocRep_Choix_Type_Reponse_"+id)[0].id;
		

		var txt = document.createElement('div');
		txt.className = "Rcl_Droppable";

		txt.style.border = "1px grey solid";
		txt.id = "RidAnBlocRep_Chaine_Analyse_"+id;

		var p_res = document.createElement("div");
		p_res.innerHTML = "Chaîne d'analyse : ";
		p_res.id="RidAnBlocRep_Par1_"+id;
        
        // Création du sélecteur d'option
        var p_opt = document.createElement("div");
        var p_opt_text = document.createTextNode("Option(s) :");
        
        p_opt.appendChild(p_opt_text);
        
        for (var i = 0; i < this.optType.length-1; i++)
        {
            var div_opt_checkbox = document.createElement("div");
            div_opt_checkbox.style.display = "inline-block";
            div_opt_checkbox.style.marginRight = "5px";
            var p_opt_checkbox = document.createElement("input");
            p_opt_checkbox.type = "checkbox";
            p_opt_checkbox.id = "p_opt_checkbox"+id+"_"+i;
            p_opt_desc = document.createTextNode(this.optDescrip[i]);
            div_opt_checkbox.appendChild(p_opt_checkbox);
            div_opt_checkbox.appendChild(p_opt_desc);
            p_opt.appendChild(div_opt_checkbox);
            
        }
        
        // Ajoute l'option "noanalyzeprint" pour ne pas afficher l'analyse de la réponse
        // à la fin pour qu'elle soit sur la ligne suivante
        
        var div_opt_checkbox = document.createElement("div");
        div_opt_checkbox.style.display = "inline-block";
        div_opt_checkbox.style.marginRight = "5px";
        var p_opt_checkbox = document.createElement("input");
        p_opt_checkbox.type = "checkbox";
        p_opt_checkbox.id = "p_opt_checkbox"+id+"_"+i;
        p_opt_desc = document.createTextNode(this.optDescrip[this.optType.length-1]);
        div_opt_checkbox.appendChild(p_opt_checkbox);
        div_opt_checkbox.appendChild(p_opt_desc);
        p_opt.appendChild(document.createElement("div"));
        p_opt.appendChild(div_opt_checkbox);
        
		div.appendChild(p_res);
		div.appendChild(txt);
        div.appendChild(p_opt);

		var editeurVar = new Editeur(txt.id, rucheSys,true);

		rucheSys.listeEditeur.push(editeurVar);

	}


	//---------------------------------//


	this.recupDonnees = function()
	/*
	 * Fonction qui permet de récupérer la valeur donnée à notre réponse de type numeric.
	 *
	 */
	{
		this.resultat = document.getElementById("RidAnBlocRep_Chaine_Analyse_"+this.nom).value;
	}
    
    //---------------------------------//
    
    this.statusOptionsCheck= function()
    /*
     * Enregistre l'état des boutons d'option. Utilisé lors de la sauvegarde
     */
    {
        for (var i = 0; i< this.optType.length; i++)
        {
            this._status_options_sauv.push($("#p_opt_checkbox"+this.nom+"_"+i)[0].checked);
        }
    }
    
    //---------------------------------//
    
    this.statusOptionsCharge= function(_status_options)
    /*
     * Rétablit l'état des boutons d'option à partir d'une sauvegarde
     */
    {
        for (var i = 0; i< this.optType.length; i++)
        {
            $("#p_opt_checkbox"+this.nom+"_"+i)[0].checked = _status_options[i];
        }
    }
    

 	//---------------------------------//

}
// options valables pour ce type
Numeric.prototype.optType = ["comma","noanalyzeprint"];
Numeric.prototype.optDescrip = ["virgule (et non point) ","sans affichage de l'analyse réponse"];


////////////////////////////////////////////////////////////////////////////////


/*
 * Classe Units :
 * Permet de traiter la réponse qui a pour type "Units".
*/

function Units(nom){

	//--------- ATTRIBUTS ---------//

	this.typ = "units";		// type de la réponse.
	this.resultat = "";		// résultat de la réponse.
	this.nom = nom;			// nom de la réponse qui est associé à ce type.
	this.valeur = ""; 		// valeur de notre réponse units.
    this._status_options_sauv = []; // etat des boutons d'option pour la sauvegarde uniquement


	//--------- METHODES ----------//


	this.creerBloc = function(id)
	/*
	 * Fonction qui permet de créer un bloc dans l'onglet analyse
	 * spécifique pour une réponse de type units.
	 * Paramètre(s) : 	- id : nom de la réponse.
	 */
	{
		nom = "RidAnBlocRep_Interne_"+id;
        
        // Enlève tout ce qui suit le sélecteur
        var divContent = $("#RidAnBlocRep_Interne_"+id).children();
        var indexSelect = $("#RidAnBlocRep_Choix_Type_Reponse_"+id).index();
        for (var i=indexSelect+1; i<divContent.length;i++)
        {
            divContent.eq(i).remove();
        }
        
        // Construit le bloc en fonction du type
        var div = $("#"+nom)[0];
        var select = $("#RidAnBlocRep_Choix_Type_Reponse_"+id)[0].id;
		

		var txt = document.createElement('div');
		txt.className = "Rcl_Droppable";

		txt.style.border = "1px grey solid";
		txt.id = "RidAnBlocRep_Chaine_Analyse_"+id;

		var p_res = document.createElement("div");
		p_res.innerHTML = "Chaîne d'analyse : ";
		p_res.id="RidAnBlocRep_Par1_"+id;
        
        // Création du sélecteur d'option
        var p_opt = document.createElement("div");
        var p_opt_text = document.createTextNode("Option(s) :");
        
        p_opt.appendChild(p_opt_text);
        
        for (var i = 0; i < this.optType.length-1; i++)
        {
            var div_opt_checkbox = document.createElement("div");
            div_opt_checkbox.style.display = "inline-block";
            div_opt_checkbox.style.marginRight = "5px";
            var p_opt_checkbox = document.createElement("input");
            p_opt_checkbox.type = "checkbox";
            p_opt_checkbox.id = "p_opt_checkbox"+id+"_"+i;
            p_opt_desc = document.createTextNode(this.optDescrip[i]);
            div_opt_checkbox.appendChild(p_opt_checkbox);
            div_opt_checkbox.appendChild(p_opt_desc);
            p_opt.appendChild(div_opt_checkbox);
            
        }
        
        // Ajoute l'option "noanalyzeprint" pour ne pas afficher l'analyse de la réponse
        // à la fin pour qu'elle soit sur la ligne suivante
        
        var div_opt_checkbox = document.createElement("div");
        div_opt_checkbox.style.display = "inline-block";
        div_opt_checkbox.style.marginRight = "5px";
        var p_opt_checkbox = document.createElement("input");
        p_opt_checkbox.type = "checkbox";
        p_opt_checkbox.id = "p_opt_checkbox"+id+"_"+i;
        p_opt_desc = document.createTextNode(this.optDescrip[this.optType.length-1]);
        div_opt_checkbox.appendChild(p_opt_checkbox);
        div_opt_checkbox.appendChild(p_opt_desc);
        p_opt.appendChild(document.createElement("div"));
        p_opt.appendChild(div_opt_checkbox);
        
        div.appendChild(p_res);
        div.appendChild(txt);
        div.appendChild(p_opt);

		var editeurVar = new Editeur(txt.id, rucheSys,true);
		rucheSys.listeEditeur.push(editeurVar);

	}

	
	//---------------------------------//


	this.recupDonnees = function()
	/*
	 * Fonction qui permet de récupérer la valeur donnée à notre réponse de type units.
	 *
	 */
	{
		this.resultat = document.getElementById("RidAnBlocRep_Chaine_Analyse_"+this.nom).value;
	}

    
    //---------------------------------//
    
    this.statusOptionsCheck= function()
    /*
     * Enregistre l'état des boutons d'option. Utilisé lors de la sauvegarde
     */
    {
        for (var i = 0; i< this.optType.length; i++)
        {
            this._status_options_sauv.push($("#p_opt_checkbox"+this.nom+"_"+i)[0].checked);
        }
    }
    
    //---------------------------------//
    
    this.statusOptionsCharge= function(_status_options)
    /*
     * Rétablit l'état des boutons d'option à partir d'une sauvegarde
     */
    {
        for (var i = 0; i< this.optType.length; i++)
        {
            $("#p_opt_checkbox"+this.nom+"_"+i)[0].checked = _status_options[i];
        }
    }
    
    
    //---------------------------------//
    
}
// options valables pour ce type
Units.prototype.optType = ["noanalyzeprint"];
Units.prototype.optDescrip = ["sans affichage de l'analyse réponse"];



////////////////////////////////////////////////////////////////////////////////


/*
 * Classe NumExp :
 * Permet de traiter la réponse qui a pour type "NumExp".
*/

function NumExp(nom){

	//--------- ATTRIBUTS ---------//

	this.typ = "numexp";	// type de la réponse.
	this.resultat = "";		// résultat de la réponse.
	this.nom = nom;			// nom de la réponse qui est associé à ce type.
	this.valeur = ""; 		// valeur de notre réponse numexp.
    this._status_options_sauv = []; // etat des boutons d'option pour la sauvegarde uniquement


	//--------- METHODES ----------//


	this.creerBloc = function(id)
	/*
	 * Fonction qui permet de créer un bloc dans l'onglet analyse
	 * spécifique pour une réponse de type numexp.
	 * Paramètre(s) : 	- id : nom de la réponse.
	 */
	{
		nom = "RidAnBlocRep_Interne_"+id;
        
        // Enlève tout ce qui suit le sélecteur
        var divContent = $("#RidAnBlocRep_Interne_"+id).children();
        var indexSelect = $("#RidAnBlocRep_Choix_Type_Reponse_"+id).index();
        for (var i=indexSelect+1; i<divContent.length;i++)
        {
            divContent.eq(i).remove();
        }
        
        // Construit le bloc en fonction du type
        var div = $("#"+nom)[0];
        var select = $("#RidAnBlocRep_Choix_Type_Reponse_"+id)[0].id;
		

		var txt = document.createElement('div');

		txt.className = "Rcl_Droppable";

		txt.style.border = "1px grey solid";
		txt.id = "RidAnBlocRep_Chaine_Analyse_"+id;

		var p_res = document.createElement("div");
		p_res.innerHTML = "Chaîne d'analyse : ";
		p_res.id="RidAnBlocRep_Par1_"+id;
        
        // Création du sélecteur d'option
        var p_opt = document.createElement("div");
        var p_opt_text = document.createTextNode("Option(s) :");
        
        p_opt.appendChild(p_opt_text);
        
        for (var i = 0; i < this.optType.length-1; i++)
        {
            var div_opt_checkbox = document.createElement("div");
            div_opt_checkbox.style.display = "inline-block";
            div_opt_checkbox.style.marginRight = "5px";
            var p_opt_checkbox = document.createElement("input");
            p_opt_checkbox.type = "checkbox";
            p_opt_checkbox.id = "p_opt_checkbox"+id+"_"+i;
            p_opt_desc = document.createTextNode(this.optDescrip[i]);
            div_opt_checkbox.appendChild(p_opt_checkbox);
            div_opt_checkbox.appendChild(p_opt_desc);
            p_opt.appendChild(div_opt_checkbox);
            
        }
        
        // Ajoute l'option "noanalyzeprint" pour ne pas afficher l'analyse de la réponse
        // à la fin pour qu'elle soit sur la ligne suivante
        
        var div_opt_checkbox = document.createElement("div");
        div_opt_checkbox.style.display = "inline-block";
        div_opt_checkbox.style.marginRight = "5px";
        var p_opt_checkbox = document.createElement("input");
        p_opt_checkbox.type = "checkbox";
        p_opt_checkbox.id = "p_opt_checkbox"+id+"_"+i;
        p_opt_desc = document.createTextNode(this.optDescrip[this.optType.length-1]);
        div_opt_checkbox.appendChild(p_opt_checkbox);
        div_opt_checkbox.appendChild(p_opt_desc);
        p_opt.appendChild(document.createElement("div"));
        p_opt.appendChild(div_opt_checkbox);
        
        div.appendChild(p_res);
        div.appendChild(txt);
        div.appendChild(p_opt);

		var editeurVar = new Editeur(txt.id, rucheSys,true);
		rucheSys.listeEditeur.push(editeurVar);

	}


	//---------------------------------//


	this.recupDonnees = function()
	/*
	 * Fonction qui permet de récupérer la valeur donnée à notre réponse de type units.
	 *
	 */
	{
		this.resultat = document.getElementById("RidAnBlocRep_Chaine_Analyse_"+this.nom).value;
	}
    
    //---------------------------------//
    
    this.statusOptionsCheck= function()
    /*
     * Enregistre l'état des boutons d'option. Utilisé lors de la sauvegarde
     */
    {
        for (var i = 0; i< this.optType.length; i++)
        {
            this._status_options_sauv.push($("#p_opt_checkbox"+this.nom+"_"+i)[0].checked);
        }
    }
    
    //---------------------------------//
    
    this.statusOptionsCharge= function(_status_options)
    /*
     * Rétablit l'état des boutons d'option à partir d'une sauvegarde
     */
    {
        for (var i = 0; i< this.optType.length; i++)
        {
            $("#p_opt_checkbox"+this.nom+"_"+i)[0].checked = _status_options[i];
        }
    }
    
    
    //---------------------------------//
    
}
// options valables pour ce type
NumExp.prototype.optType = ["noreduction","noanalyzeprint"];
NumExp.prototype.optDescrip = ["accepte fractions non réduites","sans affichage de l'analyse réponse"];


////////////////////////////////////////////////////////////////////////////////


/*
 * Classe Function_rep :
 * Permet de traiter la réponse qui a pour type "function".
*/

function Function_rep(nom){

	//--------- ATTRIBUTS ---------//

	this.typ = "function";
	this.resultat = "";		// résultat de la réponse.
	this.nom = nom;			// nom de la réponse qui est associé à ce type.
	this.valeur = ""; 		// valeur de notre réponse function.
    this._status_options_sauv = []; // etat des boutons d'option pour la sauvegarde uniquement


	//--------- METHODES ----------//

	this.creerBloc = function(id)
	/*
	 * Fonction qui permet de créer un bloc dans l'onglet analyse
	 * spécifique pour une réponse de type function.
	 * Paramètre(s) : 	- id : nom de la réponse.
	 */
	{
		nom = "RidAnBlocRep_Interne_"+id;
        
        // Enlève tout ce qui suit le sélecteur
        var divContent = $("#RidAnBlocRep_Interne_"+id).children();
        var indexSelect = $("#RidAnBlocRep_Choix_Type_Reponse_"+id).index();
        for (var i=indexSelect+1; i<divContent.length;i++)
        {
            divContent.eq(i).remove();
        }
        
        // Construit le bloc en fonction du type
        var div = $("#"+nom)[0];
        var select = $("#RidAnBlocRep_Choix_Type_Reponse_"+id)[0].id;
		

		var txt = document.createElement('div');
		//txt.id = "edit"+id;
		txt.className = "Rcl_Droppable";

		txt.style.border = "1px grey solid";
		txt.id = "RidAnBlocRep_Chaine_Analyse_"+id;

		var p_res = document.createElement("div");
		p_res.innerHTML = "Chaîne d'analyse : ";
		p_res.id="RidAnBlocRep_Par1_"+id;
        
        // Création du sélecteur d'option
        var p_opt = document.createElement("div");
        var p_opt_text = document.createTextNode("Option(s) :");
        
        p_opt.appendChild(p_opt_text);
        
        for (var i = 0; i < this.optType.length-1; i++)
        {
            var div_opt_checkbox = document.createElement("div");
            div_opt_checkbox.style.display = "inline-block";
            div_opt_checkbox.style.marginRight = "5px";
            var p_opt_checkbox = document.createElement("input");
            p_opt_checkbox.type = "checkbox";
            p_opt_checkbox.id = "p_opt_checkbox"+id+"_"+i;
            p_opt_desc = document.createTextNode(this.optDescrip[i]);
            div_opt_checkbox.appendChild(p_opt_checkbox);
            div_opt_checkbox.appendChild(p_opt_desc);
            p_opt.appendChild(div_opt_checkbox);
            
        }
        
        // Ajoute l'option "noanalyzeprint" pour ne pas afficher l'analyse de la réponse
        // à la fin pour qu'elle soit sur la ligne suivante
        
        var div_opt_checkbox = document.createElement("div");
        div_opt_checkbox.style.display = "inline-block";
        div_opt_checkbox.style.marginRight = "5px";
        var p_opt_checkbox = document.createElement("input");
        p_opt_checkbox.type = "checkbox";
        p_opt_checkbox.id = "p_opt_checkbox"+id+"_"+i;
        p_opt_desc = document.createTextNode(this.optDescrip[this.optType.length-1]);
        div_opt_checkbox.appendChild(p_opt_checkbox);
        div_opt_checkbox.appendChild(p_opt_desc);
        p_opt.appendChild(document.createElement("div"));
        p_opt.appendChild(div_opt_checkbox);
        
        div.appendChild(p_res);
        div.appendChild(txt);
        div.appendChild(p_opt);

		var editeurVar = new Editeur(txt.id, rucheSys,true);
		rucheSys.listeEditeur.push(editeurVar);

	}


	//---------------------------------//


	this.recupDonnees = function()
	/*
	 * Fonction qui permet de récupérer la valeur donnée à notre réponse de type function.
	 *
	 */
	{
		this.resultat = document.getElementById("RidAnBlocRep_Chaine_Analyse_"+this.nom).value;
	}
    
    //---------------------------------//
    
    this.statusOptionsCheck= function()
    /*
     * Enregistre l'état des boutons d'option. Utilisé lors de la sauvegarde
     */
    {
        for (var i = 0; i< this.optType.length; i++)
        {
            this._status_options_sauv.push($("#p_opt_checkbox"+this.nom+"_"+i)[0].checked);
        }
    }
    
    //---------------------------------//
    
    this.statusOptionsCharge= function(_status_options)
    /*
     * Rétablit l'état des boutons d'option à partir d'une sauvegarde
     */
    {
        for (var i = 0; i< this.optType.length; i++)
        {
            $("#p_opt_checkbox"+this.nom+"_"+i)[0].checked = _status_options[i];
        }
    }
    
    
    //---------------------------------//
    
}
// options valables pour ce type
Function_rep.prototype.optType = ["noanalyzeprint"];
Function_rep.prototype.optDescrip = ["sans affichage de l'analyse réponse"];


////////////////////////////////////////////////////////////////////////////////


/*
 * Classe Range :
 * Permet de traiter la réponse qui a pour type "range".
*/

function Range(nom){

	//--------- ATTRIBUTS ---------//

	this.typ = "range";
	this.resultat = "";		// résultat de la réponse.
	this.nom = nom;			// nom de la réponse qui est associé à ce type.
	this.valeur = ""; 		// valeur de notre réponse range.
    this._status_options_sauv = []; // etat des boutons d'option pour la sauvegarde uniquement


	//--------- METHODES ----------//

	this.creerBloc = function(id)
	/*
	 * Fonction qui permet de créer un bloc dans l'onglet analyse
	 * spécifique pour une réponse de type range.
	 * Paramètre(s) : 	- id : nom de la réponse.
	 */
	{
		nom = "RidAnBlocRep_Interne_"+id;
        
        // Enlève tout ce qui suit le sélecteur
        var divContent = $("#RidAnBlocRep_Interne_"+id).children();
        var indexSelect = $("#RidAnBlocRep_Choix_Type_Reponse_"+id).index();
        for (var i=indexSelect+1; i<divContent.length;i++)
        {
            divContent.eq(i).remove();
        }
        
        // Construit le bloc en fonction du type
        var div = $("#"+nom)[0];
        var select = $("#RidAnBlocRep_Choix_Type_Reponse_"+id)[0].id;
		

		var txt = document.createElement('div');
		//txt.id = "edit"+id;
		txt.className = "Rcl_Droppable";

		txt.style.border = "1px grey solid";
		txt.id = "RidAnBlocRep_Chaine_Analyse_"+id;

		var p_res = document.createElement("div");
		p_res.innerHTML = "Chaîne d'analyse : ";
		p_res.id="RidAnBlocRep_Par1_"+id;
        
        // Création du sélecteur d'option
        var p_opt = document.createElement("div");
        var p_opt_text = document.createTextNode("Option(s) :");
        
        p_opt.appendChild(p_opt_text);
        
        for (var i = 0; i < this.optType.length-1; i++)
        {
            var div_opt_checkbox = document.createElement("div");
            div_opt_checkbox.style.display = "inline-block";
            div_opt_checkbox.style.marginRight = "5px";
            var p_opt_checkbox = document.createElement("input");
            p_opt_checkbox.type = "checkbox";
            p_opt_checkbox.id = "p_opt_checkbox"+id+"_"+i;
            p_opt_desc = document.createTextNode(this.optDescrip[i]);
            div_opt_checkbox.appendChild(p_opt_checkbox);
            div_opt_checkbox.appendChild(p_opt_desc);
            p_opt.appendChild(div_opt_checkbox);
            
        }
        
        // Ajoute l'option "noanalyzeprint" pour ne pas afficher l'analyse de la réponse
        // à la fin pour qu'elle soit sur la ligne suivante
        
        var div_opt_checkbox = document.createElement("div");
        div_opt_checkbox.style.display = "inline-block";
        div_opt_checkbox.style.marginRight = "5px";
        var p_opt_checkbox = document.createElement("input");
        p_opt_checkbox.type = "checkbox";
        p_opt_checkbox.id = "p_opt_checkbox"+id+"_"+i;
        p_opt_desc = document.createTextNode(this.optDescrip[this.optType.length-1]);
        div_opt_checkbox.appendChild(p_opt_checkbox);
        div_opt_checkbox.appendChild(p_opt_desc);
        p_opt.appendChild(document.createElement("div"));
        p_opt.appendChild(div_opt_checkbox);
        
        div.appendChild(p_res);
        div.appendChild(txt);
        div.appendChild(p_opt);

		var editeurVar = new Editeur(txt.id, rucheSys,true);
		rucheSys.listeEditeur.push(editeurVar);

	}


	//---------------------------------//


	this.recupDonnees = function()
	/*
	 * Fonction qui permet de récupérer la valeur donnée à notre réponse de type range.
	 *
	 */
	{
		this.resultat = document.getElementById("RidAnBlocRep_Chaine_Analyse_"+this.nom).value;
	}
    
    //---------------------------------//
    
    this.statusOptionsCheck= function()
    /*
     * Enregistre l'état des boutons d'option. Utilisé lors de la sauvegarde
     */
    {
        for (var i = 0; i< this.optType.length; i++)
        {
            this._status_options_sauv.push($("#p_opt_checkbox"+this.nom+"_"+i)[0].checked);
        }
    }
    
    //---------------------------------//
    
    this.statusOptionsCharge= function(_status_options)
    /*
     * Rétablit l'état des boutons d'option à partir d'une sauvegarde
     */
    {
        for (var i = 0; i< this.optType.length; i++)
        {
            $("#p_opt_checkbox"+this.nom+"_"+i)[0].checked = _status_options[i];
        }
    }
    
    
    //---------------------------------//
    
}
// options valables pour ce type
Range.prototype.optType = ["noanalyzeprint"];
Range.prototype.optDescrip = ["sans affichage de l'analyse réponse"];



////////////////////////////////////////////////////////////////////////////////


/*
 * Classe Vector :
 * Permet de traiter la réponse qui a pour type "vector".
*/

function Vector(nom){

	//--------- ATTRIBUTS ---------//

	this.typ = "vector";	// type de la réponse.
	this.resultat = "";		// résultat de la réponse.
	this.nom = nom;			// nom de la réponse qui est associé à ce type.
	this.valeur = ""; 		// valeur de notre réponse vector.
    this._status_options_sauv = []; // etat des boutons d'option pour la sauvegarde uniquement


	//--------- METHODES ----------//

	this.creerBloc = function(id)
	/*
	 * Fonction qui permet de créer un bloc dans l'onglet analyse
	 * spécifique pour une réponse de type vector.
	 * Paramètre(s) : 	- id : nom de la réponse.
	 */
	{
		nom = "RidAnBlocRep_Interne_"+id;
        
        // Enlève tout ce qui suit le sélecteur
        var divContent = $("#RidAnBlocRep_Interne_"+id).children();
        var indexSelect = $("#RidAnBlocRep_Choix_Type_Reponse_"+id).index();
        for (var i=indexSelect+1; i<divContent.length;i++)
        {
            divContent.eq(i).remove();
        }
        
        // Construit le bloc en fonction du type
        var div = $("#"+nom)[0];
        var select = $("#RidAnBlocRep_Choix_Type_Reponse_"+id)[0].id;
		

		var txt = document.createElement('div');
		//txt.id = "edit"+id;
		txt.className = "Rcl_Droppable";

		txt.style.border = "1px grey solid";
		txt.id = "RidAnBlocRep_Chaine_Analyse_"+id;

		var p_res = document.createElement("div");
		p_res.innerHTML = "Chaîne d'analyse : ";
		p_res.id="RidAnBlocRep_Par1_"+id;
        
        // Création du sélecteur d'option
        var p_opt = document.createElement("div");
        var p_opt_text = document.createTextNode("Option(s) :");
        
        p_opt.appendChild(p_opt_text);
        
        for (var i = 0; i < this.optType.length-1; i++)
        {
            var div_opt_checkbox = document.createElement("div");
            div_opt_checkbox.style.display = "inline-block";
            div_opt_checkbox.style.marginRight = "5px";
            var p_opt_checkbox = document.createElement("input");
            p_opt_checkbox.type = "checkbox";
            p_opt_checkbox.id = "p_opt_checkbox"+id+"_"+i;
            p_opt_desc = document.createTextNode(this.optDescrip[i]);
            div_opt_checkbox.appendChild(p_opt_checkbox);
            div_opt_checkbox.appendChild(p_opt_desc);
            p_opt.appendChild(div_opt_checkbox);
            
        }
        
        // Ajoute l'option "noanalyzeprint" pour ne pas afficher l'analyse de la réponse
        // à la fin pour qu'elle soit sur la ligne suivante
        
        var div_opt_checkbox = document.createElement("div");
        div_opt_checkbox.style.display = "inline-block";
        div_opt_checkbox.style.marginRight = "5px";
        var p_opt_checkbox = document.createElement("input");
        p_opt_checkbox.type = "checkbox";
        p_opt_checkbox.id = "p_opt_checkbox"+id+"_"+i;
        p_opt_desc = document.createTextNode(this.optDescrip[this.optType.length-1]);
        div_opt_checkbox.appendChild(p_opt_checkbox);
        div_opt_checkbox.appendChild(p_opt_desc);
        p_opt.appendChild(document.createElement("div"));
        p_opt.appendChild(div_opt_checkbox);
        
        div.appendChild(p_res);
        div.appendChild(txt);
        div.appendChild(p_opt);

		var editeurVar = new Editeur(txt.id, rucheSys,true);
		rucheSys.listeEditeur.push(editeurVar);

	}

	
	//---------------------------------//


	this.recupDonnees = function()
	/*
	 * Fonction qui permet de récupérer la valeur donnée à notre réponse de type vector.
	 *
	 */
	{
		this.resultat = document.getElementById("RidAnBlocRep_Chaine_Analyse_"+this.nom).value;
	}
    
    //---------------------------------//
    
    this.statusOptionsCheck= function()
    /*
     * Enregistre l'état des boutons d'option. Utilisé lors de la sauvegarde
     */
    {
        for (var i = 0; i< this.optType.length; i++)
        {
            this._status_options_sauv.push($("#p_opt_checkbox"+this.nom+"_"+i)[0].checked);
        }
    }
    
    //---------------------------------//
    
    this.statusOptionsCharge= function(_status_options)
    /*
     * Rétablit l'état des boutons d'option à partir d'une sauvegarde
     */
    {
        for (var i = 0; i< this.optType.length; i++)
        {
            $("#p_opt_checkbox"+this.nom+"_"+i)[0].checked = _status_options[i];
        }
    }
    
    
    //---------------------------------//
    
}
// options valables pour ce type
Vector.prototype.optType = ["noanalyzeprint"];
Vector.prototype.optDescrip = ["sans affichage de l'analyse réponse"];


////////////////////////////////////////////////////////////////////////////////


/*
 * Classe Matrix_rep :
 * Permet de traiter la réponse qui a pour type "matrix".
*/

function Matrix_rep(nom){

	//--------- ATTRIBUTS ---------//

	this.typ = "matrix";	// type de la réponse.
	this.resultat = "";		// résultat de la réponse.
	this.nom = nom;			// nom de la réponse qui est associé à ce type.
	this.valeur = ""; 		// valeur de notre réponse matrix.
    this._status_options_sauv = []; // etat des boutons d'option pour la sauvegarde uniquement


	//--------- METHODES ----------//

	this.creerBloc = function(id)
	/*
	 * Fonction qui permet de créer un bloc dans l'onglet analyse
	 * spécifique pour une réponse de type matrix.
	 * Paramètre(s) : 	- id : nom de la réponse.
	 */
	{
		nom = "RidAnBlocRep_Interne_"+id;
        
        // Enlève tout ce qui suit le sélecteur
        var divContent = $("#RidAnBlocRep_Interne_"+id).children();
        var indexSelect = $("#RidAnBlocRep_Choix_Type_Reponse_"+id).index();
        for (var i=indexSelect+1; i<divContent.length;i++)
        {
            divContent.eq(i).remove();
        }
        
        // Construit le bloc en fonction du type
        var div = $("#"+nom)[0];
        var select = $("#RidAnBlocRep_Choix_Type_Reponse_"+id)[0].id;
		

		var txt = document.createElement('div');
		//txt.id = "edit"+id;
		txt.className = "Rcl_Droppable";

		txt.style.border = "1px grey solid";
		txt.id = "RidAnBlocRep_Chaine_Analyse_"+id;

		var p_res = document.createElement("div");
		p_res.innerHTML = "Chaîne d'analyse : ";
		p_res.id="RidAnBlocRep_Par1_"+id;
        
        // Création du sélecteur d'option
        var p_opt = document.createElement("div");
        var p_opt_text = document.createTextNode("Option(s) :");
        
        p_opt.appendChild(p_opt_text);
        
        for (var i = 0; i < this.optType.length-1; i++)
        {
            var div_opt_checkbox = document.createElement("div");
            div_opt_checkbox.style.display = "inline-block";
            div_opt_checkbox.style.marginRight = "5px";
            var p_opt_checkbox = document.createElement("input");
            p_opt_checkbox.type = "checkbox";
            p_opt_checkbox.id = "p_opt_checkbox"+id+"_"+i;
            p_opt_desc = document.createTextNode(this.optDescrip[i]);
            div_opt_checkbox.appendChild(p_opt_checkbox);
            div_opt_checkbox.appendChild(p_opt_desc);
            p_opt.appendChild(div_opt_checkbox);
            
        }
        
        // Ajoute l'option "noanalyzeprint" pour ne pas afficher l'analyse de la réponse
        // à la fin pour qu'elle soit sur la ligne suivante
        
        var div_opt_checkbox = document.createElement("div");
        div_opt_checkbox.style.display = "inline-block";
        div_opt_checkbox.style.marginRight = "5px";
        var p_opt_checkbox = document.createElement("input");
        p_opt_checkbox.type = "checkbox";
        p_opt_checkbox.id = "p_opt_checkbox"+id+"_"+i;
        p_opt_desc = document.createTextNode(this.optDescrip[this.optType.length-1]);
        div_opt_checkbox.appendChild(p_opt_checkbox);
        div_opt_checkbox.appendChild(p_opt_desc);
        p_opt.appendChild(document.createElement("div"));
        p_opt.appendChild(div_opt_checkbox);
        
        div.appendChild(p_res);
        div.appendChild(txt);
        div.appendChild(p_opt);

		var editeurVar = new Editeur(txt.id, rucheSys,true);
		rucheSys.listeEditeur.push(editeurVar);

	}


	//---------------------------------//


	this.recupDonnees = function()
	/*
	 * Fonction qui permet de récupérer la valeur donnée à notre réponse de type matrix.
	 *
	 */
	{
		this.resultat = document.getElementById("RidAnBlocRep_Chaine_Analyse_"+this.nom).value;
	}
    
    //---------------------------------//
    
    this.statusOptionsCheck= function()
    /*
     * Enregistre l'état des boutons d'option. Utilisé lors de la sauvegarde
     */
    {
        for (var i = 0; i< this.optType.length; i++)
        {
            this._status_options_sauv.push($("#p_opt_checkbox"+this.nom+"_"+i)[0].checked);
        }
    }
    
    //---------------------------------//
    
    this.statusOptionsCharge= function(_status_options)
    /*
     * Rétablit l'état des boutons d'option à partir d'une sauvegarde
     */
    {
        for (var i = 0; i< this.optType.length; i++)
        {
            $("#p_opt_checkbox"+this.nom+"_"+i)[0].checked = _status_options[i];
        }
    }
    
    
    //---------------------------------//
    
}
// options valables pour ce type
Matrix_rep.prototype.optType = ["noanalyzeprint"];
Matrix_rep.prototype.optDescrip = ["sans affichage de l'analyse réponse"];


////////////////////////////////////////////////////////////////////////////////


/*
 * Classe Correspond :
 * Permet de traiter la réponse qui a pour type "correspond".
*/

function Correspond(nom){

	//--------- ATTRIBUTS ---------//

	this.typ = "correspond"; // type de la réponse
	this.resultat = "";		// résultat de la réponse.
	this.nom = nom;			// nom de la réponse qui est associé à ce type.
	this.valeur = ""; 		// valeur de notre réponse correspond.
    this._status_options_sauv = []; // etat des boutons d'option pour la sauvegarde uniquement


	//--------- METHODES ----------//

	this.creerBloc = function(id)
	/*
	 * Fonction qui permet de créer un bloc dans l'onglet analyse
	 * spécifique pour une réponse de type correspond.
	 * Paramètre(s) : 	- id : nom de la réponse.
	 */
	{
		nom = "RidAnBlocRep_Interne_"+id;
        
        // Enlève tout ce qui suit le sélecteur
        var divContent = $("#RidAnBlocRep_Interne_"+id).children();
        var indexSelect = $("#RidAnBlocRep_Choix_Type_Reponse_"+id).index();
        for (var i=indexSelect+1; i<divContent.length;i++)
        {
            divContent.eq(i).remove();
        }
        
        // Construit le bloc en fonction du type
        var div = $("#"+nom)[0];
        var select = $("#RidAnBlocRep_Choix_Type_Reponse_"+id)[0].id;
		

		var txt = document.createElement('div');
		//txt.id = "edit"+id;
		txt.className = "Rcl_Droppable";

		txt.style.border = "1px grey solid";
		txt.id = "RidAnBlocRep_Chaine_Analyse_"+id;

		var p_res = document.createElement("div");
		p_res.innerHTML = "Chaîne d'analyse : ";
		p_res.id="RidAnBlocRep_Par1_"+id;
        
        // Création du sélecteur d'option
        var p_opt = document.createElement("div");
        var p_opt_text = document.createTextNode("Option(s) :");
        
        p_opt.appendChild(p_opt_text);
        
        for (var i = 0; i < this.optType.length-1; i++)
        {
            var div_opt_checkbox = document.createElement("div");
            div_opt_checkbox.style.display = "inline-block";
            div_opt_checkbox.style.marginRight = "5px";
            var p_opt_checkbox = document.createElement("input");
            p_opt_checkbox.type = "checkbox";
            p_opt_checkbox.id = "p_opt_checkbox"+id+"_"+i;
            p_opt_desc = document.createTextNode(this.optDescrip[i]);
            div_opt_checkbox.appendChild(p_opt_checkbox);
            div_opt_checkbox.appendChild(p_opt_desc);
            p_opt.appendChild(div_opt_checkbox);
            
        }
        
        // Ajoute l'option "noanalyzeprint" pour ne pas afficher l'analyse de la réponse
        // à la fin pour qu'elle soit sur la ligne suivante
        
        var div_opt_checkbox = document.createElement("div");
        div_opt_checkbox.style.display = "inline-block";
        div_opt_checkbox.style.marginRight = "5px";
        var p_opt_checkbox = document.createElement("input");
        p_opt_checkbox.type = "checkbox";
        p_opt_checkbox.id = "p_opt_checkbox"+id+"_"+i;
        p_opt_desc = document.createTextNode(this.optDescrip[this.optType.length-1]);
        div_opt_checkbox.appendChild(p_opt_checkbox);
        div_opt_checkbox.appendChild(p_opt_desc);
        p_opt.appendChild(document.createElement("div"));
        p_opt.appendChild(div_opt_checkbox);
        
        div.appendChild(p_res);
        div.appendChild(txt);
        div.appendChild(p_opt);

		var editeurVar = new Editeur(txt.id, rucheSys,true);
		rucheSys.listeEditeur.push(editeurVar);

	}


	//---------------------------------//


	this.recupDonnees = function()
	/*
	 * Fonction qui permet de récupérer la valeur donnée à notre réponse de type correspond.
	 *
	 */
	{
		this.resultat = document.getElementById("RidAnBlocRep_Chaine_Analyse_"+this.nom).value;
	}
    
    //---------------------------------//
    
    this.statusOptionsCheck= function()
    /*
     * Enregistre l'état des boutons d'option. Utilisé lors de la sauvegarde
     */
    {
        for (var i = 0; i< this.optType.length; i++)
        {
            this._status_options_sauv.push($("#p_opt_checkbox"+this.nom+"_"+i)[0].checked);
        }
    }
    
    //---------------------------------//
    
    this.statusOptionsCharge= function(_status_options)
    /*
     * Rétablit l'état des boutons d'option à partir d'une sauvegarde
     */
    {
        for (var i = 0; i< this.optType.length; i++)
        {
            $("#p_opt_checkbox"+this.nom+"_"+i)[0].checked = _status_options[i];
        }
    }
    
    
    //---------------------------------//
    
}
// options valables pour ce type
Correspond.prototype.optType = ["split","noanalyzeprint"];
Correspond.prototype.optDescrip = ["accepte correspondance partielle","sans affichage de l'analyse réponse"];


////////////////////////////////////////////////////////////////////////////////


/*
 * Classe Case :
 * Permet de traiter la réponse qui a pour type "case".
*/

function Case(nom){

	//--------- ATTRIBUTS ---------//

	this.typ = "case";		// type de la réponse
	this.resultat = "";		// résultat de la réponse.
	this.nom = nom;			// nom de la réponse qui est associé à ce type.
	this.valeur = ""; 		// valeur de notre réponse case.
    this._status_options_sauv = []; // etat des boutons d'option pour la sauvegarde uniquement


	//--------- METHODES ----------//

	this.creerBloc = function(id)
	/*
	 * Fonction qui permet de créer un bloc dans l'onglet analyse
	 * spécifique pour une réponse de type case.
	 * Paramètre(s) : 	- id : nom de la réponse.
	 */
	{
		nom = "RidAnBlocRep_Interne_"+id;
        
        // Enlève tout ce qui suit le sélecteur
        var divContent = $("#RidAnBlocRep_Interne_"+id).children();
        var indexSelect = $("#RidAnBlocRep_Choix_Type_Reponse_"+id).index();
        for (var i=indexSelect+1; i<divContent.length;i++)
        {
            divContent.eq(i).remove();
        }
        
        // Construit le bloc en fonction du type
        var div = $("#"+nom)[0];
        var select = $("#RidAnBlocRep_Choix_Type_Reponse_"+id)[0].id;
		

		var txt = document.createElement('div');
		//txt.id = "edit"+id;
		txt.className = "Rcl_Droppable";

		txt.style.border = "1px grey solid";
		txt.id = "RidAnBlocRep_Chaine_Analyse_"+id;

		var p_res = document.createElement("div");
		p_res.innerHTML = "Chaîne d'analyse : ";
		p_res.id="RidAnBlocRep_Par1_"+id;
        
        // Création du sélecteur d'option
        var p_opt = document.createElement("div");
        var p_opt_text = document.createTextNode("Option(s) :");
        
        p_opt.appendChild(p_opt_text);
        
        for (var i = 0; i < this.optType.length-1; i++)
        {
            var div_opt_checkbox = document.createElement("div");
            div_opt_checkbox.style.display = "inline-block";
            div_opt_checkbox.style.marginRight = "5px";
            var p_opt_checkbox = document.createElement("input");
            p_opt_checkbox.type = "checkbox";
            p_opt_checkbox.id = "p_opt_checkbox"+id+"_"+i;
            p_opt_desc = document.createTextNode(this.optDescrip[i]);
            div_opt_checkbox.appendChild(p_opt_checkbox);
            div_opt_checkbox.appendChild(p_opt_desc);
            p_opt.appendChild(div_opt_checkbox);
            
        }
        
        // Ajoute l'option "noanalyzeprint" pour ne pas afficher l'analyse de la réponse
        // à la fin pour qu'elle soit sur la ligne suivante
        
        var div_opt_checkbox = document.createElement("div");
        div_opt_checkbox.style.display = "inline-block";
        div_opt_checkbox.style.marginRight = "5px";
        var p_opt_checkbox = document.createElement("input");
        p_opt_checkbox.type = "checkbox";
        p_opt_checkbox.id = "p_opt_checkbox"+id+"_"+i;
        p_opt_desc = document.createTextNode(this.optDescrip[this.optType.length-1]);
        div_opt_checkbox.appendChild(p_opt_checkbox);
        div_opt_checkbox.appendChild(p_opt_desc);
        p_opt.appendChild(document.createElement("div"));
        p_opt.appendChild(div_opt_checkbox);
        
        div.appendChild(p_res);
        div.appendChild(txt);
        div.appendChild(p_opt);

		var editeurVar = new Editeur(txt.id, rucheSys,true);
		rucheSys.listeEditeur.push(editeurVar);

	}


	//---------------------------------//


	this.recupDonnees = function()
	/*
	 * Fonction qui permet de récupérer la valeur donnée à notre réponse de type case.
	 *
	 */
	{
		this.resultat = document.getElementById("RidAnBlocRep_Chaine_Analyse_"+this.nom).value;
	}
    
    //---------------------------------//
    
    this.statusOptionsCheck= function()
    /*
     * Enregistre l'état des boutons d'option. Utilisé lors de la sauvegarde
     */
    {
        for (var i = 0; i< this.optType.length; i++)
        {
            this._status_options_sauv.push($("#p_opt_checkbox"+this.nom+"_"+i)[0].checked);
        }
    }
    
    //---------------------------------//
    
    this.statusOptionsCharge= function(_status_options)
    /*
     * Rétablit l'état des boutons d'option à partir d'une sauvegarde
     */
    {
        for (var i = 0; i< this.optType.length; i++)
        {
            $("#p_opt_checkbox"+this.nom+"_"+i)[0].checked = _status_options[i];
        }
    }
    
    
    //---------------------------------//
    
}
// options valables pour ce type
Case.prototype.optType = ["noanalyzeprint"];
Case.prototype.optDescrip = ["sans affichage de l'analyse réponse"];


////////////////////////////////////////////////////////////////////////////////


/*
 * Classe Menu :
 * Permet de traiter la réponse qui a pour type "menu".
 */

function Menu(nom){
    
    //--------- ATTRIBUTS ---------//
    
    this.typ = "menu";		// type de la réponse
    this.resultat = "";		// résultat de la réponse.
    this.nom = nom;			// nom de la réponse qui est associé à ce type.
    this.valeur = ""; 		// valeur de notre réponse case.
    this._status_options_sauv = []; // etat des boutons d'option pour la sauvegarde uniquement
    
    
    //--------- METHODES ----------//
    
    this.creerBloc = function(id)
    /*
     * Fonction qui permet de créer un bloc dans l'onglet analyse
     * spécifique pour une réponse de type menu.
     * Paramètre(s) : 	- id : nom de la réponse.
     */
    {
        nom = "RidAnBlocRep_Interne_"+id;
        
        // Enlève tout ce qui suit le sélecteur
        var divContent = $("#RidAnBlocRep_Interne_"+id).children();
        var indexSelect = $("#RidAnBlocRep_Choix_Type_Reponse_"+id).index();
        for (var i=indexSelect+1; i<divContent.length;i++)
        {
            divContent.eq(i).remove();
        }
        
        // Construit le bloc en fonction du type
        var div = $("#"+nom)[0];
        var select = $("#RidAnBlocRep_Choix_Type_Reponse_"+id)[0].id;
        
        
        var txt = document.createElement('div');
        //txt.id = "edit"+id;
        txt.className = "Rcl_Droppable";
        
        txt.style.border = "1px grey solid";
        txt.id = "RidAnBlocRep_Chaine_Analyse_"+id;
        
        var p_res = document.createElement("div");
        p_res.innerHTML = "Chaîne d'analyse : ";
        p_res.id="RidAnBlocRep_Par1_"+id;
        
        // Création du sélecteur d'option
        var p_opt = document.createElement("div");
        var p_opt_text = document.createTextNode("Option(s) :");
        
        p_opt.appendChild(p_opt_text);
        
        for (var i = 0; i < this.optType.length-1; i++)
        {
            var div_opt_checkbox = document.createElement("div");
            div_opt_checkbox.style.display = "inline-block";
            div_opt_checkbox.style.marginRight = "5px";
            var p_opt_checkbox = document.createElement("input");
            p_opt_checkbox.type = "checkbox";
            p_opt_checkbox.id = "p_opt_checkbox"+id+"_"+i;
            p_opt_desc = document.createTextNode(this.optDescrip[i]);
            div_opt_checkbox.appendChild(p_opt_checkbox);
            div_opt_checkbox.appendChild(p_opt_desc);
            p_opt.appendChild(div_opt_checkbox);
            
        }
        
        // Ajoute l'option "noanalyzeprint" pour ne pas afficher l'analyse de la réponse
        // à la fin pour qu'elle soit sur la ligne suivante
        
        var div_opt_checkbox = document.createElement("div");
        div_opt_checkbox.style.display = "inline-block";
        div_opt_checkbox.style.marginRight = "5px";
        var p_opt_checkbox = document.createElement("input");
        p_opt_checkbox.type = "checkbox";
        p_opt_checkbox.id = "p_opt_checkbox"+id+"_"+i;
        p_opt_desc = document.createTextNode(this.optDescrip[this.optType.length-1]);
        div_opt_checkbox.appendChild(p_opt_checkbox);
        div_opt_checkbox.appendChild(p_opt_desc);
        p_opt.appendChild(document.createElement("div"));
        p_opt.appendChild(div_opt_checkbox);
        
        div.appendChild(p_res);
        div.appendChild(txt);
        div.appendChild(p_opt);
        
        var editeurVar = new Editeur(txt.id, rucheSys,true);
        rucheSys.listeEditeur.push(editeurVar);
        
    }
    
    
    //---------------------------------//
    
    
    this.recupDonnees = function()
    /*
     * Fonction qui permet de récupérer la valeur donnée à notre réponse de type case.
     *
     */
    {
        this.resultat = document.getElementById("RidAnBlocRep_Chaine_Analyse_"+this.nom).value;
    }
    
    //---------------------------------//
    
    this.statusOptionsCheck= function()
    /*
     * Enregistre l'état des boutons d'option. Utilisé lors de la sauvegarde
     */
    {
        for (var i = 0; i< this.optType.length; i++)
        {
            this._status_options_sauv.push($("#p_opt_checkbox"+this.nom+"_"+i)[0].checked);
        }
    }
    
    //---------------------------------//
    
    this.statusOptionsCharge= function(_status_options)
    /*
     * Rétablit l'état des boutons d'option à partir d'une sauvegarde
     */
    {
        for (var i = 0; i< this.optType.length; i++)
        {
            $("#p_opt_checkbox"+this.nom+"_"+i)[0].checked = _status_options[i];
        }
    }
    
    
    //---------------------------------//
    
}
// options valables pour ce type
Menu.prototype.optType = ["split","shuffle","multiple=","sort","noanalyzeprint"];
Menu.prototype.optDescrip = ["accepte les réponses partielles","bat aléatoirement les propositions","choix multiple","tri des propositions","sans affichage de l'analyse réponse"];


////////////////////////////////////////////////////////////////////////////////


/*
 * Classe AutreRep :
 * Permet de traiter la réponse qui a pour type "case".
*/

function AutreRep(nom){

	//--------- ATTRIBUTS ---------//

	this.typ = "AutreRep";	// type de la réponse
	this.resultat = "";		// résultat de la réponse.
	this.nom = nom;			// nom de la réponse qui est associé à ce type.
	this.valeur = ""; 		// valeur de notre réponse numeric.
    this._status_options_sauv = []; // etat des boutons d'option pour la sauvegarde uniquement


	//--------- METHODES ----------//

	this.creerBloc = function(id,data)
	/*
	 * Fonction qui permet de créer un bloc dans l'onglet analyse
	 * spécifique pour une réponse de type autre.
	 * Paramètre(s) : 	- id : nom de la réponse.
	 */
	{

		nom = "RidAnBlocRep_Interne_"+id;
        
        // Enlève tout ce qui suit le sélecteur
        var divContent = $("#RidAnBlocRep_Interne_"+id).children();
        var indexSelect = $("#RidAnBlocRep_Choix_Type_Reponse_"+id).index();
        for (var i=indexSelect+1; i<divContent.length;i++)
        {
            divContent.eq(i).remove();
        }
        
        // Construit le bloc en fonction du type
        var div = $("#"+nom)[0];
        var select = $("#RidAnBlocRep_Choix_Type_Reponse_"+id)[0].id;
		
		var typ = document.createElement('input');
		typ.id = "typ"+id;

		var txt = document.createElement('div');
		//txt.id = "edit"+id;
		txt.className = "Rcl_Droppable";

		txt.style.border = "1px grey solid";
		txt.id = "RidAnBlocRep_Chaine_Analyse_"+id;

		var p_res = document.createElement("div");
		p_res.innerHTML = "Chaîne d'analyse : ";
		p_res.id="RidAnBlocRep_Par1_"+id;
        
        // Création du sélecteur d'option
        var p_opt = document.createElement("div");
        var p_opt_text = document.createTextNode("Option(s) :");
        
        p_opt.appendChild(p_opt_text);
        
        for (var i = 0; i < this.optType.length-1; i++)
        {
            var div_opt_checkbox = document.createElement("div");
            div_opt_checkbox.style.display = "inline-block";
            div_opt_checkbox.style.marginRight = "5px";
            var p_opt_checkbox = document.createElement("input");
            p_opt_checkbox.type = "checkbox";
            p_opt_checkbox.id = "p_opt_checkbox"+id+"_"+i;
            p_opt_desc = document.createTextNode(this.optDescrip[i]);
            div_opt_checkbox.appendChild(p_opt_checkbox);
            div_opt_checkbox.appendChild(p_opt_desc);
            p_opt.appendChild(div_opt_checkbox);
            
        }
        
        // Ajoute l'option "noanalyzeprint" pour ne pas afficher l'analyse de la réponse
        // à la fin pour qu'elle soit sur la ligne suivante
        
        var div_opt_checkbox = document.createElement("div");
        div_opt_checkbox.style.display = "inline-block";
        div_opt_checkbox.style.marginRight = "5px";
        var p_opt_checkbox = document.createElement("input");
        p_opt_checkbox.type = "checkbox";
        p_opt_checkbox.id = "p_opt_checkbox"+id+"_"+i;
        p_opt_desc = document.createTextNode(this.optDescrip[this.optType.length-1]);
        div_opt_checkbox.appendChild(p_opt_checkbox);
        div_opt_checkbox.appendChild(p_opt_desc);
        p_opt.appendChild(document.createElement("div"));
        p_opt.appendChild(div_opt_checkbox);
        
		
		div.appendChild(typ);
        div.appendChild(p_res);
        div.appendChild(txt);
        div.appendChild(p_opt);

		var editeurVar = new Editeur(txt.id, rucheSys,true);
		rucheSys.listeEditeur.push(editeurVar);

		if ( data != null )
		{
			document.getElementById("typ"+id).value = data.valeur;
		}

	}


	//---------------------------------//


	this.recupTyp = function()
	/*
	 * Fonction qui permet de récupérer la valeur donnée à notre réponse de type numeric.
	 *
	 */
	{
		this.valeur = document.getElementById("typ"+this.nom).value;
		return this.valeur;
	}
    
    //---------------------------------//
    
    this.statusOptionsCheck= function()
    /*
     * Enregistre l'état des boutons d'option. Utilisé lors de la sauvegarde
     */
    {
        for (var i = 0; i< this.optType.length; i++)
        {
            this._status_options_sauv.push($("#p_opt_checkbox"+this.nom+"_"+i)[0].checked);
        }
    }
    
    //---------------------------------//
    
    this.statusOptionsCharge= function(_status_options)
    /*
     * Rétablit l'état des boutons d'option à partir d'une sauvegarde
     */
    {
        for (var i = 0; i< this.optType.length; i++)
        {
            $("#p_opt_checkbox"+this.nom+"_"+i)[0].checked = _status_options[i];
        }
    }
    
    
    //---------------------------------//
    
}
// options valables pour ce type
AutreRep.prototype.optType = ["noanalyzeprint"];
AutreRep.prototype.optDescrip = ["sans affichage de l'analyse réponse"];


////////////////////////////////////////////////////////////////////////////////


/*
 * Classe EssaimRep :
 * Interface pour les réponses de type "Essaim".
 */

function EssaimRep(nom,nomEssaimGerant,elem){
    
    //--------- ATTRIBUTS ---------//
    
    this.typ = "Essaim";	// type de la réponse
    this.resultat = "";		// résultat de la réponse.
    this.nom = nom;			// nom de la réponse qui est associée à l'instance.
    this.valeur = ""; 		// valeur de notre réponse numeric.
    this.nomEssaimGerant = nomEssaimGerant; // nom de l'essaim gérant cette réponse
                            // ATTENTION : cette valeur ne DOIT PAS être modifiée par
                            // un appel autre que depuis la classe Reponse
    
                            // Serait bien plus logique si la classe dérivait de la classe Reponse.
    
                            // ****************   A changer à l'avenir...   **************
    
    //--------- METHODES ----------//
    
    this.creerBloc = function(id,dataRecup)
    /*
     * Fonction qui permet de créer un bloc dans l'onglet analyse
     * spécifique pour une réponse de type essaim.
     * Paramètre(s) : 	- id : nom de la réponse.
     *                  - dataRecup : élément JSON à copier pour restauration
     */
    {
        // Récupère un pointeur sur l'essaim qui gère cette réponse
        var ind = rucheSys.rechercheIndice(this.nomEssaimGerant,rucheSys.listeBlocPrepa);
        
        rucheSys.listeBlocPrepa[ind].creerBlocReponse(dataRecup);
    }
    
    this.sauveEtatInterface = function()
    /*
     * Sauvegarde l'état de l'interface dans l'objet Essaim gérant cette réponse
     * sert pour la sauvegarde.
     */
    {
        // Récupère un pointeur sur l'essaim qui gère cette réponse
        var ind = rucheSys.rechercheIndice(this.nomEssaimGerant,rucheSys.listeBlocPrepa);
        
        rucheSys.listeBlocPrepa[ind].sauveEtatInterfaceReponse();
    }
    
    this.chargeEtatInterfaceReponse = function(elem)
    /*
     * Chargement de l'état de l'interface réponse dans l'objet Essaim gérant cette réponse
     */
    {
        var ind = rucheSys.rechercheIndice(this.nomEssaimGerant,rucheSys.listeBlocPrepa);
        
        rucheSys.listeBlocPrepa[ind].chargeEtatInterfaceReponse(elem);
    }
    
    this.toOEF = function()
    /*
     * Fonction qui appelle la fonction de génération du code OEF correspondant
     * à la réponse gérée par l'essaim dans l'analyse
     */
    {
        // Récupère un pointeur sur l'essaim qui gère cette réponse
        var ind = rucheSys.rechercheIndice(this.nomEssaimGerant,rucheSys.listeBlocPrepa);
        
        return rucheSys.listeBlocPrepa[ind].toOEFFromAnswer();
    }
    
    
    this.recupTyp = function()
    /*
     * Fonction qui permet de récupérer la valeur donnée à notre réponse de type numeric.
     *
     */
    {
        this.valeur = document.getElementById("typ"+this.nom).value;
        return this.valeur;
    }
   
    //---------------------------------//
    
    
}