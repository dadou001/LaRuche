# Dessin JSXGraph API References

```
Voici est un document pour les developpeur, pour les instructions de usage, veuillez consulter UserGuide.md
```

### x.x inputbox

L'inputbox accepte deux parametre `label` qui est le titre du input, et `type` qui est le type du input (par defaut `"text"`).

Il renvoie un `$.Deferred().promise()` objet, qui `done` avec le valeur du input, et `fail` avec un message de error.

Pour les informations sur `$.Deferred()` objet, voyez sur le document de jQuery.

Un exemple est,

```javascript
$.when(self.inputbox("Entrer un nom : "))
					.done(function (nom) {
						element.name = nom;
						self.brd.update()
					})
					.fail(function (err) {
						alert(err)
					})
```



### x.x popUpImageUploader

Notice: `this.popUpImageUploader`  a besoin de `FileReader` module inclut dans IE9+, chrome, firefox, et opera (Tout plateforme) et safari (Mac OSX).

Il va ouvrir une fenetre pour choisir et upload un image.

Il accepte 2 parametre: `readSuccess` qui est la fonction callback tant que l'image est uploade avec `event` dont `event.target.result` est le url de l'image uploade, et `readFail` quand un erreur est emis.

Un exemple est,

```javascript
            var self = essaimJSXGraph;
            self.popupImageUploader(function (event) {
                var result = event.target.result;
                self.brd.create("image", [result, [0, 0], [5, 5]]);
                self.brd.update()
            }, function (err) {
  				throw err
```



### x.x store.js

store.js sert a stocker les data avec `LocalStorage` et `SessionStorage` de HTML5, inclut dans IE9+, chrome, firefox, et opera (Tout plateforme) et safari (Mac OSX).

store.js occupe un variable global `store`, si vous voulez le modifier, modifiez `store.js` :

```javascript
// avant
var store = (function() {
    var store = {};
    store.infolocal = {};
    ...
    
// apres
votre.nom = (function() {
    var store = {};
    store.infolocal = {};
    ...
```

----

```
Note: dans store.js, le mot local present LocalStorage qui existe toujour, session present SessionStorage qui existe jusqu'a la fin de la session.
```

#### store.existLocal(key, value) / store.existSession(key, value)

Pour tester si un cle existe dans le stockage, si oui, il revoie le valeur, sinon il enregistre la key et la valeur, et revoie `undefined` .

Voici est un exemple common pour `tester si un cle existe, si oui utilise la valeur existe, sinon utilise et enregistre la valeur par defaut`

```javascript
var mydata = "changhui"
mydata = store.existLocal("mydata", mydata) || mydata
```

#### store.local(key, value) / store.session(key, value)

Les deux fonctions sont `getter` et `setter`, quand utiliser avec un seul parametre, comme `store.local(key)` il revoie la valeur, quand avec deux parametres, comme `store.local(key, valeur)`, il enregistre la valeur de la cle.

#### store.clear(which)

effacer un cle de stockage:

```javascript
store.clear("mydata")
```

la valeur de "mydata" et la cle son meme est donc effacees