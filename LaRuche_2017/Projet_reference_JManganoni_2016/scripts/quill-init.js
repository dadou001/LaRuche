

var editor = new Quill('#editor-container', {
  modules: {
    'toolbar': { container: '#formatting-container' },
    'link-tooltip': true,
    'image-tooltip': true
  }
});

editor.on('selection-change', function(range) {
  console.log('selection-change', range)
});

editor.on('text-change', function(delta, source) {
  console.log('text-change', delta, source)
});

