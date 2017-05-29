/**
 * Created by yan on 16/2/18.
 */

// les proprietes par defaut de toolbar
wg.default.toolbar = {};
wg.default.toolbar.tools = [];
wg.default.toolbar.option = {};
wg.default.toolbar.option.css = {
    float: "left",
    border: "1px solid black"
};
wg.default.toolbar.option.buttoncss = {
    height: 30,
    width: 30
};
// Ou le toolbar sera insere
//TODO but where it is?
wg.default.toolbar.option.$appendTo = $("body");