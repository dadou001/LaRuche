/// <reference path="AnswerBlock.ts"/>
var Answer = (function () {
    function Answer(name, type, id) {
        this.name = name;
        this.type = type;
        this.id = id;
        this.block_html = new AnswerBlock(id, type);
    }
    Answer.prototype.get_block_html = function () {
        return this.block_html;
    };
    Answer.prototype.change_id = function (new_id) {
        this.id = new_id;
        this.get_block_html().change_id(new_id);
    };
    return Answer;
}());
