var Inline = Quill.import('blots/inline'); //On récupère la bonne classe

class LatexImage extends Inline { //On crée notre classe fille de Inline pour que nos variables soient intouchables
  static create() {
    return super.create();
  }

  static formats() {
    return true;
  }

}

LatexImage.blotName = 'LatexImage'; //on définit le BlotName (celui à utiliser dans insertEmbeded par exemple)
LatexImage.className = 'surligne_Latex'; //On définit sa classe
LatexImage.tagName = 'latex';//On définit les balises qui vont entourer cette class
Quill.register({ //On l'enregistre pour pouvoir la réutiliser
    'formats/latexImage': LatexImage
});
