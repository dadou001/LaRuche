/**
 * Created by yan on 16/2/18.
 */

wg.class.tool = function (name, icon, callback) {
    this.name = name;
    this.icon = icon;
    this.callback = callback;

};

// exemple
/*
wg.default.toolbar.tools.push(new wg.class.tool("point", "img/point.png", function (data) {
    doSomethingWith(data)
}));
*/
