/// <reference path="SEditor.ts"/>
/// <reference path="../js_tools/quill/quill.min.js"/>
/// <reference path="../js_tools/vendor/jquery.js"/>
/// <reference path="../node_modules/@types/quill/index.d.ts"/>
var AnswerBlock = (function () {
    //Constructeur
    function AnswerBlock(name, type) {
        this.all_type = { 'numeric': { 'coma': Blockly.Msg.WIMS_ANSWER_OPTION_COMA,
                'noanalyze': Blockly.Msg.WIMS_ANSWER_OPTION_NOANALYZE },
            'function': { 'noanalyze': Blockly.Msg.WIMS_ANSWER_OPTION_NOANALYZE },
            'range': { 'noanalyze': Blockly.Msg.WIMS_ANSWER_OPTION_NOANALYZE },
            'menu': { 'split': Blockly.Msg.WIMS_ANSWER_OPTION_SPLIT,
                'shuffle': Blockly.Msg.WIMS_ANSWER_OPTION_SHUFFLE,
                'multiple': Blockly.Msg.WIMS_ANSWER_OPTION_MULTIPLE,
                'sort': Blockly.Msg.WIMS_ANSWER_OPTION_SORT,
                'noanalyze': Blockly.Msg.WIMS_ANSWER_OPTION_NOANALYZE },
            'other': {}
        };
        this.name = name;
        this.html = this.construct_basic_html();
        $('#answer_list_analyse').append(this.html);
    }
    //Methodes public
    AnswerBlock.prototype.change_to_type = function (type) {
        if (type == 'other') {
            this.html = this.change_html_fieldset(this.generate_fieldset_code(type));
            this.update_html(true);
        }
        else {
            this.html = this.change_html_fieldset(this.generate_fieldset_code(type));
            this.update_html(false);
        }
    };
    //Getteurs/stteurs
    AnswerBlock.prototype.get_html = function () {
        return this.html;
    };
    AnswerBlock.prototype.get_editeur_div_id = function () {
        return 'editor_' + this.name;
    };
    AnswerBlock.prototype.get_editor = function () {
        return this.editor;
    };
    AnswerBlock.prototype.get_div_id_change = function () {
        return 'ans_' + this.id;
    };
    AnswerBlock.prototype.set_editor = function (editor) {
        this.editor = editor;
    };
    AnswerBlock.prototype.create_editor = function () {
        this.editor = new SEditor(new Quill('#' + this.get_editeur_div_id(), {
            modules: {
                toolbar: false
            },
            placeholder: Blockly.Msg.WIMS_ANSWER_ANALYSIS_STRING_PLACEHOLDER,
            theme: 'snow'
        }));
    };
    AnswerBlock.prototype.destroy = function () {
        this.html = "";
        this.destroy_html();
        this.editor = null;
        this.id = "I SHOULDN'T BE HERE";
    };
    //Methodes private
    AnswerBlock.prototype.construct_basic_html = function () {
        var result = '<div class="large-12 columns callout" id="answer_all_' + this.name + '">'
            + '<div class="large-11 columns">'
            + this.name
            + '<label>Answer Type'
            + '<select oninput="$(\'#ans_' + this.name + '\').removeClass(\'answer_hidden\');change_type_answer(\'' + this.name + '\',this.value,answer_List)">' //Rajouter le moyen de changer le type
            + '<option value="numeric">' + Blockly.Msg.WIMS_ANSWER_TYPE_NUMERIC + '</option>'
            + '<option value="function">' + Blockly.Msg.WIMS_ANSWER_TYPE_FUNCTION + '</option>'
            + '<option value="range">' + Blockly.Msg.WIMS_ANSWER_TYPE_RANGE + '</option>'
            + '<option value="menu">' + Blockly.Msg.WIMS_ANSWER_TYPE_MENU + '</option>'
            + '<option value="other">' + Blockly.Msg.WIMS_ANSWER_TYPE_OTHER + '</option>'
            + '</select>'
            + '</label>'
            + '<div id="ans_' + this.name + '">'
            + '<div id="ans_' + this.name + '_type"></div>'
            + Blockly.Msg.WIMS_ANSWER_ANALYSIS_STRING
            + '<div id="editor_' + this.name + '">'
            + '</div>'
            + '<fieldset id="fieldset_ans_' + this.name + '">'
            + '<legend>' + Blockly.Msg.WIMS_ANSWER_ANALYSIS_OPTIONS + '</legend>'
            + '<input id="checkbox1" type="checkbox"><label for="checkbox1">' + Blockly.Msg.WIMS_ANSWER_ANALYSIS_OPTION + ' 1</label>'
            + '<input id="checkbox2" type="checkbox"><label for="checkbox2">' + Blockly.Msg.WIMS_ANSWER_ANALYSIS_OPTION + ' 2</label>'
            + '<input id="checkbox3" type="checkbox"><label for="checkbox3">' + Blockly.Msg.WIMS_ANSWER_ANALYSIS_OPTION + ' 3</label>'
            + '</fieldset>'
            + '</div>'
            + '<div class="large-1 columns">'
            + '<button class="close-button" onclick="destroy_answer(\'' + this.name + '\');update_variables_answers_view(\'card_Analyse_Variable\',variable_List,answer_List)" aria-label="Close alert" type="button">'
            + '<span aria-hidden="true">&times;</span>'
            + '</button>'
            + '</div>'
            + '</div>'
            + '</div>';
        return result;
    };
    AnswerBlock.prototype.change_html_fieldset = function (str) {
        var result = this.html;
        var start = this.html.search("<fieldset");
        var end = this.html.search("</fieldset>");
        result = this.html.substring(0, start) + str + this.html.substring(end + 11, this.html.length);
        return result;
    };
    AnswerBlock.prototype.update_html = function (textAreaType) {
        var result = "";
        var start = this.html.search('<fieldset');
        var end = this.html.search('</fieldset>');
        result = this.html.substring(start, end + 11);
        $('#fieldset_ans_' + this.name).replaceWith(result);
        if (textAreaType) {
            $('#ans_' + this.name + '_type').html('<textarea placeholder="Type"></textarea>');
        }
        else {
            $('#ans_' + this.name + '_type').html('');
        }
    };
    AnswerBlock.prototype.destroy_html = function () {
        $('#answer_all_' + this.name).remove();
    };
    AnswerBlock.prototype.update_all_html = function () {
        // var number = Number(this.id.substring(6,7))-1;
        // console.log($('#answer_list_analyse .callout').eq(number).get(0));
        // if($('#answer_list_analyse .callout').eq(number).get(0) == undefined){
        //   $('#answer_list_analyse .callout').append(this.html);
        // }
        // else {
        $('#answer_all_' + this.name).replaceWith(this.html);
        // }
    };
    AnswerBlock.prototype.generate_fieldset_code = function (type) {
        var result = '<fieldset id="fieldset_ans_' + this.name + '">'
            + '<legend>Option(s)</legend>';
        for (var key in this.all_type[type]) {
            result += '<input value="' + key + '" type="checkbox"><label>' + this.all_type[type][key] + '</label>';
        }
        result += '</fieldset>';
        return result;
    };
    AnswerBlock.prototype.generate_choice_type = function () {
        var result = '<select oninput="$(\'#ans_' + this.name + '\').removeClass(\'answer_hidden\');change_type_answer(\'' + this.name + '\',this.value,answer_List)">';
        for (var key in this.all_type) {
            result += '<option value="' + key + '">' + key + '</option>';
        }
        return result + '</select>';
        // +'<select oninput="$(\'#ans_'+this.name+'\').removeClass(\'answer_hidden\');change_type_answer(\''+this.name+'\',this.value,answer_List)">'//Rajouter le moyen de changer le type
        //   +'<option value="numeric">Numeric</option>'
        //   +'<option value="function">Function</option>'
        //   +'<option value="range">Range</option>'
        //   +'<option value="menu">Menu</option>'
        //   +'<option value="other">Other</option>'
        // +'</select>'
    };
    return AnswerBlock;
}());
