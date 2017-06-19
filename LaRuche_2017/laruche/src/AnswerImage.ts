var Embed = Quill.import('blots/embed');

// const ATTRIBUTES = [
//   'alt',
//   'height',
//   'width'
// ];


class AnswerImage extends Embed {
  static create(value) {
    let node = super.create(value);
    node.innerHTML = value;
    node.setAttribute('data-value',value);
    node.setAttribute('contenteditable',false);
    return node;
  }

  static value(domNode){
    return domNode.getAttribute('data-value');
  }

}
AnswerImage.blotName = 'answerImage';
AnswerImage.tagName = 'span';
AnswerImage.className = 'surligne_Answer';
Quill.register({ //On l'enregistre pour pouvoir la réutiliser
    'formats/AnswerImage': AnswerImage
});
