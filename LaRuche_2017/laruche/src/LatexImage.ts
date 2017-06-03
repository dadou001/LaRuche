var Inline = Quill.import('blots/inline'); //On récupère la bonne class

class LatexImage extends Inline { //On crée notre class fille de Embed pour que nos variables soit intouchables
  static create() {
    return super.create();
  }

  static formats() {
    return true;
  }

}

LatexImage.blotName = 'LatexImage'; //on définit le BlotName (celui à utiliser dans insertEmbered par exemple)
LatexImage.className = 'surligne_Latex'; //On définit sa classe
LatexImage.tagName = 'latex';//On définit les balises qui vont entourer cette class
Quill.register({ //On l'enregistre pour pouvoir la réutiliser
    'formats/latexImage': LatexImage
});
