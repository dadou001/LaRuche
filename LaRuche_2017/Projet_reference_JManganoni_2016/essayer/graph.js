/**
 * Created by yan on 16/2/16.
 */

/**
 * let's do some try
 */
$(document).ready(function () {
    // 1. creer un box
    var b3a = JXG.JSXGraph.initBoard('box', {boundingbox: [-2, 4, 6, -4], axis: true, grid: true});
    // 2. creer des point
    var points = [
        b3a.create('point', [1, 0], {face: 'o'}),  // or circle
        b3a.create('point', [2, 0], {face: '[]'}), // or square
        b3a.create('point', [3, 0], {face: 'x'}),  // or cross
        b3a.create('point', [4, 0], {face: '+'}),  // or plus
        b3a.create('point', [5, 0], {face: '^'}),  // or triangleUp
        b3a.create('point', [6, 0], {face: 'v'}),  // or triangleDown
        b3a.create('point', [7, 0], {face: '>'}),  // or triangleLeft
        b3a.create('point', [8, 0], {face: '<'}),  // or triangleRight
        b3a.create('point', [9, 0], {face: '<>'}) // or diamond
    ];
    // 3. effacer un
    b3a.removeObject(points[0]);
    // 4. effacer tous y compris le grid
    JXG.JSXGraph.freeBoard(b3a);
});