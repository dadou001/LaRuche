var Embed = Quill.import('blots/embed');

// const ATTRIBUTES = [
//   'alt',
//   'height',
//   'width'
// ];


class AnswerImage extends Embed {
  static create(value) {
    let node = super.create(value);
    node.setAttribute('data-value',value);
    node.setAttribute('contenteditable',false);
    node.innerHTML = "<img src='./img/reponse.png'/>";
    return node;
  }

  static value(domNode){
    return domNode.getAttribute('data-value');
  }

  // static formats(domNode) {
  //   return ATTRIBUTES.reduce(function(formats, attribute) {
  //     if (domNode.hasAttribute(attribute)) {
  //       formats[attribute] = domNode.getAttribute(attribute);
  //     }
  //     return formats;
  //   }, {});
  // }
  //
  // static match(url) {
  //   return /\.(jpe?g|gif|png)$/.test(url) || /^data:image\/.+;base64/.test(url);
  // }
  //
  // static sanitize(url) {
  //   return sanitize(url, ['http', 'https', 'data']) ? url : '//:0';
  // }
  //
  // static value(domNode) {
  //   return domNode.getAttribute('src');
  // }
  //
  // format(name, value) {
  //   if (ATTRIBUTES.indexOf(name) > -1) {
  //     if (value) {
  //       this.domNode.setAttribute(name, value);
  //     } else {
  //       this.domNode.removeAttribute(name);
  //     }
  //   } else {
  //     super.format(name, value);
  //   }
  // }
}
AnswerImage.blotName = 'answerImage';
AnswerImage.tagName = 'answer';
Quill.register({ //On l'enregistre pour pouvoir la réutiliser
    'formats/AnswerImage': AnswerImage
});
