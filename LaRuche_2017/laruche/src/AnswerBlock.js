/// <reference path="SEditor.ts"/>
/// <reference path="../js_tools/quill/quill.min.js"/>
/// <reference path="../js_tools/vendor/jquery.js"/>
/// <reference path="../node_modules/@types/quill/index.d.ts"/>
var AnswerBlock = (function () {
    //Constructeur
    function AnswerBlock(name, id, type) {
        this.name = name;
        this.id = id;
        this.html = this.construct_basic_html();
        $('#answer_list_analyse').append(this.html);
        // document.getElementById('answer_list_analyse').innerHTML += this.html;
        // this.change_to_type(type);
        // this.create_editor();
        //$('#'+this.get_div_id_change()).addClass('answer_hidden');
    }
    // constructor(id,type){
    //     this.id = id;
    //     this.html = this.construct_basic_html();
    //     // document.getElementById('answer_list_analyse').innerHTML += this.html;
    //     // this.editor = new SEditor(new Quill('#'+this.get_editeur_div_id(), {
    //     // 	modules: {
    //     // 		toolbar: false
    //     // 	},
    //     // 	placeholder: 'Compose an exercise...',
    //     // 	theme: 'snow'
    //     // }));
    //     //this.change_to_type(type);
    //     //$('#'+this.get_div_id_change()).addClass('answer_hidden');
    // }
    //Methodes public
    AnswerBlock.prototype.change_to_type = function (type) {
        switch (type) {
            case 'numeric':
                this.html = this.change_html_fieldset(this.generate_numeric_fieldset());
                this.update_html();
                break;
            case 'function':
                this.html = this.change_html_fieldset(this.generate_function_fieldset());
                this.update_html();
                break;
            case 'range':
                this.html = this.change_html_fieldset(this.generate_range_fieldset());
                this.update_html();
                break;
            case 'menu':
                this.html = this.change_html_fieldset(this.generate_menu_fieldset());
                this.update_html();
                break;
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
            placeholder: 'Compose an exercise...',
            theme: 'snow'
        }));
    };
    AnswerBlock.prototype.destroy = function () {
        this.html = "";
        this.destroy_html();
        this.editor = null;
        this.id = "JE DEVRAIS APS ETRE LA";
    };
    //Methodes private
    AnswerBlock.prototype.construct_basic_html = function () {
        var result = '<div class="large-12 columns callout" id="answer_all_' + this.name + '">'
            + '<div class="large-11 columns">'
            + this.name
            + '<label>Answer Type'
            + '<select oninput="$(\'#ans_' + this.name + '\').removeClass(\'answer_hidden\');change_type_answer(\'' + this.name + '\',this.value,answer_List)">' //Rajouter le moyen de changer le type
            + '<option value="numeric">Numeric</option>'
            + '<option value="function">Function</option>'
            + '<option value="range">Range</option>'
            + '<option value="menu">Menu</option>'
            + '</select>'
            + '</label>'
            + '<div id="ans_' + this.name + '">'
            + 'Chaine d\'analyse'
            + '<div id="editor_' + this.name + '">'
            + '</div>'
            + '<fieldset id="fieldset_ans_' + this.name + '">'
            + '<legend>Option(s)</legend>'
            + '<input id="checkbox1" type="checkbox"><label for="checkbox1">Option 1</label>'
            + '<input id="checkbox2" type="checkbox"><label for="checkbox2">Option 2</label>'
            + '<input id="checkbox3" type="checkbox"><label for="checkbox3">Option 3</label>'
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
    AnswerBlock.prototype.generate_numeric_fieldset = function () {
        var result = '<fieldset id="fieldset_ans_' + this.name + '">'
            + '<legend>Option(s)</legend>'
            + '<input id="checkbox_' + this.name + '_coma" type="checkbox"><label for="checkbox_' + this.name + '_coma">virgule (et non point)</label>'
            + '<input id="checkbox_' + this.name + '_noanalyze" type="checkbox"><label for="checkbox_' + this.name + '_noanalyze">sans affichage de l\'analyse réponse</label>'
            + '</fieldset>';
        return result;
    };
    AnswerBlock.prototype.generate_function_fieldset = function () {
        var result = '<fieldset id="fieldset_ans_' + this.name + '">'
            + '<legend>Option(s)</legend>'
            + '<input id="checkbox_' + this.name + '_noanalyze" type="checkbox"><label for="checkbox_' + this.name + '_noanalyze">sans affichage de l\'analyse réponse</label>'
            + '</fieldset>';
        return result;
    };
    AnswerBlock.prototype.generate_range_fieldset = function () {
        var result = '<fieldset id="fieldset_ans_' + this.name + '">'
            + '<legend>Option(s)</legend>'
            + '<input id="checkbox_' + this.name + '_noanalyze" type="checkbox"><label for=""checkbox_' + this.name + '_noanalyze"">sans affichage de l\'analyse réponse</label>'
            + '</fieldset>';
        return result;
    };
    AnswerBlock.prototype.generate_menu_fieldset = function () {
        var result = '<fieldset id="fieldset_ans_' + this.name + '">'
            + '<legend>Option(s)</legend>'
            + '<input id="checkbox_' + this.name + '_partial_answer" type="checkbox"><label for="checkbox_' + this.name + '_partial_answer">Accepte les réponses partielles</label>'
            + '<input id="checkbox_' + this.name + '_shuffle" type="checkbox"><label for="checkbox_' + this.name + '_shuffle">Bat aléatoirement les propositions</label>'
            + '<input id="checkbox_' + this.name + '_multiple_choice" type="checkbox"><label for="checkbox_' + this.name + '_multiple_choice">Choix multiple</label>'
            + '<input id="checkbox_' + this.name + '_ordered_choice" type="checkbox"><label for="checkbox_' + this.name + '_ordered_choice">Tri les propositions</label>'
            + '<input id="checkbox_' + this.name + '_noanalyze" type="checkbox"><label for=""checkbox_' + this.name + '_noanalyze"">sans affichage de l\'analyse réponse</label>'
            + '</fieldset>';
        return result;
    };
    AnswerBlock.prototype.update_html = function () {
        var result = "";
        var start = this.html.search('<fieldset');
        var end = this.html.search('</fieldset>');
        result = this.html.substring(start, end + 11);
        $('#fieldset_ans_' + this.name).replaceWith(result);
    };
    AnswerBlock.prototype.destroy_html = function () {
        $('#answer_all_' + this.name).remove();
    };
    AnswerBlock.prototype.update_all_html = function () {
        var number = Number(this.id.substring(6, 7)) - 1;
        // console.log($('#answer_list_analyse .callout').eq(number).get(0));
        // if($('#answer_list_analyse .callout').eq(number).get(0) == undefined){
        //   $('#answer_list_analyse .callout').append(this.html);
        // }
        // else {
        $('#answer_list_analyse .callout').eq(number).replaceWith(this.html);
        // }
    };
    return AnswerBlock;
}());
