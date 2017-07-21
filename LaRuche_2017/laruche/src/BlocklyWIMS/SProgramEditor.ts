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
  mType: string; // type of the editor (preparation 'prep' or analysis 'analysis')
  mBlocklyWorkspace: any;
  mFirstBlock: any; // Top start block
  mDeclarationBlock: any; // Type declaration block

  // Variables statiques :

  // SModele constructor
  constructor( type:string, idToolboxXml:string, idDiv:string, idArea:string) {
    this.mArea = $('#'+idArea)[0];
    this.mDiv = $('#'+idDiv)[0];
    this.mType = type;
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

    this.build_header_blocks();

    // All blocks not connected are grayed out and disabled
    this.mBlocklyWorkspace.addChangeListener(Blockly.Events.disableOrphans);
  }

  // ***********  méthodes de l'éditeur graphique de programme ************

  init(): void {
    // Initialisation à faire après construction
  }

  build_header_blocks(): void {
    // build the static start and type declaration blocks
    if (this.mType=='prep') {var title = Blockly.Msg.WIMS_BKY_PREP_START;}
    else if (this.mType == 'analysis') title = Blockly.Msg.WIMS_BKY_ANALYSIS_START;
    title = "   "+title+"   ";
    this.mFirstBlock = this.mBlocklyWorkspace.newBlock('wims_start');
    this.mFirstBlock.getField("START_TEXT").setValue(title);
    this.mFirstBlock.setDeletable(false);
    this.mFirstBlock.setMovable(false);
    this.mFirstBlock.initSvg();
    this.mFirstBlock.render();
    if (this.mType=='prep') {
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
  }

  load(xmlState:string): void {
    // clear the current workspace and (re)load a blockly workspace
    this.mBlocklyWorkspace.clear();
    this.build_header_blocks();
    // remove the first "unmovable" elements from the xml tree
    // (title and variable type declaration)
    var xmlTree = $.parseXML(xmlState);
    // if preparation 'prep' editor, also remove the declaration blocks
    // else remove only the start title block
    if (this.mType=='prep') {
      $(xmlTree).find("[name='DECLARATION']").remove();
      var xmlStateReduced = $(xmlTree).find("[type='wims_declaration']").children(":last-child").children().first().prop('outerHTML');
    } else {
      var xmlStateReduced = $(xmlTree).find("[type='wims_start']").children(":last-child").children().first().prop('outerHTML');
    }
    // add the xml header
    xmlStateReduced = '<xml xmlns=\"http://www.w3.org/1999/xhtml\">'+xmlStateReduced+'</xml>';
    // set the blocks onto the workspace
    var xmlStateDom = Blockly.Xml.textToDom(xmlStateReduced);
    var xmlStateFirst = $(xmlStateDom).children().first();
    if (xmlStateFirst.length>0){
      var xmlStateFirstId = xmlStateFirst[0].id;
      Blockly.Xml.domToWorkspace(xmlStateDom,this.mBlocklyWorkspace);
      // connect the start blocks to the newly loaded blocks
      var childConnection = this.mBlocklyWorkspace.getBlockById(xmlStateFirstId).previousConnection;
      // connect to the already built parent block.
      // the type of parent block depends on the type of blockly editor
      if (this.mType=='prep') {
        var parentConnection = this.mDeclarationBlock.nextConnection;
      } else {
        var parentConnection = this.mFirstBlock.nextConnection;
      }
      parentConnection.connect(childConnection);
    }
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
});
