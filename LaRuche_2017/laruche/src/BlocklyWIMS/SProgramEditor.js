var prepEditor;
var analyseEditor;
// ----------------------------------------------------
// SProgramEditor : éditeur graphique de programmes
// Version basée sur Blockly (https://developers.google.com/blockly/)
// ----------------------------------------------------
var SProgramEditor = (function () {
    // Variables statiques :
    // SModele constructor
    function SProgramEditor(idToolboxXml, idDiv, idArea) {
        this.mArea = $('#' + idArea)[0];
        this.mDiv = $('#' + idDiv)[0];
        this.mBlocklyWorkspace = Blockly.inject(this.mDiv, { media: 'js_tools/blockly/media/',
            toolbox: document.getElementById(idToolboxXml),
            collapse: true,
            comments: true,
            trashcan: true,
            scrollbars: true,
            sounds: false,
            grid: {
                spacing: 24,
                length: 1,
                colour: '#ddd',
                snap: true
            },
            zoom: {
                controls: true,
                wheel: false,
                startScale: 1,
                maxScale: 2,
                minScale: 0.5,
                scaleSpeed: 1.2
            }
        });
        var calling_object = this; //keep the calling object in "closure" for callbacks
        // callback on resize event
        $(window).resize(function (e) {
            calling_object.onResize.call(calling_object, e); // keep closure context
        });
        this.onResize();
        Blockly.svgResize(this.mBlocklyWorkspace);
    }
    // ***********  méthodes de l'éditeur graphique de programme ************
    SProgramEditor.prototype.init = function () {
        // Initialisation à faire après construction
    };
    SProgramEditor.prototype.onResize = function () {
        // callback for "window resize" event
        // Compute the absolute coordinates and dimensions of this.mArea.
        var element = this.mArea;
        var x = 0;
        var y = 0;
        do {
            x += element.offsetLeft;
            y += element.offsetTop;
            element = element.offsetParent;
        } while (element);
        // Position mDiv over mArea.
        this.mDiv.style.left = x + 'px';
        this.mDiv.style.top = y + 'px';
        this.mDiv.style.width = this.mArea.offsetWidth + 'px';
        this.mDiv.style.height = this.mArea.offsetHeight + 'px';
    };
    return SProgramEditor;
}());
// Ne doit construire les editeurs que lorsque la page est complètement chargée
$(document).ready(function () {
    Blockly.BlockSvg.START_HAT = true;
    prepEditor = new SProgramEditor('RId_toolbox_programPrep', 'RId_programPrep_blockly', 'RId_programPrep');
    analyseEditor = new SProgramEditor('RId_toolbox_programAnalyse', 'RId_programAnalyse_blockly', 'RId_programAnalyse');
    // console.log(prepEditor.mBlocklyWorkspace.id);
});
