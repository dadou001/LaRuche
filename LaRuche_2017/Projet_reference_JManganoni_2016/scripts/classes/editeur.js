/*
 * Classe Editeur :
 * Gère nos éditeurs. 
 * paramètres constructeur : 
 * id : id de l'éditeur
 * ruc : Objet ruche principal
 * bool : Booléen qui vaut faux si l'éditeur est celui de l'enoncé , vrai si c'est un éditeur secondaire ( présent dans les blocs préparation/analyse )
 * toolbar : paramètre qui est null si l'éditeur n'a pas de barre de tâche , ou une valeur pour indiquer quel type de barre de tâche nous devons créer
*/


function Editeur(id,ruc,bool,toolbar){

	//--------- ATTRIBUTS ---------//

    console.log("NCréeation de l'éditeur : "+id);
	//this.zonedeTexte = editor.getHTML();
	this.nom = id;				// id de notre éditeur (pour savoir sur lequel on est)
	this.enonce_Txt = "";		// texte de l'éditeur
	this.enonce_Html = "";		// texte de l'éditeur en html
	this.enonce_Html_sauve = ""; // texte de l'éditeur avant modification OEF
//	this.systm = ruc; // <--- delete
	this.selection = "";

	if (bool)
    {
        // Création de l'éditeur QUILL
        this.edit = new Quill("#"+id, {
                              styles: {
                              '.ql-container': {
                              'padding': '5px'
                              }
                              }
                              });
//        $("#"+id).bind('blur change click dblclick error focus focusin focusout hover keydown keypress keyup load mousedown mouseenter mouseleave mousemove mouseout mouseover mouseup resize scroll select submit', function(event){
//                           event.stopPropagation();
//                       console.log("stopped propagation of "+event.type);
//                           });

		this.edit.on('selection-change', function(range) {
            if(range){
                var bloc_pere =document.getElementById("Rid_Prep_Vars");
                bloc_pere.setAttribute("focusedit",id);
                var bloc_pere2 =document.getElementById("Rid_Analyse_Vars");
                bloc_pere2.setAttribute("focusedit",id);
                document.getElementById(id).style.backgroundColor="LightCyan";
                     console.log('small editor selection change', range);
            }
            else{
                document.getElementById(id).style.backgroundColor="";
                     console.log('small editor selection change : no range');
                     }
		});
		
		this.edit.on('text-change', function(delta, source) {
            var txt=document.getElementById(id);
            console.log('old result: ',delta.length());
            txt.value=document.getElementById(id).textContent;
            
            console.log('small editor text-change', delta, source)
		});
	}


	//--------- METHODES du constructeur ---------//


	this.ajoutToolbar1 = function(id,param)
	/*
	 * Fonction qui permet d'ajouter la barre de tache qui contient en plus les boutons Latex et Code Libre'
	 */
	{

		var button_codeLibre = document.createElement("button");
		button_codeLibre.innerHTML = "Libre";
		button_codeLibre.className = "Rcl_Editor_Button_Libre";
		button_codeLibre.id="Rid_Editor_Button_Libre_" + this.nom;
		button_codeLibre.onclick=function(){
			var nom = this.id.slice("Rid_Editor_Button_Libre_".length,this.id.length);
			rucheSys.etiqueterTexteEnCodeLibre(nom);
		}
		var button_latex = document.createElement("button");
		button_latex.id = "Rid_Editor_Button_Latex_"+this.nom;
		button_latex.innerHTML = "Latex";
		button_latex.className = "Rcl_Editor_Button_Latex";
        button_latex.style.backgroundColor = "#e5e0e5";
		button_latex.onclick=function(){
			var nom = this.id.slice("Rid_Editor_Button_Latex_".length,this.id.length);

			rucheSys.etiqueterTexteEnLatex(nom);

		}

		var element = "<button title=\"Bold\" class=\"ql-bold\"></button><span class=\"bouton-separateur\"></span><button title=\"Italic\" class=\"ql-italic\"></button><span class=\"bouton-separateur\"></span><button title=\"Underline\" class=\"ql-underline\"></button><span class=\"bouton-separateur\"></span><button title=\"Strikethrough\" class=\"ql-strike\"></button><span class=\"bouton-separateur\"></span><button title=\"Link\" class=\"ql-link\"></button><span class=\"bouton-separateur\"></span><button title=\"Image\" class=\"ql-image\"></button><span class=\"bouton-separateur\"></span><button title=\"Bullet\" class=\"ql-bullet\"></button><span class=\"bouton-separateur\"></span><button title=\"List\" class=\"ql-list\"></button><select title=\"Font\" class=\"ql-font\"><option value=\"sans-serif\" selected>Sans Serif</option><option value=\"Georgia, serif\">Serif</option><option value=\"Monaco, 'Courier New', monospace\">Monospace</option></select><span class=\"bouton-separateur\"></span><select title=\"Text Alignment\" class=\"ql-align\"><option value=\"left\" selected>Left</option><option value=\"center\">Center</option><option value=\"right\">Right</option><option value=\"justify\">Justify</option></select>"

		var div = document.getElementById(id);
		div.innerHTML = element;
		div.appendChild(button_latex);
		div.appendChild(button_codeLibre);
	}


	//---------------------------------//


	this.ajoutToolbar2 = function(id,param)
	/*
	 * Fonction qui permet d'ajouter la barre de tache qui contient en plus les boutons Latex'
	 */
	{

		var button_latex = document.createElement("button");
		button_latex.id = "Rid_Editor_Button_Latex_"+this.nom;
		button_latex.innerHTML = "Latex";
		button_latex.className = "Rcl_Editor_Button_Latex";
		button_latex.onclick=function(){
			var nom = this.id.slice("Rid_Editor_Button_Latex_".length,this.id.length);
			rucheSys.etiqueterTexteEnLatex(nom);

		}

		var element = "<button title=\"Bold\" class=\"ql-bold\"></button><span class=\"bouton-separateur\"></span><button title=\"Italic\" class=\"ql-italic\"></button><span class=\"bouton-separateur\"></span><button title=\"Underline\" class=\"ql-underline\"></button><span class=\"bouton-separateur\"></span><button title=\"Strikethrough\" class=\"ql-strike\"></button><span class=\"bouton-separateur\"></span><button title=\"Link\" class=\"ql-link\"></button><span class=\"bouton-separateur\"></span><button title=\"Image\" class=\"ql-image\"></button><span class=\"bouton-separateur\"></span><button title=\"Bullet\" class=\"ql-bullet\"></button><span class=\"bouton-separateur\"></span><button title=\"List\" class=\"ql-list\"></button><select title=\"Font\" class=\"ql-font\"><option value=\"sans-serif\" selected>Sans Serif</option><option value=\"Georgia, serif\">Serif</option><option value=\"Monaco, 'Courier New', monospace\">Monospace</option></select><span class=\"bouton-separateur\"></span><select title=\"Text Alignment\" class=\"ql-align\"><option value=\"left\" selected>Left</option><option value=\"center\">Center</option><option value=\"right\">Right</option><option value=\"justify\">Justify</option></select>"

		var div = document.getElementById(id);
		div.innerHTML = element;
		div.appendChild(button_latex);
	}


	//--------- Suite Constructeur ---------//


	if (toolbar == 1)
	{
		this.ajoutToolbar1("toolbar_"+this.nom,toolbar);
		var nom = "toolbar_"+this.nom;

		this.edit.addModule('toolbar' , {container: '#toolbar_'+this.nom});
		this.edit.addModule('link-tooltip' , true);
		this.edit.addModule('image-tooltip' , true);

		
	}
	if (toolbar == 2){
		this.ajoutToolbar2("toolbar_"+this.nom,toolbar);
		var nom = "toolbar_"+this.nom;
		this.edit.addModule('toolbar' , {container: '#toolbar_'+this.nom});
		this.edit.addModule('link-tooltip' , true);
		this.edit.addModule('image-tooltip' , true);

	}


	//--------- METHODES ----------//	


	this.colorieEnVar = function(sel0)
	/* 
	 * Fonction qui, lorsqu'on ajoute une variable, lui donne une couleur à l'aide
	 * d'un span dans ** l'éditeur principal **.
	 * Paramètre(s) : 	- sel0 : variable à ajouter dans l'éditeur.
	 */
	{
	
		var range2 = editor.getSelection();
		var range = editor.getText(range2.start,range2.end);

		i = 0;

		// Boucle pour retirer de la sélection les espaces avant la variable et aprés.
		txt = range.toString().charAt(i);
		while(txt == ' ')
		{	
			range2.start ++;
			editor.setSelection(range2.start,range2.end);
			i++;
			txt = range.toString().charAt(i);
			
		}
		i = range.toString().length-1;
		txt = range.toString().charAt(i);
		while (txt ==' ')
		{
			range2.end --;
			editor.setSelection(range2.start,range2.end);
			i --;
			txt = range.toString().charAt(i);
		}

		
		var range = window.getSelection().getRangeAt(0);
		var nom = "span"+sel0;
		var selectionContents = range.extractContents();
		
		var span = document.createElement("span");

		span.style.backgroundColor = 'rgb(175,217,235)';
		span.id = nom;
		span.className = "Rcl_Surligne_Variable Rcl_Variable_In_Editor_"+sel0;
		/************************************************************************************/

		var spanBloquant = document.createElement("span");
		
		spanBloquant.contentEditable = false;
		span.contentEditable = false;
		
		span.addEventListener("keydown", function(event)
		{

			var key = event.keyCode || event.which;

			if(key == 46 || key == 8)
			{
				event.target.parentNode.removeChild(event.target);
				var tmp = event.target.id;
				var nomVar = tmp.slice("span".length, tmp.length);
				
				var edit = document.getElementById("ql-editor-1");
				var tabVar = edit.getElementsByClassName("Rcl_Variable_In_Editor_"+nomVar);

				if (tabVar.length == 0)
				{
					var tmp = event.target.id;
					
					var nomVar = tmp.slice("span".length, tmp.length);
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
			else
			{
				event.preventDefault();
				return false;
			}

		}
		, false
		);

		span.appendChild(selectionContents);
		spanBloquant.appendChild(span);
		range.insertNode(spanBloquant);

		var taille = editor.getLength();

		if ( taille == range2.end + 1 )
		{
			editor.insertText(range2.end," ");
			editor.setSelection(range2.end + 1,range2.end + 1);
		}
	}


	//---------------------------------//


	this.colorieEnVarSecondaire = function(sel0)
	/* 
	 * Fonction qui, lorsqu'on ajoute une variable, lui donne une couleur à l'aide
	 * d'un span dans ** un éditeur secondaire **.
	 * Paramètre(s) : 	- sel0 : variable à ajouter dans l'éditeur.
	 */
	{
		
		var range2 = this.edit.getSelection();
		var range = this.edit.getText(range2.start,range2.end);

		i = 0;
		txt = range.toString().charAt(i);


		// Boucle pour retirer le séléctionneur des espaces avant la variable , et aprés.
		while(txt == ' ')
		{	
			range2.start ++;
			this.edit.setSelection(range2.start,range2.end);
			i++;
			txt = range.toString().charAt(i);
			
		}
		i = range.toString().length-1;
		txt = range.toString().charAt(i);
		while (txt ==' ')
		{
			range2.end --;
			this.edit.setSelection(range2.start,range2.end);
			i --;
			txt = range.toString().charAt(i);
		}

		
		var range = window.getSelection().getRangeAt(0);
		var nom = "span"+sel0;
		var selectionContents = range.extractContents();
		
		var span = document.createElement("span");

		span.style.backgroundColor = 'rgb(175,217,235)';
		span.id = nom;
		span.className = "Rcl_Surligne_Variable Rcl_Variable_In_Editor_"+sel0;
		/************************************************************************************/

		var spanBloquant = document.createElement("span");
		
		spanBloquant.contentEditable = false;
		span.contentEditable = false;
		
		span.addEventListener("keydown", function(event)
		{

			var key = event.keyCode || event.which;

			if(key == 46 || key == 8)
			{
				event.target.parentNode.removeChild(event.target);
				var nomVar = event.target.textContent;
				
				var edit = document.getElementById("ql-editor-1");
				var tabVar = edit.getElementsByClassName("Rcl_Variable_In_Editor_"+nomVar);

				if (tabVar.length == 0)
				{
					var nomVar = event.target.textContent;
					var indice = rucheSys.rechercheIndice(nomVar, rucheSys.listeVariables);
					
					rucheSys.supprimeBlocHtml(rucheSys.listeVariables[indice].nom);
					rucheSys.supprVarDansEditeur(nomVar);
					rucheSys.supprVarDuMenuListePreparation(nomVar);
					rucheSys.listeVariables.splice(indice, 1);				
				
				}
				
			}
			else
			{
				event.preventDefault();
				return false;
			}

		}
		, false
		);

		span.appendChild(selectionContents);
		spanBloquant.appendChild(span);
		range.insertNode(spanBloquant);

		var taille = this.edit.getLength();

		//Ajout d'un espace pour sortir de la span ( ne plus écrire en couleur cyan ) si l'on se trouve à la fin du texte.		
		if ( taille == range2.end + 1 )
		{
			
			this.edit.insertText(range2.end," ");
			this.edit.setSelection(range2.end + 1,range2.end + 1);
		}
	}


    //---------------------------------//
    

    this.ajoutCouleurComposant = function(sel0)
    /*
     * Fonction qui, lorsqu'on ajoute un composant dans un éditeur, lui donne une couleur à l'aide
     * d'un span dans l'éditeur..
     * Paramètre(s) : 	- sel0 : variable à ajouter dans l'éditeur.
     */
    {
        
        var range2 = this.edit.getSelection();
        var range = this.edit.getText(range2.start,range2.end);
        
        i = 0;
        
        // Boucle pour retirer de la sélection les espaces avant la variable et aprés.
        txt = range.toString().charAt(i);
        while(txt == ' ')
        {
            range2.start ++;
            editor.setSelection(range2.start,range2.end);
            i++;
            txt = range.toString().charAt(i);
            
        }
        i = range.toString().length-1;
        txt = range.toString().charAt(i);
        while (txt ==' ')
        {
            range2.end --;
            this.edit.setSelection(range2.start,range2.end);
            i --;
            txt = range.toString().charAt(i);
        }
        
        
        var range = window.getSelection().getRangeAt(0);
        var nom = "spanComposant"+sel0;
        var selectionContents = range.extractContents();
        
        var span = document.createElement("span");
        
        span.style.backgroundColor = 'rgb(217,177,237)';
        span.id = nom;
        span.className = "Rcl_Surligne_Composant Rcl_Variable_In_Editor_"+sel0;
        /************************************************************************************/
        
        var spanBloquant = document.createElement("span");
        
        spanBloquant.contentEditable = false;
        span.contentEditable = false;
        
        span.addEventListener("keydown", function(event)
        {
                              
            var key = event.keyCode || event.which;
                              
            if(key == 46 || key == 8)
            {
                event.target.parentNode.removeChild(event.target);
                var tmp = event.target.id;
                var nomComp = tmp.slice("spanComposant".length, tmp.length);
                              
                var edit = document.getElementById("ql-editor-1");
                var tabComp = edit.getElementsByClassName("Rcl_Variable_In_Editor_"+nomComp);
                if (tabComp.length == 0)
                {
                    var tmp = event.target.id;
                    var nomComp = tmp.slice("spanComposant".length, tmp.length);
                    var indice = rucheSys.rechercheIndice(nomComp, rucheSys.listeComposantEssaim);
                    rucheSys.compteComposantEssaim[indice]--;
                    if (rucheSys.compteComposantEssaim[indice] <= 0)
                    {
                        rucheSys.compteComposantEssaim.splice(indice, 1);
                        rucheSys.listeComposantEssaim.splice(indice, 1);
                    }
                }
            }
            else
            {
               event.preventDefault();
               return false;
            }
        }
        , false
        );

        span.appendChild(selectionContents);
        spanBloquant.appendChild(span);
        range.insertNode(spanBloquant);
        
        var taille = this.edit.getLength();
        
        if ( taille == range2.end + 1 )
        {
            this.edit.insertText(range2.end," ");
            this.edit.setSelection(range2.end + 1,range2.end + 1);
        }
    }
    

    //---------------------------------//

	
	this.insertVariableDansEditeur = function(sel0,dansEnonce)
	/* 
	 * Insertion d'une variable dans un éditeur, par défaut lui donne une couleur à l'aide
	 * d'un span dans l'éditeur
	 * Paramètre(s) : 	- sel0 : variable à ajouter dans l'éditeur.
	 */

	{
        console.log("Entrée dans insertVariable dans editeur (editeur)");
        // Récupère l'objet variable à partir du nom
        var objetVar = rucheSys.varObject(sel0);
        var typeVar = objetVar.format;
        
        console.log("Id du champs éditeur [editeur !!!] = " + this.nom)
        // Selon le type, insertion d'un span coloré ou d'un dessin ou...
        
        // Détermination du bon éditeur (énoncé ou secondaire)
        if (typeof dansEnonce != 'undefined') {
            var local_editor = editor;
        } else {
            var local_editor = this.edit;
        }
		local_editor.focus();
		
        // Cas de l'éditeur principal (énoncé) et PAS une variable de base
        if (typeof dansEnonce != 'undefined' && typeVar.proto != 'base_var' && typeVar.gereDessinEnonce == true) {
            
            var span = document.createElement("span");
            
            var range = window.getSelection().getRangeAt(0);
            var selectionContents = range.extractContents();
            
            span.className = "objetVar Rcl_Variable_In_Editor_"+sel0;
            span.contentEditable = false;
            
            span.innerHTML = typeVar.htmlDessinEnonce();
            
            span.appendChild(selectionContents);
            
            range.insertNode(span);
            
            var place = editor.getSelection();
            editor.setSelection(place.start+1, place.end+1);
            
        } else {
        // Cas d'un éditeur secondaire
            
            // Récupère la sélection
            
            console.log("Editeur secondaire");
            this.selection = local_editor.getSelection().start;
            var range1 = this.selection;
            
            local_editor.insertText(range1, sel0);
            
            var range2 = this.selection + sel0.length;
            
            local_editor.setSelection(range1,range2);
            
            var range = window.getSelection().getRangeAt(0);
            var selectionContents = range.extractContents();
            
            var span = document.createElement("span");
            span.style.backgroundColor = 'rgb(175,217,235)';
            
            span.className = "Rcl_Surligne_Variable Rcl_Variable_In_Editor_"+sel0;
            
            
            /*********************************************************************************/
            var spanBloquant = document.createElement("span");
            
            spanBloquant.contentEditable = false;
            span.contentEditable = false;
            
            span.addEventListener("keydown", function(event)
                                  {
                                  
                                  var key = event.keyCode || event.which;
                                  
                                  if(key == 46 || key == 8)
                                  {
                                  event.target.parentNode.removeChild(event.target);
                                  }
                                  else
                                  {
                                  event.preventDefault();
                                  return false;
                                  }
                                  
                                  }
                                  , false
                                  );
            
            span.appendChild(selectionContents);
            spanBloquant.appendChild(span);
            range.insertNode(spanBloquant);
            
            
            
            var taille = local_editor.getLength();
            if ( taille == range2 + 1)
            {
                local_editor.insertText(range2," ");
                local_editor.setSelection(range2 + 1,range2 + 1);
            }
        }
	}


	//---------------------------------//


	this.ajoutSpanRep = function(debut){
	/* 
	 * Fonction qui, lorsqu'on ajoute une réponse, ajoute une image dans l'éditeur
	 * Paramètre(s) : 	- debut : position du curseur dans l'éditeur
	 */
		var span = document.createElement("span");

		document.getElementById('ql-editor-1').focus();
		var range = window.getSelection().getRangeAt(0);


		var selectionContents = range.extractContents();		

		span.innerHTML = "<img id=\"reponse"+rucheSys.nb_reponse+"\" class=\"Rcl_Reponse_Supprimable\" src=\"reponse.png\"></img>";
			
		span.appendChild(selectionContents);

		range.insertNode(span);

		place = editor.getSelection();
		editor.setSelection(place.start+1, place.end+1);


	}


    //---------------------------------//
    
    
    this.ajoutImageEssaim = function(essaim){
        /*
         * Ajoute une image dans l'éditeur correspondant à l'action d'un essaim
         *
         * Paramètre(s) : 	- essaim : objet essaim qui doit envoyer l'image
         *
         */
        
        // Cherche la réponse gérée par cet essaim, si il y en a une
        if (essaim.gereReponse == true)
        {
            var nomRep = "";
            // teste toutes les réponses pour savoir laquelle est gérée par cet essaim
            for (var i=0; i<rucheSys.listeReponse.length; i++)
            {
                if (rucheSys.listeReponse[i].format != null) {
                    if (rucheSys.listeReponse[i].format.nomEssaimGerant == essaim.nom)
                    {
                        nomRep = rucheSys.listeReponse[i].format.nom;
                    }
                }
            }
            // si il y en a une, récupère son nom
            if (nomRep != "")
            {
                var clImEssaim = "Rcl_Reponse_Supprimable";
                var idImEssaim = nomRep;
            }
            else
            {
                console.log("***** Problème, essaim"+essaim.nom+"chargé de gérer une réponse, pas de réponse encore créée");
                return;
            }
        }
        else
        {
            // id de l'image si essaim ne gère pas de réponse : "essaimAAAAA_XX"
            // avec AAAAA = nom de l'essaim, XX = numéro de l'image, unique dans tout l'éditeur.
            rucheSys.nb_imageEssaim++;
            var clImEssaim = "";
            var idImEssaim = "essaim"+essaim.nom+"_"+rucheSys.nb_imageEssaim;
        }
        
        var span = document.createElement("span");

        document.getElementById('ql-editor-1').focus();
        var range = window.getSelection().getRangeAt(0);
        
        var selectionContents = range.extractContents();
        
        // Si l'essaim gère la taille de l'image, récupère celle-ci
        var tagsTailleImage = "";
        if (essaim.gereTailleImageEnonce == true) {
            var tagsTailleImage = "width=\""+essaim.tailleImageEnonceX+"\" height=\""+essaim.tailleImageEnonceY+"\"";
        }
        
        // classes d'image associées :
        //    - imEssaimXXXX, avec XXXX = type d'essaim (proto)
        //    - nomEssaimYYYY, avec YYYY = nom de l'essaim particulier
        // id de type "reponseZZ" avec ZZ = n° de la reponse associée
        span.innerHTML = "<img "+tagsTailleImage+" id=\""+idImEssaim+"\" class=\"imEssaim"+essaim.proto+" "+clImEssaim+" nomEssaim"+essaim.nom+"\" src=\""+essaim.imageEnonce+"\"></img>";
        
        span.appendChild(selectionContents);
        
        range.insertNode(span);
        
        var place = editor.getSelection();
        editor.setSelection(place.start+1, place.end+1);
    }
    
    
    
	//---------------------------------//


	this.recupDonnees = function()
	/*
	 * Fonction qui permet de récupérer l'éditeur sous forme de texte 
	 * et sous forme html.
	 *
	 */
	{
		this.enonce_Html = editor.getHTML();
		this.enonce_Html_sauve = this.enonce_Html;
		this.enonce_Txt = editor.getText();
	}


	//---------------------------------//

	
	this.recupDonneesVar = function()
	/*
	 * Fonction qui permet de récupérer l'éditeur sous forme de texte 
	 * et sous forme html.
	 *
	 */
	{
		this.enonce_Html = this.edit.getHTML()
		this.enonce_Html_sauve = this.enonce_Html;
		this.enonce_Txt = this.edit.getHTML();
	}


	//---------------------------------//
	

	this.replaceHTML = function()
	/*
	 * Fonction qui permet de convertir le contenu de l'éditeur en OEF.
	 *
	 */
	{
		var txt = this.enonce_Html;
		this.enonce_Html_sauve = this.enonce_Html;

		var regSpanFin = /<\/span>/;
		var nouv1 = /<span contenteditable="false">/;
		var nouv2 = /<span contenteditable="true">/;

		var regDivFin = /\<\/div>/;
		var change = /changement/;

		var sautligne = "<\/div>\n";

		var reg = /<\/span><div><br><\/div><span/;


		var nb = document.getElementsByTagName('span');

		for (var i = 0; i < nb.length; i++) {

			// si c'est du latex
			if (nb[i].style.backgroundColor == "rgb(255, 202, 143)") {

				var latex_int = nb[i].innerHTML;
				var latex_ext = nb[i].outerHTML;

				txt = txt.replace(latex_ext, "\\("+latex_int+"\\)");
			}

			// si c'est une variable
			if (nb[i].style.backgroundColor == "rgb(175, 217, 235)"){
				var var_int = nb[i].innerHTML;
				var var_ext = nb[i].outerHTML;

				txt = txt.replace(var_ext, "\\"+var_int);
			}

			// si c'est du code libre
			if (nb[i].style.backgroundColor == "rgb(252, 254, 142)"){
 				var libre_int = nb[i].textContent;
				var libre_ext = nb[i].outerHTML;

				txt = txt.replace(libre_ext, libre_int);

				txt = txt.replace("<div>"+libre_int+"</div>", libre_int+"\n");
			}
            

		};

    
        // Si c'est une image d'essaim connu
        var enonce_img_essaim = $('img[class^=imEssaim]'); // sélectionne toutes les images créées par un essaim
        
        for (var i = 0; i < enonce_img_essaim.length; i++)
        {
            var nspclLong = /imEssaim[a-zA-Z0-9_]*/.exec(enonce_img_essaim[i].className);
            if ( nspclLong !== null)
            {
                var nspcl = nspclLong[0].slice("imEssaim".length,nspclLong[0].length); // garde le nom du type d'essaim
                for (j=0; j<rucheSys.listeClasseEssaim.length; j++)
                {
                    if (nspcl == rucheSys.listeClasseEssaim[j].prototype.proto)
                    {
                        // retrouve l'objet essaim correspondant
                        var nspLong = /nomEssaim[a-zA-Z0-9_]*/.exec(enonce_img_essaim[i].className);
                        var nsp = nspLong[0].slice("nomEssaim".length,nspLong[0].length); // garde le nom de l'objet Essaim (enlève "nomEssaim" devant le nom)
                        var ind = rucheSys.rechercheIndice(nsp,rucheSys.listeBlocPrepa);
                        
                        // effectue la conversion
                        if ( /reponse[0-9]+/.test(enonce_img_essaim[i].id) || /^essaim/.test(enonce_img_essaim[i].id) ) {
                            var essaim_result = rucheSys.listeBlocPrepa[ind].toOEFFromStatement(enonce_img_essaim[i].id);
                        }
                        else
                        {
                            var essaim_result = "\n ***** Problème de génération de code par l'essaim "+rucheSys.listeBlocPrepa[ind].nom+" *****\n";
                        }
                        
                        // remplace dans le texte brut
                        var img_ext = enonce_img_essaim[i].outerHTML;
                        txt = txt.replace("<div>"+img_ext+"</div>", essaim_result);
                        txt = txt.replace(img_ext, essaim_result);
                    }
                }
            }
        }
        
        // Si c'est une image ou un span correspondant à une variable objet
        // (DessinFlydraw par exemple)
        var enonce_img_var_objet = $('img[id^=imVariable]'); // sélectionne toutes les images créées par une variable-objet
        for (var i = 0; i < enonce_img_essaim.length; i++)
        {
            // Récupération du type de variable-objet
            var nspclLong = /imObjetVar[a-zA-Z0-9_]*/.exec(enonce_img_essaim[i].className);
        
        }

		// si c'est une réponse
        var enonce_img_reponse = $('img[id^=reponse]'); // sélectionne les images correspondant à une réponse
        for (var i = 0; i < enonce_img_reponse.length; i++) {
            // gère les réponses mais pas celles créées par un essaim
            if ( !(/imEssaim/.test(enonce_img_reponse[i].className)) ) {
                var img_ext = enonce_img_reponse[i].outerHTML;
                var numReponse = $("#RidAnBlocRep_"+enonce_img_reponse[i].id).index()+1;
                txt = txt.replace(img_ext, "\\embed{reply"+numReponse+",10}");
            }
        }

		while (nouv1.test(txt)){
			txt = txt.replace(nouv1, '');
		}

		while (nouv2.test(txt)){
			txt = txt.replace(nouv2, '');
		}

		while (regSpanFin.test(txt)){
			txt = txt.replace(regSpanFin, '');
		}


		while (regDivFin.test(txt)){
			txt = txt.replace(regDivFin, "changement");
		}

		while (change.test(txt)){
			txt = txt.replace(change, sautligne);
		}

		txt = txt.replace(" [","[");

		this.enonce_Html = txt;
	}


	//---------------------------------//
	

	this.replaceHTMLVar = function()
	/* 
	 * Fonction qui permet de convertir un éditeur secondaire en OEF
	 */
	{

		var txt = this.enonce_Html;

		var regDivDebut = /<div>/;
		var regDivFin = /\<\/div>/;

		var regSpanFin = /<\/span>/;
		var nouv1 = /<span contenteditable="false">/;
		var nouv2 = /<span contenteditable="true">/;

		var br = /<div><br><\/div>/;

		var nb = document.getElementsByTagName('span');

		while (br.test(txt)){
			txt = txt.replace(br, '');
		}

		for (var i = 0; i < nb.length; i++) {

			// si c'est du latex
			if (nb[i].style.backgroundColor == "rgb(255, 202, 143)") {

				var latex_int = nb[i].innerHTML;
				var latex_ext = nb[i].outerHTML;

				txt = txt.replace(latex_ext, "\\("+latex_int+"\\)");
			}

			// si c'est une variable
			if (nb[i].style.backgroundColor == "rgb(175, 217, 235)"){
				var var_int = nb[i].innerHTML;
				var var_ext = nb[i].outerHTML;

				txt = txt.replace(var_ext, "\\"+var_int);
			}

			// si c'est du code libre
			if (nb[i].style.backgroundColor == "rgb(252, 254, 142)"){
				var libre_int = nb[i].textContent;
				var libre_ext = nb[i].outerHTML;


				txt = txt.replace(libre_ext, libre_int);

				txt = txt.replace("<div>"+libre_int+"</div>", libre_int+"\n");
			}
		};

		while (regDivDebut.test(txt)){
			txt = txt.replace(regDivDebut, '');
		}

		while (regDivFin.test(txt)){
			txt = txt.replace(regDivFin, '\n');
		}


		while (nouv1.test(txt)){
			txt = txt.replace(nouv1, '');
		}

		while (nouv2.test(txt)){
			txt = txt.replace(nouv2, '');
		}

		while (regSpanFin.test(txt)){
			txt = txt.replace(regSpanFin, '');
		}
        
        var indRet = txt.lastIndexOf("\n");
        
        if (indRet==txt.length-1) {
            txt = txt.slice(0,txt.length-1);
        }

		txt = txt.replace(" [","[");
		this.enonce_Html = txt;
	}

	
	//---------------------------------//	
	

	this.toOEF = function()
	/*
	 * Fonction qui permet de générer le code OEF de l'énoncé.
	 *
	 */
	{
		if (bool)
		// si l'on a un éditeur secondaire
		{
			if (toolbar!=null) 
			// si l'on a pas de barre de tache
				{
					this.replaceHTML();
					return this.enonce_Html+"</div>";
				}
			else
				{

					this.replaceHTMLVar();
					return this.enonce_Html;
				}
			
		}
		else
		// si on est sur un éditeur primaire
		{
			this.replaceHTML();
			return "\n\\statement{ \n"+this.enonce_Html+" }"+"\n\n";
		}
	}	
	
	
}

/* On va permettre à l'éditeur d'autoriser à être ciblé par le drag and drop */


    document.querySelector('#editor-container').addEventListener('dragover', function(e) {
    e.preventDefault(); // Annule l'interdiction de drop
    console.log('Un élément survole la zone');
    });
    
    //Permet à l'éditeur de savoir qu'on a laché un élément draggable sur lui
    document.querySelector('#editor-container').addEventListener('drop', function(e) {
        e.preventDefault(); // Permet d'éviter une éventuelle redirection inattendue
        console.log('Un élément a été déposé');

        

        

    }, false);

    // permet de recevoir du texte de l'élément envoyé !
    document.querySelector('#editor-container').addEventListener('drop', function(e) {
        var nomBoutton=" ";
        nomBoutton=e.dataTransfer.getData("texte"); // Affiche le contenu du type MIME « text/plain »
        console.log('Données reçu : ' + nomBoutton);
        
        var typeRecuVariable; // vaut supérieur à 0
        var typeRecuEssaim;
        
        typeRecuVariable  = nomBoutton.indexOf("RidEnVa");// vaudra >0 si c'est une variable
        typeRecuEssaim = nomBoutton.indexOf("bouton"); // vaudra >0 si c'est une variable
        nomBoutton='#'+nomBoutton;
        buttonDD=document.querySelector(nomBoutton);
        console.log("typeRecuVariable = "+typeRecuVariable);
        
        
        if(typeRecuEssaim>=0)
            {
                buttonDD.onclick(); // On va simuler l'activation du bouton 
                console.log("L'élement recu est de type essaim");
            }
        else if(typeRecuVariable>=0)
            {
                buttonDD.ondblclick();
                console.log("L'élement recu est de type variable");
            }


    });

    /*Fin des modifs drag and drop  */
