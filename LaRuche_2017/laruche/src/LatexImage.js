var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Inline = Quill.import('blots/inline');
var LatexImage = (function (_super) {
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
LatexImage.blotName = 'LatexImage';
LatexImage.className = 'surligne_Latex';
LatexImage.tagName = 'latex';
Quill.register({
    'formats/latexImage': LatexImage
});
