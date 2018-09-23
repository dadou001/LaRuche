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
var Inline = Quill.import('blots/inline'); //On récupère la bonne classe
var LatexImage = /** @class */ (function (_super) {
    __extends(LatexImage, _super);
    function LatexImage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LatexImage.create = function () {
        return _super.create.call(this);
    };
    LatexImage.formats = function () {
        return true;
    };
    return LatexImage;
}(Inline));
LatexImage.blotName = 'LatexImage'; //on définit le BlotName (celui à utiliser dans insertEmbeded par exemple)
LatexImage.className = 'surligne_Latex'; //On définit sa classe
LatexImage.tagName = 'latex'; //On définit les balises qui vont entourer cette class
Quill.register({
    'formats/latexImage': LatexImage
});
