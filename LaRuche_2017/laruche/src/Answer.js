/// <reference path="AnswerBlock.ts"/>
var Answer = /** @class */ (function () {
    function Answer(name, type) {
        this.name = name;
        this.type = type;
        this.block_html = new AnswerBlock(name, type);
        this.length = '10';
        this.sub_type = null;
    }
    Answer.prototype.get_block_html = function () {
        return this.block_html;
    };
    Answer.prototype.get_type = function () {
        if (this.type != 'other')
            return this.type;
        else {
            return jQuery('#ans_' + this.name + '_type').find('textarea').get(0).value;
        }
    };
    Answer.prototype.set_sub_type = function (type) {
        this.sub_type = type;
    };
    Answer.prototype.get_option = function () {
        var result = "";
        var tab = jQuery('#fieldset_ans_' + this.name).find('input:checked');
        for (var i = 0; i < tab.length; i++) {
            result += jQuery('#fieldset_ans_' + this.name).find('input:checked').eq(i).val() + ",";
        }
        if (result.length > 0) {
            result = result.substring(0, result.length - 1);
            result = "{option = " + result + "}";
        }
        return result;
    };
    // public change_id(new_id){
    //   this.id = new_id;
    //   this.get_block_html().change_id(new_id);
    // }
    Answer.prototype.to_OEF = function () {
        return this.block_html.get_editor().to_OEFcode().split("<p>").join("").split("</p>").join("").split("\n").join("");
    };
    return Answer;
}());
