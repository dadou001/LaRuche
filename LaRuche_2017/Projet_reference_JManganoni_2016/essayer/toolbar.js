/**
 * Created by yan on 16/2/18.
 */


wg.ui.$toolbar = (/**
 * gerer le toolbar
 * @param tools, list de wg.class.tool
 * @param option, options par default wg.default.toolbar.option
 * @returns {*|jQuery|HTMLElement}
 */
    function (tools, option) {
    tools = tools || wg.default.toolbar.tools;
    option = option || wg.default.toolbar.option;
    var $toolbar = $("<div></div>");
    var uiList = [];
    var ui = function (toolList) {
        var b = toolList[0];
        if (b) {
            uiList.push($("<button></button>")
                .data("name", b.name)
                .html($("<img />").attr("src", b.icon))
                .css(option.buttoncss)
                .click(function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                    b.callback()
                })
                .appendTo($toolbar));
            ui(toolList.slice(1))
        }
    };
    ui(tools);
    return $toolbar
})();

