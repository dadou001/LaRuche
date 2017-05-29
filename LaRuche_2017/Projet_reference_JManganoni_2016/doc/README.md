# Dessin JSXGraph

## 0. How to Build (NodeJS)

### 0.1 nightly

#### 0.1.1 installer les dependancies

```shell
$ npm install argv
$ npm install minify
```

#### 0.1.2 Build

```shell
$ cd ./release
$ node make.js
```

Vous aurez `res.js` et `res.min.js` dans cette repertoire.

### 0.2 release (TODO)

(Installer les dependencies si necessaire)

```shell
$ cd ./release
$ node release.js
```

Vous aurez tout pret (le fichier `larucheWims.min.js` est genere et rempli la longue liste de `<script>` dans `index.html`, et `index.html` est backup tout dans cette repertoire)

```
Why build?
C'est plus vite de charger un seul fichier que vingt.

Est-ce jQuery est compris dans le seul fichier?
Non.
C'est plus vite de charger, deux seul fichier que vingt.
```

## x Menu Contextuel

Le menu contextuel est met dans sont propre scope.

Note: On utilise `fn` pour indiquer `EssaimJSXGraph.prototype`.

### x.1 buildMenu

Le menu est toujours temporaire, il se construit tout la fois quand il est demande, on utilise `fn.buildMenu` pour le construire.

La fonction `buildMenu` n'est pas directement appele, on modifie `fn.MenuOptions` dans cette fonction avec la parametre `element` qui est l'element qui est passe par exterieure. 

```
Dans la version courante, element est l'element plus haut choisi par le souris.
```

Chaque option est un object avec deux cle, `nom` qui est le nom a afficher, et `callback` le fonction a appele, voici un exemple.

Un exemple d'un option de menu est tel:

```javascript
var EXEMPLE_FONCTION = {
            nom: "Changer le nom",
            callback: function () {
                var $input = $("<input />").appendTo(this.divBloc);
                var $submit = $("<input />").appendTo(this.divBloc)
                    .click(function () {
                        element.name = $input.val();
                        $input.remove();
                        $submit.remove();
                        fn.brd.update()
                    })
            }
        };
```

Dans `fn.menuOption`, les cle sont `common`, qui marche pour tout les elements, est les autres sont les type des elements, comme `point`, `circle` etc.

En utiliser l'exemple, on peut donc construire le menu comme l'exemple ci-dessous:

```javascript
options.common = {
            changeNom: {
                nom: "Changer le nom",
                callback: function () {
                    var $input = $("<input />").appendTo(this.divBloc);
                    var $submit = $("<input />").appendTo(this.divBloc)
                        .click(function () {
                            element.name = $input.val();
                            $input.remove();
                            $submit.remove();
                            fn.brd.update()
                        })
                }
            }
        }
```

