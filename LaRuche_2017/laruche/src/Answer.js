/// <reference path="AnswerBlock.ts"/>
var Answer = (function () {
    function Answer(name, type) {
        this.name = name;
        this.type = type;
        this.block_html = new AnswerBlock(name, type);
    }
    Answer.prototype.get_block_html = function () {
        return this.block_html;
    };
    Answer.prototype.get_type = function () {
        if (this.type != 'other')
            return this.type;
        else {
            console.log($('#ans_' + this.name + '_type').find('textarea'));
            return $('#ans_' + this.name + '_type').find('textarea').get(0).value;
        }
    };
    Answer.prototype.get_option = function () {
        var result = "";
        var tab = $('#fieldset_ans_' + this.name).find('input:checked');
        // console.log($('#fieldset_ans_'+this.name).find('input:checked'));
        for (var i = 0; i < tab.length; i++) {
            result += $('#fieldset_ans_' + this.name).find('input:checked').eq(i).val() + ",";
            // console.log(tab[i]);
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
        return this.block_html.editor.to_OEFcode().split("<p>").join("").split("</p>").join("").split("\n").join("");
    };
    return Answer;
}());
