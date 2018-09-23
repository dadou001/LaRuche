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
var Embed = Quill.import('blots/embed'); //On récupère la bonne classe
var VariableImage = /** @class */ (function (_super) {
    __extends(VariableImage, _super);
    function VariableImage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VariableImage.create = function (value) {
        var node = _super.create.call(this, value); //On utilise la fonction create de Embed test
        node.innerHTML = value;
        node.setAttribute('data-value', value);
        node.setAttribute('contenteditable', false);
        return node;
    };
    VariableImage.value = function (domNode) {
        return domNode.getAttribute('data-value');
    };
    return VariableImage;
}(Embed));
VariableImage.blotName = 'VariableImage'; //on définit le BlotName (celui à utiliser dans insertEmbered par exemple)
VariableImage.className = 'surligne_Variable'; //On définit sa classe
VariableImage.tagName = 'span'; //On définit les balises qui vont entourer cette class
Quill.register({
    'formats/variableImage': VariableImage
});
