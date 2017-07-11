var prepEditor;
var analyseEditor;

// ----------------------------------------------------
// SProgramEditor : éditeur graphique de programmes
// Version basée sur Blockly (https://developers.google.com/blockly/)
// ----------------------------------------------------

class SProgramEditor {

  mArea: any; // div or table cell or... element that will reserve
              // space on the page for the editor
  mDiv: any;  // div element on the page that will contain the editor
  mBlocklyWorkspace: any;
  mFirstBlock: any;

  // Variables statiques :

  // SModele constructor
  constructor( type:string, idToolboxXml:string, idDiv:string, idArea:string) {
    this.mArea = $('#'+idArea)[0];
    this.mDiv = $('#'+idDiv)[0];
    this.mBlocklyWorkspace = Blockly.inject(this.mDiv,
        {media: 'js_tools/blockly/media/',
         toolbox: document.getElementById(idToolboxXml),
       	collapse : true,
       	comments : true,
       	trashcan : true,
       	scrollbars : true,
       	sounds : false,
       	grid : {
       		spacing : 24,
       		length : 1,
       		colour : '#ddd',
       		snap : true
       	},
       	zoom : {
       		controls : true,
       		wheel : false,
       		startScale : 1,
       		maxScale : 2,
       		minScale : 0.5,
       		scaleSpeed : 1.2
       	}
      });
    var calling_object = this; //keep the calling object in "closure" for callbacks
    // callback on resize event
 	  $(window).resize(function(e) {
      calling_object.onResize.call(calling_object,e); // keep closure context
 	    }
    );
    this.onResize();
    Blockly.svgResize(this.mBlocklyWorkspace);

    if (type=='prep') title = Blockly.Msg.WIMS_BKY_PREP_START;
    else if (type == 'analysis') title = Blockly.Msg.WIMS_BKY_ANALYSIS_START;
    title = "   "+title+"   ";
    this.mFirstBlock = this.mBlocklyWorkspace.newBlock('wims_start');
    this.mFirstBlock.getField("START_TEXT").setValue(title);
    this.mFirstBlock.setDeletable(false);
    this.mFirstBlock.setMovable(false);
    this.mFirstBlock.initSvg();
    this.mFirstBlock.render();
    if (type=='prep') {
      this.mDeclarationBlock = this.mBlocklyWorkspace.newBlock('wims_declaration');
      this.mDeclarationBlock.getField("DECLARATION_TEXT").setValue(Blockly.Msg.WIMS_BKY_PREP_DECLARATION);
      this.mDeclarationBlock.setDeletable(false);
      this.mDeclarationBlock.setMovable(false);
      this.mDeclarationBlock.initSvg();
      this.mDeclarationBlock.render();
      var parentConnection = this.mFirstBlock.nextConnection;
      var childConnection = this.mDeclarationBlock.previousConnection;
      parentConnection.connect(childConnection);
    }
    // All blocks not connected are grayed out and disabled
    this.mBlocklyWorkspace.addChangeListener(Blockly.Events.disableOrphans);
  }

  // ***********  méthodes de l'éditeur graphique de programme ************

  init(): void {
    // Initialisation à faire après construction
  }

  onResize(): void {
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
  }
}

// Ne doit construire les editeurs que lorsque la page est complètement chargée
$(document).ready(function() {
  // If wants a "hat" on the first block
  // Blockly.BlockSvg.START_HAT = true;
  prepEditor = new SProgramEditor('prep', 'RId_toolbox_programPrep', 'RId_programPrep_blockly', 'RId_programPrep');
  analyseEditor = new SProgramEditor('analysis', 'RId_toolbox_programAnalyse', 'RId_programAnalyse_blockly', 'RId_programAnalyse');
  // console.log(prepEditor.mBlocklyWorkspace.id);
});
