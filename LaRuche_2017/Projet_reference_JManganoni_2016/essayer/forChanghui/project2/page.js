$(document).ready(function () {
    var board = JXG.JSXGraph.initBoard('jxgbox', {boundingbox: [-5, 4, 5, -4], keepaspectratio: true, axis: true, grid: true});
    //[-5, 4, 5, -4] sont les points haut gauche et bas droite de la grille

    //point-------------------------------------------------------------------------------
    var p1 = board.create('point', [1, 1], {name: 'point1', size: 2, face: 'o', fixed: true});

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
    console.log(p2);
    //var li1 = board.create('line',[p1,p2],
    //{straightFirst:false, straightLast:false, strokeWidth:2, dash:4});
    var li2 = board.create('line', [[3, 1], [0, 0]], {straightFirst: false, straightLast: false, strokeWidth: 2})

    //circle------------------------------------------------------------------------------
    //creer un circle avec 2 points
    var ci = board.create('circle', [p1, "point2"], {
        strokeColor: '#00ff00', fillColor: '#555500', fillOpacity: 0.1,
        strokeWidth: 2
    });

    //text--------------------------------------------------------------------------------
    var txt = board.create('text', [5, -1, 'testcharactere'], {fontSize: 20});

    var initMenu = function (options) {
        return {
            callback: function (key, options) {
                var m = "clicked: " + key;
                window.console && console.log(m) || alert(m);
            },
            items: {
                "name": {name: options.name, icon: options.icon},
                "cut": {name: "Cut", icon: "cut"},
                "copy": {name: "Copy", icon: "copy"}
            }
        };
    };

    $("#jxgbox").click(function () {
        //console.log(board.getAllUnderMouse())
    });



    var ms = multiSelect(board);
});
