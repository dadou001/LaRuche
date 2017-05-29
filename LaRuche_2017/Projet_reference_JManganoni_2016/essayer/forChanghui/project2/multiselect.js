/**
 * Created by yan on 16/4/26.
 */

/**
 * initialiser multi-select
 * @param board: JSXGraph.BOARD
 * @returns {{}}
 */
var multiSelect = function (board) {
    var multiSelect = {};
    multiSelect.style = {};
    (function (style) {
        style.point = {
            fillColor: 'red',
            strokeColor: 'red'
        };
        style.selected = {
            fillColor: 'green',
            strokeColor: 'green'
        };
        style.highlighted = {
            fillColor: 'yellow',
            strokeColor: 'black'
        };
        style.rectPoint = {
            face: 'o',
            size: 2,
            strokeColor: 'green',
            fillColor: 'green',
            fillOpacity: 0.3,
            strokeOpacity: 0.3
        };
        style.rect = {
            strokeWidth: 1,
            borders: {strokeColor: 'green'},
            strokeOpacity: .3,
            fillOpacity: 0.05
        }
    })(multiSelect.style);

    multiSelect.getMouseCoords = function(e) {
        var cPos = board.getCoordsTopLeftCorner(e),
            absPos = JXG.getPosition(e),
            dx = absPos[0] - cPos[0],
            dy = absPos[1] - cPos[1];

        return new JXG.Coords(JXG.COORDS_BY_SCREEN, [dx, dy], board);
    };

    var rectStart, rectEnd, rectCorner1, rectCorner2, rect;

    multiSelect.down = function(e) {
        if (!isSelectMode) return;
        var canCreate = true,
            coords = multiSelect.getMouseCoords(e),
            el;


        if (canCreate) {
            rectStart = board.create('point', [coords.usrCoords[1], coords.usrCoords[2]], multiSelect.style.rectPoint);

            rectEnd = board.create('point', [coords.usrCoords[1], coords.usrCoords[2]], multiSelect.style.rectPoint);

            rectCorner1 = board.create('point', [rectStart.X(), function() {
                return rectEnd.Y();}], multiSelect.style.rectPoint);
            rectCorner2 = board.create('point', [function() {
                return rectEnd.X();}, rectStart.Y()], multiSelect.style.rectPoint);

            rect = board.create('polygon', [rectStart, rectCorner1, rectEnd, rectCorner2], multiSelect.style.rect);
            selecting = true;
        }
    };
    var selectedPts = [];
    multiSelect.move = function(e) {
        if (!selecting) return;
        var coords = multiSelect.getMouseCoords(e);
        rectEnd.moveTo([coords.usrCoords[1], coords.usrCoords[2]]);
    };
    multiSelect.up = function(e) {
        var i = 0;
        if (selecting) {
            var minX, maxX, minY, maxY;
            if (rectStart.X() < rectEnd.X()) {
                minX = rectStart.X();
                maxX = rectEnd.X();
            }
            else {
                maxX = rectStart.X();
                minX = rectEnd.X();
            }
            if (rectStart.Y() < rectEnd.Y()) {
                minY = rectStart.Y();
                maxY = rectEnd.Y();
            }
            else {
                maxY = rectStart.Y();
                minY = rectEnd.Y();
            }
            for (i = 0; i < V.length; i++) {
                if (V[i].X() >= minX && V[i].X() <= maxX && V[i].Y() >= minY && V[i].Y() <= maxY) {
                    selectedPts.push(V[i]);
                }

            }


            for (i = 0; i < selectedPts.length; i++) {
                selectedPts[i].setAttribute(multiSelect.style.selected);
                polyPoints.push(selectedPts[i])

            }

            polygon = board.create('polygon', polyPoints);

            selecting = false;
            board.removeObject(rect);
            board.removeObject(rectCorner1);
            board.removeObject(rectCorner2);
            board.removeObject(rectStart);
            board.removeObject(rectEnd);
        }
    };

    var isSelectMode = true;
    var selecting = false;

    var V = (function () {
        var eles = Object.keys(board.objects);
        var res = [];
        for(var i = 0; i < eles.length; i++){
            if(board.objects[eles[i]].elType == "point") res.push(board.objects[eles[i]])
        }
        return res
    })();
    console.log(V);
    var E = [];
    var polyPoints = [], polygon;

    JXG.Options.point.snapToGrid = true;

    for (var i = 0; i < 4; i++) {

        JXG.addEvent(V[i].rendNode, 'mousedown', function(e) {
            isSelectMode = false;

        }, V[i]);

        V[i].on('up', (function() {
            isSelectMode = true;
        }));
    }



    board.addHook(multiSelect.down, 'mousedown');
    board.addHook(multiSelect.move, 'mousemove');
    board.addHook(multiSelect.up, 'mouseup');

    return multiSelect
};