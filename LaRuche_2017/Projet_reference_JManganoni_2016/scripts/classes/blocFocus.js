/**
 * BlocFocus est un bloc qui apparait en "surpage" dans le but de crée une fenetre de travail sur
 * toute la page.
 * 
 * @param content - contenu initial du bloc, peut changer au cours du temps.
 * @param affichage - element qui contiendra le bouton qui permet le réaffichage du bloc
 */
BlocFocus = function(content, affichage){
    this.proto = "BlocFocus";
    this.container;
    this.content;
    this.background;
    this.width;
    this.height;
    this.headerHeight = 20;
    
    /*Contient un ensemble de fonction à effectuer lors du resize du bloc*/
    this.eventListener = {};
    
    /*Initialisation du bloc*/
    var self = this;
    this.initBloc();
    if (content !== undefined){
	content.appendTo(this.content);
    }
    var $button = $("<input />")
	.attr({'type':'button', 'value':'Afficher', 'title':'Affiche la surpage.'})
	.click(function(){
	    self.show();
	})
	.appendTo($(affichage));
	
    /* Pour une raison inconnu, si on cache directement le bloc, le graphe ne marche plus
     * et si on cache avec la fonction crée pour avec pour parametre 0 le graphe ne marche plus
     * non plus*/
    this.hide(1);
    /*this.container.hide();*/
    
}

BlocFocus.prototype.proto = "BlocFocus";

/**
 * initBloc
 * fonction qui initialise le bloc avec le container, et le bouton qui permet de réduire la fenetre
 * et qui prépare le bloc contenant les élément à venir.
 */
BlocFocus.prototype.initBloc = function(){
    var self = this;
    this.container = $("<div></div>")
	.attr('id', "blocFocus")
	.css({"width":$(document).width() - 20, 
	      "height":$(document).height() - 20, 
	})
	.appendTo($(document.body));
    
    var $quit = $("<div></div>")
	.css({
	    "background-image":"url(images/cross.png)",
	    "background-size":this.headerHeight + "px " + this.headerHeight + "px",
	    "width": this.headerHeight + "px",
	    "height": this.headerHeight + "px",
	    "position":"absolute",
	    "top": "5px",
	    "right":"5px",
	    "z-index":"1000"}) /*On se garantie que le quit soit toujours au sommet*/
	.appendTo(this.container);
    
    $($quit).hover(
	function(){
	    $quit.css({"background-image":"url(images/cross_active.png)"})
	},
	function(){
	    $($quit).css({"background-image":"url(images/cross.png"});
	});
    
    $($quit).click(
	function(){
	    self.hide();
	});
    
    this.content = $("<div></div>")
	.css({
	    "width":"100%", 
	    "height":"100%",
	    "position":"absolute",
	    "top":0,
	    "border-radius":"20px"})
	.appendTo(this.container);

    /*On ajoute un petit temps d'attente pour s'assurer que la fenetre à fini de se redimensionner
     avant de redimensionner ce cadre*/
    var timer;
    $(window).resize(function(){
	clearTimeout(timer);
	timer = setTimeout(function(){
	    self.container.css("width", $(document).width() - 20);
	    self.container.css("height", $(document).height() - 20);
	    
	    /*Ici, on fait appelle à toute les fonctions contenu dans le tableau pour effectuer
	     * le comportement attendu lors du redimensionnement de cet element.*/
	    for (var i in self.eventListener["resize"]){
		self.eventListener["resize"][i]();
	    }
	}, 100);
    });
}


/**
 * setContent
 * Fonction qui permet de changer le contenu de la surpage, si cela est nécéssaire
 * @param newContent - nouveau contenu du bloc de surpage.
 */
BlocFocus.prototype.setContent = function(newContent){
    if (newContent !== undefined){
	this.content.empty();
	newContent.appendTo(this.content);
    }else{
	console.error("Le bloc fournie n'est pas définie");
    }
}

/**
 * show
 * Fonction qui permet de faire apparaitre le bloc sur la page
 * @param time - Temps de l'animation complete en milliseconde.
 */
BlocFocus.prototype.show = function(time){
    if (time === undefined){
	time = 150;
    }
    /*time = time || 150;*/
    this.container.fadeIn(time);
    
    this.container.css("width", $(document).width() - 20);
    this.container.css("height", $(document).height() - 20);
    this.content.css({"height":"100%", "width":"100%"});
    for (var i in this.eventListener["show"]){
	this.eventListener["show"][i]();
	this.eventListener["resize"][i]();
    }
    
 
    
}

/**
 * hide
 * Fonction qui permet de masquer le bloc de la page
 * @param time - Temps de l'animation complete en milliseconde.
 */
BlocFocus.prototype.hide = function(time){
    if (time === undefined){
	time = 150;
    }
    /*time = time || 150*/
    console.log(time);
    this.container.fadeOut(time);
    for (var i in this.eventListener["hide"]){
	this.eventListener["hide"][i]();
    }
}

/**
 * width
 * Fonction qui retourne la largeur du bloc qui contient les elements de l'utilisateur et donc pas
 * necessairement la largeur de la surpage en elle meme
 */
BlocFocus.prototype.width = function(){
    if (this.content === undefined){
	console.error("Un comportement anormal à eu lieu, le bloc de contenu est vide.");
    }else{
	return this.content.width();
    }
}

/**
 * height
 * Fonction qui retourne la hauteur du bloc qui contient les elements de l'utilisateur et donc pas
 * necessairements la hauteur de la surpage en elle meme
 */
BlocFocus.prototype.height = function(){
    if (this.content === undefined){
	console.error("Un comportement anormal à eu lieu, le bloc de contenu est vide.");
    }else{
	return this.content.height();
    }
}

/**
 * Fonction qui permet d'ajouter un listener d'event.
 * @param eventName - Nom de l'evenement sur lequel on veut rajouter un listener, les valeurs
 * viable actuellement sont "show", "hide", et "resize".
 * @param func - Fonction à executer lors d'un evenement du type eventName effectuer.
 */
BlocFocus.prototype.on = function(eventName, func){
    if (this.eventListener[eventName]){
	this.eventListener[eventName].append(func)
    }else{
	this.eventListener[eventName] = [func];
    }
}

$(document).ready(function(){
});
