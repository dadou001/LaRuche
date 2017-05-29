/**
 * Created by yan on 16/3/8.
 */

var fillImageIntoPoint = function (board, url, paint) {
    //console.log(url);
    function getCoord(paint) {
        return paint.coords.usrCoords
    }

    function getCoord2D(paint) {
        return getCoord(paint).slice(1)
    }

    function getSize(paint) {
        return paint.visProp.size
    }

    board.options.layer["image"] = 10;
    // make the priority of image higher than point
    var coodsToPixel = 45;
    //TODO to have a exact ratio
    var width = getSize(paint) / coodsToPixel;
    var point = (function () {
        var point = getCoord2D(paint);
        point[0] -= width / 2;
        point[1] -= width / 2;
        return point
    })();
    return board.create("image", [url, point, [width, width]])
};

var getTopUnderMouse = function (board) {
    //var layer = board.options.layer;
    var layer = {
        point: 9,
        arc: 8,
        line: 7,
        circle: 6,
        curve: 5,
        polygon: 4,
        sector: 3,
        angle: 2,
        grid: 1,
        image: 10,
        text: -1
    };
    var ele = board.getAllUnderMouse();
    if (!ele.length) return null;
    var level = layer[ele[0].elType];
    var top = ele[0];
    for (var i = 0; i < ele.length; i++) {
        if (level < layer[ele[i].elType]) {
            level = layer[ele[i].elType];
            top = ele[i]
        }
    }
    return top
};

var popupImageUploader = function (board, paint) {
    if (!FileReader) throw "A Newer Version of Browser is Required.";
    var $input = $("<input />")
        .attr("type", "file");
    var $img = $("<img />").attr({
        src: "",
        alt: "image"
    });
    /*var $div = $("<div></div>").css({
     position: "absolute"
     })
     .html($input)
     //.append($img)
     .appendTo("body");
     */
    $input.trigger("click");
    function readFile(file) {
        var reader = new FileReader();
        reader.onload = readSuccess;
        function readSuccess(event) {
            //$img.attr("src", event.target.result);
            //$div.hide();
            fillImageIntoPoint(board, event.target.result, paint)
        }

        reader.readAsDataURL(file);
    }

    $input.get(0).onchange = function (event) {
        readFile(event.srcElement.files[0])
    }
};

$(document).ready(function () {


    var board = JXG.JSXGraph.initBoard('jxgbox', {boundingbox: [-5, 4, 5, -4], keepaspectratio: true, axis: true});
    //[-5, 4, 5, -4] sont les points haut gauche et bas droite de la grille

    //point-------------------------------------------------------------------------------
    var p1 = board.create('point', [1, 1], {name: 'point1', size: 100, face: 'o', fixed: true, color: "green"});

    /**
     *{face:'o'} //  circle,
     *{face:'[]'} //  square
     *{face:'x'} //  cross
     *{face:'+'} //  plus
     *{face:'^'} //  triangleUp
     *{face:'v'} //  triangleDown
     *{face:'>'} //  triangleLeft
     *{face:'<'} //  triangleRight
     *{face:'<>'} //  diamond
     * @type {point}
     */

    //ligne-------------------------------------------------------------------------------
    //creer point2 pour avoir une ligne ou le coordonee de point comme li2
    var p2 = board.create('point', [2, -1], {name: 'point2', size: 2, face: 'x'});
    console.log(p1);
    //var li1 = board.create('line',[p1,p2],
    //{straightFirst:false, straightLast:false, strokeWidth:2, dash:4});
    var li2 = board.create('line', [[3, 1], [0, 0]], {straightFirst: false, straightLast: false, strokeWidth: 2})

    //circle------------------------------------------------------------------------------
    //creer un circle avec 2 points
    var ci = board.createElement('circle', [p1, "point2"], {
        strokeColor: '#00ff00', fillColor: '#555500', fillOpacity: 0.1,
        strokeWidth: 2
    });

    //text--------------------------------------------------------------------------------
    var txt = board.create('text', [5, -1, 'testcharactere'], {fontSize: 20});


    var initMenu = function (option) {
        return {
            callback: function (key, options) {
                var l = board.getAllUnderMouse();
                var i = 0;
                switch (key) {
                    case "ajoute":
                        for (i = 0; i < l.length; i++) {
                            if (l[i].elType == "point") {
                                popupImageUploader(board, l[i])
                            }
                        }
                        break;
                    case "sup":
                        for (i = 0; i < l.length; i++) {
                            if (l[i].elType == "image") {
                                board.removeObject(l[i])
                            }
                        }
                        break;
                }
            },
            items: (function () {
                var base = {
                    type: {name: option.element.elType}
                };
                switch (option.element.elType){
                    case "point":
                        base.ajoute = {name: "Ajouter un Image", icon: "edit"};
                        break;
                    case "image":
                        base.sup = {name: "Supprimer cet Image", icon: "delete"};
                        break;
                }
                return base
            })()
        };
    };

    $.contextMenu({
        selector: '#box',
        build: function ($trigger, e) {
            console.log(getTopUnderMouse(board).elType);
            // this callback is executed every time the menu is to be shown
            // its results are destroyed every time the menu is hidden
            // e is the original contextmenu event, containing e.pageX and e.pageY (amongst other data)
            return initMenu({
                element: getTopUnderMouse(board)
            })
        }
    });


});