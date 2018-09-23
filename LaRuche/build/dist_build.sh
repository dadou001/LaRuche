#!/bin/sh
# ========== Build the LaRuche distribution =============

echo "Minifying the LaRuche code."
#../node_modules/.bin/uglifyjs ../src/*.js ../src/BlocklyWIMS/*.js ../src/BlocklyWIMS/OEF/*.js --source-map -o ../laruche.min.js
uglifyjs ../src/*.js ../src/BlocklyWIMS/*.js ../src/BlocklyWIMS/OEF/*.js --source-map -o ../laruche.min.js

# == save the old distribution directory ===========

orig=".."
dist0="../../distribution"
echo "Saving $dist0 to ${dist0}.old"
if [ -d $dist0 ]; then
  rm -rf "${dist0}.old"
  mv $dist0 "${dist0}.old"
  rm -rf $dist0
fi

echo "Copying all required files to $dist0"
dist="${dist0}/LaRuche"
mkdir -p $dist

cp -Rf "${orig}/css" $dist
cp -Rf "${orig}/examples" $dist
cp -Rf "${orig}/images" $dist

# == Copy all the external packages ===================

# ---------- Blockly --------------------------------
orig_blockly="${orig}/js_tools/blockly"
mkdir -p "${dist}/js_tools/blockly"
cp -Rf "${orig_blockly}/media" "${dist}/js_tools/blockly"
cp -Rf "${orig_blockly}/msg" "${dist}/js_tools/blockly"
cp -Rf "${orig_blockly}/blockly_compressed.js" "${dist}/js_tools/blockly"
cp -Rf "${orig_blockly}/blocks_compressed.js" "${dist}/js_tools/blockly"
cp -Rf "${orig_blockly}/blocks_compressed.js" "${dist}/js_tools/blockly"
cp -Rf "${orig_blockly}/dart_compressed.js" "${dist}/js_tools/blockly"
cp -Rf "${orig_blockly}/javascript_compressed.js" "${dist}/js_tools/blockly"
cp -Rf "${orig_blockly}/php_compressed.js" "${dist}/js_tools/blockly"
cp -Rf "${orig_blockly}/python_compressed.js" "${dist}/js_tools/blockly"
cp -Rf "${orig_blockly}/lua_compressed.js" "${dist}/js_tools/blockly"
cp -Rf "${orig_blockly}/LICENSE" "${dist}/js_tools/blockly"
cp -Rf "${orig_blockly}/README.md" "${dist}/js_tools/blockly"

# ---------- KaTex --------------------------------
orig_katex="${orig}/js_tools/katex"
mkdir -p "${dist}/js_tools/katex"
cp -Rf "${orig_katex}/contrib" "${dist}/js_tools/katex"
cp -Rf "${orig_katex}/fonts" "${dist}/js_tools/katex"
cp -Rf "${orig_katex}/katex.min.js" "${dist}/js_tools/katex"
cp -Rf "${orig_katex}/katex.min.css" "${dist}/js_tools/katex"
cp -Rf "${orig_katex}/README.md" "${dist}/js_tools/katex"

# ---------- QuillJS --------------------------------
orig_quill="${orig}/js_tools/quill"
mkdir -p "${dist}/js_tools/quill"
cp -f "${orig_quill}/atom-one-light.css" "${dist}/js_tools/quill/"
cp -Rf "${orig_quill}/highlight.js-master" "${dist}/js_tools/quill/"
cp -f ${orig_quill}/quill.* "${dist}/js_tools/quill/"

# ---------- Foundation --------------------------------
orig_vendor="${orig}/js_tools/vendor"
mkdir -p "${dist}/js_tools/vendor"
cp -Rf "${orig_vendor}/foundation.min.js" "${dist}/js_tools/vendor"
cp -Rf "${orig_vendor}/jquery.js" "${dist}/js_tools/vendor"
cp -Rf "${orig_vendor}/what-input.js" "${dist}/js_tools/vendor"

# ---------- html2canvas --------------------------------
cp -f "${orig}/js_tools/html2canvas.js" "${dist}/js_tools"

# == language files ==========================

cp -Rf "${orig}/src" ${dist}

# == higher level files ======================

cp -f "${orig}/index.html" ${dist}
cp -f "${orig}/laruche.min.js" ${dist}
cp -f ${orig}/README* ${dist}


# == compress the distribution
echo "Compressing the distribution."
cd $dist0
tar zcf laruche.tar.gz laruche

echo "La Ruche Distribution completed"
