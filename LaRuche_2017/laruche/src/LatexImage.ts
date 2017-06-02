var Embed = Quill.import('blots/embed'); //On récupère la bonne class

class LatexImage extends Embed { //On crée notre class fille de Embed pour que nos variables soit intouchables
  static create(value) {
      let node = super.create(value);//On utilise la fonction create de Embed
      node.innerHTML = value;

      return node;
    }
}

LatexImage.blotName = 'LatexImage'; //on définit le BlotName (celui à utiliser dans insertEmbered par exemple)
LatexImage.className = 'surligne_Latex'; //On définit sa classe
LatexImage.tagName = 'span';//On définit les balises qui vont entourer cette class
Quill.register({ //On l'enregistre pour pouvoir la réutiliser
    'formats/latexImage': LatexImage
});
