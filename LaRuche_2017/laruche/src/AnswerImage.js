var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Embed = Quill.import('blots/embed');
// const ATTRIBUTES = [
//   'alt',
//   'height',
//   'width'
// ];
var AnswerImage = (function (_super) {
    __extends(AnswerImage, _super);
    function AnswerImage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AnswerImage.create = function (value) {
        var node = _super.create.call(this, value);
        node.setAttribute('data-value', value);
        node.setAttribute('contenteditable', false);
        node.innerHTML = "<img src='./img/reponse.png'/>";
        return node;
    };
    AnswerImage.value = function (domNode) {
        return domNode.getAttribute('data-value');
    };
    return AnswerImage;
}(Embed));
AnswerImage.blotName = 'answerImage';
AnswerImage.tagName = 'answer';
Quill.register({
    'formats/AnswerImage': AnswerImage
});
