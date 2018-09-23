var Embed = Quill.import('blots/embed');
// const ATTRIBUTES = [
//   'alt',
//   'height',
//   'width'
// ];


class AnswerImage extends Embed {
  static create(valueTransfer) {
    var value;
    var valueTransferObj;
    // valueTransfer should be JSON. Test the JSON validity
    try {
      valueTransferObj = JSON.parse(valueTransfer);
      // Handle non-exceprion-throwing cases
      // Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
      // but... JSON.parse(null) returns null, and typeof null === "object",
      // so we must check for that, too. Thankfully, null is falsey, so this suffices:
      if (valueTransferObj && typeof valueTransferObj === "object") {
        value = valueTransferObj['value'];
      }
    } catch(e) {
      // If didn't succeed to parse object, just set value to the passed string
      value = valueTransfer;
    }

    let node = super.create(value);
    var embedInnerHTML = value;
    node.className = "surligne_Answer";
    if (typeof valueTransferObj != 'undefined') {
      if (valueTransferObj['variable1']=='editor-enonce') {
        var imagesPath ='';
        if (typeof isInWIMS!='undefined') {
          // isInWIMS is defined in the wims module "menu.phtml",
          // true if editor is called from within WIMS, undefined or false if not
          if (isInWIMS == true) imagesPath = 'scripts/js/laruche/';
        }
        embedInnerHTML = '<img src="'+imagesPath+'images/question.png" style="max-height:60px;max-width:60px;"/><span class="surligne_Answer">' + embedInnerHTML+'</span>';
        node.className = "surligne_Answer_Place";
      }
    }
    node.innerHTML = embedInnerHTML;
    node.setAttribute('data-value',valueTransfer);
    node.setAttribute('contenteditable',false);
    var id = generate_unique_id_answer(value);
    node.setAttribute('id',id);
    node.setAttribute('onclick','create_popup_embed_answer(\''+id+'\',\''+value+'\');');
    return node;
  }

  static value(domNode){
    return domNode.getAttribute('data-value');
  }

  static nameFromObject(dataString){
    // returns the simple name of the dataString (stored in the "value" field)
    var valueTransferObj;
    // valueTransfer should be JSON. Test the JSON validity
    try {
      valueTransferObj = JSON.parse(dataString);
      // Handle non-exceprion-throwing cases
      if (valueTransferObj && typeof valueTransferObj === "object") {
        return valueTransferObj['value'];
      }
    } catch(e) {
      // If didn't succeed to parse object, just set value to the passed string
      return dataString;
    }
  }

}
AnswerImage.blotName = 'answerImage';
AnswerImage.tagName = 'span';
AnswerImage.className = 'surligne_Answer_Place';
Quill.register({ //On l'enregistre pour pouvoir la réutiliser
    'formats/AnswerImage': AnswerImage
});
