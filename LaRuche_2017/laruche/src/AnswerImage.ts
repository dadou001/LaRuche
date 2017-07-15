var Embed = Quill.import('blots/embed');

// const ATTRIBUTES = [
//   'alt',
//   'height',
//   'width'
// ];


class AnswerImage extends Embed {
  static create(value) {
    let node = super.create(value);
    var embedInnerHTML = value;
    if (editor_Enonce.editor.hasFocus()) {
      embedInnerHTML = '<img src="images/question.png" style="max-height:60px;max-width:60px;"/>' + embedInnerHTML;
    }
    node.innerHTML = embedInnerHTML;
    node.setAttribute('data-value',value);
    node.setAttribute('contenteditable',false);
    var id = generate_unique_id_answer(value);
    node.setAttribute('id',id);
    node.setAttribute('onclick','create_popup_embed_answer(\''+id+'\',\''+value+'\');');
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
