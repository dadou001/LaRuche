/*
 * Classe Entete :
 * Définit l'entête de l'exercice.
 *
*/

function Entete()
{
	//--------- ATTRIBUTS ---------//

	this.title = "";			// titre de l'exerice
	this.langue = "";			// langue de l'exercice
	this.auteur = "";			// auteur de l'exercice
	this.email =  "";			// email de l'auteur de l'exercice
	this.computeanswer = "";	// réponse calculée par l'ordinateur
	this.format = "";			// format, initialisé à 'html'
	this.precision = "";		// precision de l'exercice, initialisé à 1000
	this.range = "";			// range de l'exercice, initialisé à -5..5
	this.libre = ""; 			// bloc libre (css, autre ..)

	//--------- METHODES ----------//


	this.recupDonnees = function()
	/*
	 * Fonction qui récupère toutes les données.
	 *
	 */
	{
		this.title = document.getElementById('Rid_Entete_Zone_Titre').value
		this.langue = document.getElementById('Rid_Entete_Zone_Langue').value;
		this.auteur = document.getElementById('Rid_Entete_Zone_Auteur').value;
		this.email =  document.getElementById('Rid_Entete_Zone_Email').value;
		this.computeanswer = document.getElementById('computeanswer').value;
		this.libre = document.getElementById('Rid_Entete_Editeur_CodeLibre').value;
		this.format = "\\format{ html }\n";
		this.precision = "\\precision{ 1000 }\n";
		this.range = "\\range{ -5..5 }\n\n";
	}


	//---------------------------------//


	this.toOEF = function()
	/*
	 * Fonction qui permet de générer le code OEF de l'entête.
	 *
	 */
	{
		if (this.title == "")
		{
			var title = "\\title{ Sans titre }"+"\n";
		}
		else
		{
			var title = "\\title{ "+this.title+" }"+"\n";	
		}
		var langue = "\\language{ "+this.langue+" }"+"\n";
		var auteur = "\\author{ "+this.auteur+" }"+"\n";
		var email = "\\email{ "+this.email+" }\n";
		var computeanswer = "\\computeanswer{ "+this.computeanswer+" }"+"\n";
		var format = "\\format{ html }\n";
		var precision = "\\precision{ 1000 }\n";
		var range = "\\range{ -5..5 }\n";
		if (this.libre == "")
		{
			var libre = "\n";
		}
		else
		{
			var libre = "\n"+this.libre+"\n\n";
		}

		return title + langue +  auteur + email + computeanswer + format + precision + range + libre;
	}


	//---------------------------------//


	this.charge = function(elem)
	/*
	 * Fonction qui permet de charger l'entete
	 * paramètre elem : élément JSON qui contient un objet entete
	 */
	{
		// Mis a jour de l'objet
		this.title = elem.title;			// titre de l'exerice
		this.langue = elem.langue;			// langue de l'exercice
		this.auteur = elem.auteur;			// auteur de l'exercice
		this.email =  elem.email;			// email de l'auteur de l'exercice
		this.computeanswer = elem.computeanswer;	// réponse calculée par l'ordinateur
		this.libre = elem.libre;	// code libre

		// Récupération des éléments HTML
		var title = document.getElementById("Rid_Entete_Zone_Titre");
		var langue = document.getElementById("Rid_Entete_Zone_Langue");
		var auteur = document.getElementById("Rid_Entete_Zone_Auteur");
		var email = document.getElementById("Rid_Entete_Zone_Email");
		var computeanswer = document.getElementById("computeanswer");
		var libre = document.getElementById("Rid_Entete_Editeur_CodeLibre");

		title.value = this.title;
		langue.value = this.langue;
		auteur.value = this.auteur;
		email.value = this.email;
		computeanswer.value = this.computeanswer;
		libre.value = this.libre;
	}
}