/// <reference path="SEditor.ts"/>
/// <reference path="../js_tools/quill/quill.min.js"/>
/// <reference path="../js_tools/vendor/jquery.js"/>
/// <reference path="../node_modules/@types/quill/index.d.ts"/>
var AnswerBlock = /** @class */ (function () {
    //Constructeur
    function AnswerBlock(name, type) {
        this.all_type = { 'numeric': { 'coma': Blockly.Msg.WIMS_ANSWER_OPTION_COMA,
                'noanalyze': Blockly.Msg.WIMS_ANSWER_OPTION_NOANALYZE },
            'range': { 'noanalyze': Blockly.Msg.WIMS_ANSWER_OPTION_NOANALYZE },
            'reorder': { 'noanalyze': Blockly.Msg.WIMS_ANSWER_OPTION_NOANALYZE },
            'units': { 'noanalyze': Blockly.Msg.WIMS_ANSWER_OPTION_NOANALYZE },
            'numexp': { 'noreduction': Blockly.Msg.WIMS_ANSWER_OPTION_NOREDUCTION,
                'noanalyze': Blockly.Msg.WIMS_ANSWER_OPTION_NOANALYZE },
            'matrix': { 'noanalyze': Blockly.Msg.WIMS_ANSWER_OPTION_NOANALYZE,
                'split_coeff': Blockly.Msg.WIMS_ANSWER_OPTION_SPLIT_COEFF,
                'split_column': Blockly.Msg.WIMS_ANSWER_OPTION_SPLIT_COLUMN,
                'split_row': Blockly.Msg.WIMS_ANSWER_OPTION_SPLIT_ROW },
            'correspond': { 'split': Blockly.Msg.WIMS_ANSWER_OPTION_SPLIT,
                'noanalyze': Blockly.Msg.WIMS_ANSWER_OPTION_NOANALYZE },
            'case': { 'noreaccent': Blockly.Msg.WIMS_ANSWER_OPTION_NOREACCENT,
                'noanalyze': Blockly.Msg.WIMS_ANSWER_OPTION_NOANALYZE },
            'menu': { 'split': Blockly.Msg.WIMS_ANSWER_OPTION_SPLIT,
                'shuffle': Blockly.Msg.WIMS_ANSWER_OPTION_SHUFFLE,
                'multiple': Blockly.Msg.WIMS_ANSWER_OPTION_MULTIPLE,
                'sort': Blockly.Msg.WIMS_ANSWER_OPTION_SORT,
                'eqweight': Blockly.Msg.WIMS_ANSWER_OPTION_EQWEIGHT,
                'nolegend': Blockly.Msg.WIMS_ANSWER_OPTION_NOLEGEND,
                'noanalyze': Blockly.Msg.WIMS_ANSWER_OPTION_NOANALYZE },
            'radio': { 'split': Blockly.Msg.WIMS_ANSWER_OPTION_SPLIT,
                'shuffle': Blockly.Msg.WIMS_ANSWER_OPTION_SHUFFLE,
                'multiple': Blockly.Msg.WIMS_ANSWER_OPTION_MULTIPLE,
                'sort': Blockly.Msg.WIMS_ANSWER_OPTION_SORT,
                'eqweight': Blockly.Msg.WIMS_ANSWER_OPTION_EQWEIGHT,
                'nolegend': Blockly.Msg.WIMS_ANSWER_OPTION_NOLEGEND,
                'noanalyze': Blockly.Msg.WIMS_ANSWER_OPTION_NOANALYZE },
            'click': { 'split': Blockly.Msg.WIMS_ANSWER_OPTION_SPLIT,
                'shuffle': Blockly.Msg.WIMS_ANSWER_OPTION_SHUFFLE,
                'multiple': Blockly.Msg.WIMS_ANSWER_OPTION_MULTIPLE,
                'sort': Blockly.Msg.WIMS_ANSWER_OPTION_SORT,
                'eqweight': Blockly.Msg.WIMS_ANSWER_OPTION_EQWEIGHT,
                'nolegend': Blockly.Msg.WIMS_ANSWER_OPTION_NOLEGEND,
                'noanalyze': Blockly.Msg.WIMS_ANSWER_OPTION_NOANALYZE },
            'checkbox': { 'split': Blockly.Msg.WIMS_ANSWER_OPTION_SPLIT,
                'shuffle': Blockly.Msg.WIMS_ANSWER_OPTION_SHUFFLE,
                'show': Blockly.Msg.WIMS_ANSWER_OPTION_SHOW,
                'sort': Blockly.Msg.WIMS_ANSWER_OPTION_SORT,
                'eqweight': Blockly.Msg.WIMS_ANSWER_OPTION_EQWEIGHT,
                'nolegend': Blockly.Msg.WIMS_ANSWER_OPTION_NOLEGEND,
                'noanalyze': Blockly.Msg.WIMS_ANSWER_OPTION_NOANALYZE },
            'flashcard': { 'split': Blockly.Msg.WIMS_ANSWER_OPTION_SPLIT,
                'shuffle': Blockly.Msg.WIMS_ANSWER_OPTION_SHUFFLE,
                'show': Blockly.Msg.WIMS_ANSWER_OPTION_SHOW,
                'sort': Blockly.Msg.WIMS_ANSWER_OPTION_SORT,
                'eqweight': Blockly.Msg.WIMS_ANSWER_OPTION_EQWEIGHT,
                'nolegend': Blockly.Msg.WIMS_ANSWER_OPTION_NOLEGEND,
                'noanalyze': Blockly.Msg.WIMS_ANSWER_OPTION_NOANALYZE },
            'mark': { 'split': Blockly.Msg.WIMS_ANSWER_OPTION_SPLIT,
                'shuffle': Blockly.Msg.WIMS_ANSWER_OPTION_SHUFFLE,
                'show': Blockly.Msg.WIMS_ANSWER_OPTION_SHOW,
                'sort': Blockly.Msg.WIMS_ANSWER_OPTION_SORT,
                'eqweight': Blockly.Msg.WIMS_ANSWER_OPTION_EQWEIGHT,
                'nolegend': Blockly.Msg.WIMS_ANSWER_OPTION_NOLEGEND,
                'noanalyze': Blockly.Msg.WIMS_ANSWER_OPTION_NOANALYZE },
            'dragfill': { 'noorder': Blockly.Msg.WIMS_ANSWER_OPTION_NOORDER,
                'transparent': Blockly.Msg.WIMS_ANSWER_OPTION_TRANSPARENT,
                'noanalyze': Blockly.Msg.WIMS_ANSWER_OPTION_NOANALYZE },
            'clickfill': { 'noorder': Blockly.Msg.WIMS_ANSWER_OPTION_NOORDER,
                'transparent': Blockly.Msg.WIMS_ANSWER_OPTION_TRANSPARENT,
                'noanalyze': Blockly.Msg.WIMS_ANSWER_OPTION_NOANALYZE },
            'function': { 'integer': Blockly.Msg.WIMS_ANSWER_OPTION_INTEGER,
                'noanalyze': Blockly.Msg.WIMS_ANSWER_OPTION_NOANALYZE },
            'formal': { 'noanalyze': Blockly.Msg.WIMS_ANSWER_OPTION_NOANALYZE },
            'coord': { 'noanalyze': Blockly.Msg.WIMS_ANSWER_OPTION_NOANALYZE },
            'other': {}
        };
        this.name = name;
        this.html = this.construct_basic_html();
        jQuery('#answer_list_analyse').append(this.html);
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
    //Getters/setters
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
        var answerEditorDivId = this.get_editeur_div_id();
        var thisBlock = this;
        this.editor.editor.on('selection-change', function (range, oldRange, source) {
            // if (range) {
            //   if (jQuery('#popup_var_answer').length == 0) {
            //     posEditor = jQuery('#'+answerEditorDivId).offset();
            //     widthEditor = jQuery('#'+answerEditorDivId).width();
            //     generate_popup_list_var('popup_var_answer',posEditor.left+widthEditor+3, posEditor.top, false);
            //     AnswerBlock.activeEditorId = answerEditorDivId;
            //     AnswerBlock.activeBlock = thisBlock;
            //   }
            // } else {
            //   if (answerEditorDivId != AnswerBlock.activeEditorId) {
            //     jQuery('#popup_var_answer').remove();
            //     posEditor = jQuery('#'+answerEditorDivId).offset();
            //     widthEditor = jQuery('#'+answerEditorDivId).width();
            //     generate_popup_list_var('popup_var_answer',posEditor.left+widthEditor+3, posEditor.top, false);
            //     AnswerBlock.activeEditorId = answerEditorDivId;
            //     AnswerBlock.activeBlock = thisBlock;
            //   }
            // }
            // Remove popups for now, doesn't work
            // if (jQuery('#popup_var_answer').length == 0) {
            //   posEditor = jQuery('#'+answerEditorDivId).offset();
            //   widthEditor = jQuery('#'+answerEditorDivId).width();
            //   generate_popup_list_var('popup_var_answer',posEditor.left+widthEditor+3, posEditor.top, false);
            //   AnswerBlock.activeEditorId = answerEditorDivId;
            //   AnswerBlock.activeBlock = thisBlock;
            // } else {
            //   if (answerEditorDivId != AnswerBlock.activeEditorId) {
            //     jQuery('#popup_var_answer').remove();
            //     posEditor = jQuery('#'+answerEditorDivId).offset();
            //     widthEditor = jQuery('#'+answerEditorDivId).width();
            //     generate_popup_list_var('popup_var_answer',posEditor.left+widthEditor+3, posEditor.top, false);
            //     AnswerBlock.activeEditorId = answerEditorDivId;
            //     AnswerBlock.activeBlock = thisBlock;
            //   }
            // }
        });
    };
    AnswerBlock.prototype.destroy = function () {
        this.html = "";
        this.destroy_html();
        this.editor = null;
    };
    //Methodes private
    AnswerBlock.prototype.construct_basic_html = function () {
        var imagesPath = '';
        if (typeof isInWIMS != 'undefined') {
            // isInWIMS is defined in the wims module "menu.phtml",
            // true if editor is called from within WIMS, undefined or false if not
            if (isInWIMS == true)
                imagesPath = 'scripts/js/laruche/';
        }
        var result = '<div class="large-12 columns callout" id="answer_all_' + this.name + '">'
            + '<div class="large-11 columns">'
            + '<div style="text-align:center;"><span class="surligne_Answer_Place">'
            + '<img src="' + imagesPath + 'images/question.png" style="max-height:50px;max-width:50px;"/><span class="surligne_Answer">'
            + this.name + '</span></span></div>'
            + '<label>' + Blockly.Msg.WIMS_ANSWER_TYPE
            + '<select oninput="jQuery(\'#ans_' + this.name + '\').removeClass(\'answer_hidden\');change_type_answer(\'' + this.name + '\',this.value,answer_List)">'
            + '<option value="numeric">' + Blockly.Msg.WIMS_ANSWER_TYPE_NUMERIC + '</option>'
            + '<option value="range">' + Blockly.Msg.WIMS_ANSWER_TYPE_RANGE + '</option>'
            + '<option value="reorder">' + Blockly.Msg.WIMS_ANSWER_TYPE_REORDER + '</option>'
            + '<option value="units">' + Blockly.Msg.WIMS_ANSWER_TYPE_UNITS + '</option>'
            + '<option value="numexp">' + Blockly.Msg.WIMS_ANSWER_TYPE_NUMEXP + '</option>'
            + '<option value="matrix">' + Blockly.Msg.WIMS_ANSWER_TYPE_MATRIX + '</option>'
            + '<option value="correspond">' + Blockly.Msg.WIMS_ANSWER_TYPE_CORRESPOND + '</option>'
            + '<option value="case">' + Blockly.Msg.WIMS_ANSWER_TYPE_CASE + '</option>'
            + '<option value="menu">' + Blockly.Msg.WIMS_ANSWER_TYPE_MENU + '</option>'
            + '<option value="radio">' + Blockly.Msg.WIMS_ANSWER_TYPE_RADIO + '</option>'
            + '<option value="click">' + Blockly.Msg.WIMS_ANSWER_TYPE_CLICK + '</option>'
            + '<option value="checkbox">' + Blockly.Msg.WIMS_ANSWER_TYPE_CHECKBOX + '</option>'
            + '<option value="flashcard">' + Blockly.Msg.WIMS_ANSWER_TYPE_FLASHCARD + '</option>'
            + '<option value="mark">' + Blockly.Msg.WIMS_ANSWER_TYPE_MARK + '</option>'
            + '<option value="dragfill">' + Blockly.Msg.WIMS_ANSWER_TYPE_DRAGFILL + '</option>'
            + '<option value="clickfill">' + Blockly.Msg.WIMS_ANSWER_TYPE_CLICKFILL + '</option>'
            + '<option value="function">' + Blockly.Msg.WIMS_ANSWER_TYPE_FUNCTION + '</option>'
            + '<option value="formal">' + Blockly.Msg.WIMS_ANSWER_TYPE_FORMAL + '</option>'
            + '<option value="coord">' + Blockly.Msg.WIMS_ANSWER_TYPE_COORD + '</option>'
            + '<option value="other">' + Blockly.Msg.WIMS_ANSWER_TYPE_OTHER + '</option>'
            + '</select>'
            + '</label>'
            + '<div id="ans_' + this.name + '">'
            + '<div id="ans_' + this.name + '_type"></div>'
            + Blockly.Msg.WIMS_ANSWER_ANALYSIS_STRING
            + '<div id="editor_' + this.name + '">'
            + '</div>'
            + this.generate_fieldset_code('numeric')
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
        jQuery('#fieldset_ans_' + this.name).replaceWith(result);
        if (textAreaType) {
            jQuery('#ans_' + this.name + '_type').html('<textarea placeholder="Type"></textarea>');
        }
        else {
            jQuery('#ans_' + this.name + '_type').html('');
        }
    };
    AnswerBlock.prototype.destroy_html = function () {
        jQuery('#answer_all_' + this.name).remove();
    };
    AnswerBlock.prototype.update_all_html = function () {
        // var number = Number(this.id.substring(6,7))-1;
        // if(jQuery('#answer_list_analyse .callout').eq(number).get(0) == undefined){
        //   jQuery('#answer_list_analyse .callout').append(this.html);
        // }
        // else {
        jQuery('#answer_all_' + this.name).replaceWith(this.html);
        // }
    };
    AnswerBlock.prototype.generate_fieldset_code = function (type) {
        var result = '<fieldset id="fieldset_ans_' + this.name + '">'
            + '<legend>' + Blockly.Msg.WIMS_ANSWER_ANALYSIS_OPTIONS + '</legend>';
        for (var key in this.all_type[type]) {
            result += '<input value="' + key + '" type="checkbox"><label>' + this.all_type[type][key] + '</label>';
        }
        result += '</fieldset>';
        return result;
    };
    AnswerBlock.prototype.generate_choice_type = function () {
        var result = '<select oninput="jQuery(\'#ans_' + this.name + '\').removeClass(\'answer_hidden\');change_type_answer(\'' + this.name + '\',this.value,answer_List)">';
        for (var key in this.all_type) {
            result += '<option value="' + key + '">' + key + '</option>';
        }
        return result + '</select>';
        // +'<select oninput="jQuery(\'#ans_'+this.name+'\').removeClass(\'answer_hidden\');change_type_answer(\''+this.name+'\',this.value,answer_List)">'//Rajouter le moyen de changer le type
        //   +'<option value="numeric">Numeric</option>'
        //   +'<option value="function">Function</option>'
        //   +'<option value="range">Range</option>'
        //   +'<option value="menu">Menu</option>'
        //   +'<option value="other">Other</option>'
        // +'</select>'
    };
    AnswerBlock.activeEditorId = null;
    AnswerBlock.activeBlock = null;
    return AnswerBlock;
}());
