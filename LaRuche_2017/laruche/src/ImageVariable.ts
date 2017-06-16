var Embed = Quill.import('blots/embed'); //On récupère la bonne classe

class VariableImage extends Embed { //On crée notre class fille de Embed pour que nos variables soit intouchables
  static create(value) {
      let node = super.create(value);//On utilise la fonction create de Embed test
      node.innerHTML = value;
      node.setAttribute('data-value',value);
      node.setAttribute('contenteditable',false);

      return node;
    }

    static value(domNode){
      return domNode.getAttribute('data-value');
    }
}

VariableImage.blotName = 'VariableImage'; //on définit le BlotName (celui à utiliser dans insertEmbered par exemple)
VariableImage.className = 'surligne_Variable'; //On définit sa classe
VariableImage.tagName = 'span';//On définit les balises qui vont entourer cette class
Quill.register({ //On l'enregistre pour pouvoir la réutiliser
    'formats/variableImage': VariableImage
});
