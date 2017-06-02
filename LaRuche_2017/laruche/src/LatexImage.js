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
var Embed = Quill.import('blots/embed'); //On récupère la bonne class
var LatexImage = (function (_super) {
    __extends(LatexImage, _super);
    function LatexImage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LatexImage.create = function (value) {
        var node = _super.create.call(this, value); //On utilise la fonction create de Embed
        node.innerHTML = value;
        return node;
    };
    return LatexImage;
}(Embed));
LatexImage.blotName = 'LatexImage'; //on définit le BlotName (celui à utiliser dans insertEmbered par exemple)
LatexImage.className = 'surligne_Latex'; //On définit sa classe
LatexImage.tagName = 'span'; //On définit les balises qui vont entourer cette class
Quill.register({
    'formats/latexImage': LatexImage
});
