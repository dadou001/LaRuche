/**
 * Created by yan on 16/2/16.
 */

// var paint = b3a.create("point", [2, 3], {size: 100, color: "#f3f3f3"});

// 1. getters

function getCoord(paint) {
    return paint.coords.usrCoords
}

function getCoord2D(paint) {
    return getCoord(paint).slice(1)
}

function getSize(paint) {
    return paint.visProp.size
}

function getColor(paint) {
    return paint.visProp.fillcolor
}

//etc...

// 2. integerate an image into an jsxgraph element
// with the ability to change the size and position of image so as to fix the element

wg.lib.fillImageIntoPoint = function (board, url, paint) {
    function getCoord2D(paint) {
        return getCoord(paint).slice(1)
    }

    function getSize(paint) {
        return paint.visProp.size
    }
    board.options.layer["image"] = 10;
    // make the priority of image higher than point
    var coodsToPixel = 30;
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