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
var Embed = Quill["import"]('blots/embed');
var ImageVariable = (function (_super) {
    __extends(ImageVariable, _super);
    function ImageVariable() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ImageVariable.create = function (value) {
        var node = _super.create.call(this, value);
        node.innerHTML = "<span contenteditable=false style=\"background-color:grey;\">" + value + "</span>";
        return node;
    };
    return ImageVariable;
}(Embed));
ImageVariable.blotName = 'ImageVariable';
ImageVariable.className = 'quill-ImageVariable';
ImageVariable.tagName = 'span';
Quill.register({
    'formats/imageVariable': ImageVariable
});
