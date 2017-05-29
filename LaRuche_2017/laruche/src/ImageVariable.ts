var Embed = Quill.import('blots/embed'); //On récupère la bonne class

class ImageVariable extends Embed { //On crée notre class fille de Embed pour que nos variables soit intouchables
  static create(value) {
      let node = super.create(value);//On utilise la fonction create de Embed
      node.innerHTML = `<span contenteditable=false style="background-color:grey;">${value}</span>`; //On écrit notre valeur entre les span qui nous intéresses
      return node;
    }
}

ImageVariable.blotName = 'ImageVariable'; //on définit le BlotName (celui à utiliser dans insertEmbered par exemple)
ImageVariable.className = 'quill-ImageVariable'; //On définit sa classe
ImageVariable.tagName = 'span';//On définit les balises qui vont entourer cette class
Quill.register({ //On l'enregistre pour pouvoir la réutiliser
    'formats/imageVariable': ImageVariable
});
