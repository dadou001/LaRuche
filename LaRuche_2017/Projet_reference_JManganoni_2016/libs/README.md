# Libraires

## Credits
* jQuery https://jquery.com
* jQuery.contextMenu https://github.com/swisnl/jQuery-contextMenu

## jQuery.contextMenu
### installer jQuery.contextMenu

* installer gulp globalement
```bash
$ npm install --save-dev gulp
```

* ou dans le project
```bash
$ npm install --save-dev gulp
```

* installer dependency
```bash
$ npm install
```

* construire icons
```bash
$ gulp build-icons
```

Il prend beaucoup de temp pour le construire dans un ordinateur faible (comme macbook), donc je met les fichier deja construit, car que ceux sont script et ressource, il n'y a pas de difference entre plateforme.

### Utilisation de jQuery.contextMenu
#### Integrer dans html
```html
    <link rel="stylesheet" href="dist/jquery.contextMenu.min.css" />
    <script src="jquery-1.12.1.min.js"></script>
    <script src="dist/jquery.ui.position.min.js"></script>
    <script src="dist/jquery.contextMenu.min.js"></script>
```

#### Use
```JavaScript
    $.contextMenu({
        selector: '#changhui',
        // peut marche avec jQuery DOM elements ajoute apres load
        callback: function(key, options) {
        // key indique quelle touche est choisi
            var m = "clicked: " + key;
            window.console && console.log(m) || alert(m);
        },
        items: {
            "edit": {name: "Edit", icon: "edit", accesskey: "e"},
            "cut": {name: "Cut", icon: "cut", accesskey: "c"},
            // first unused character is taken (here: o)
            "copy": {name: "Copy", icon: "copy", accesskey: "c o p y"},
            // words are truncated to their first letter (here: p)
            "paste": {name: "Paste", icon: "paste", accesskey: "cool paste"},
            "delete": {name: "Delete", icon: "delete"},
            "sep1": "---------",
            "quit": {name: "Quit", icon: function($element, key, item){ return 'context-menu-icon context-menu-icon-quit'; }}
        }
    });
    
    joindre disjoindre 
```