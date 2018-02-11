La Ruche
========
La Ruche is an interactive editor of exercises for the [WIMS pedagogical platform](http://wims.auto.u-psud.fr/wims/) (see also [the WIMSEDU association](http://wimsedu.info)) that produces OEF (Open Exercise Format) code. This code may be sent or copied to a WIMS server that will generate the exercise, show it to a student, mark it, etc...

Use
-----
For the end user :

 - download the contents of the distribution/laruche directory or download and uncompress the laruche.tar.gz file
 - inside the laruche directory, double-click on the "index.html" file, this should bring the editor in standalone mode

Developers
----------------
For most of the Javascript development, we use TypeScript, so one should download and install the TypeScript compiler.

### Installing and using the Typescript compiler
As explained on the [typescript site](https://www.typescriptlang.org/#download-links), one can install the typescript compiler as a Node.js package :

`npm install -g typescript`

and the compilation of .ts files is done with :

`tsc helloworld.ts`

To customize the Typescript behavior, one has to put a tsconfig.json file in the top directory (in the "laruche" directory). An example file can be :
```
{
    "compilerOptions": {
        "outDir": "./src",
        "allowJs": false,
        "target": "es5"
    },
    "include": [
        "./src/**/*"
    ],
    "exclude": [
        "./reference.ts"
    ]
}
```
One should then be able to use the command `tsc` in the "laruche" directory to compile everything at once.

### Installing UglifyJS
[UglifyJS](https://github.com/mishoo/UglifyJS2) is used to minify the final code. The installation as a NodeJS package is done via :

`npm install -g uglify-js`

### Building
The package should be built with the laruche/build/dist_build.sh script.
It will
- collect and minify the js files, produce the laruche.min.js file, as well as the corresponding map file for debugging.
- build the "distribution" directory that contains a cleaned and streamlined distribution (without any `.ts` files)

### Other packages used

The packages used are

 - the [Foundation](http://foundation.zurb.com) framework
 - the [Blockly](https://developers.google.com/blockly/) editor
 - the [Quill](http://quilljs.com) editor which uses
 - the [KaTex](https://khan.github.io/KaTeX/) library
 - the [highlight](https://highlightjs.org/) library

After having cloned the repository, one can build a working distribution with the build/dist_build.sh script.

Integration into WIMS
--------------------------
La Ruche will be integrated into WIMS very soon (promise made on July 17, 2017...)

The OEF language
--------------------------
The OEF language is a mix between a set of specific commands, html and LaTeX. Here is an example :

```
\title{ Square of an integer }
\computeanswer{ no }

\integer{ n = randint( −50..50) }
\integer{ N = (\n)^2 }

\statement{ Compute de square of \n. }

\answer{ Square of \n }{ \N }{ type=numeric }
\feedback{ \reply1 < 0 }{ The square of an integer is always positive }
```

This mix make it difficult for newcomers to grasp all the specifics of the language quickly. The aim of the "La Ruche" editor is to lower the barrier for a newcomer, allowing him/her to easily build exercises for WIMS.

The various tabs of the editor
------------------------------------------
There are three main tabs in the editor :

 - the **Statement** tab where the user enters the statement of his exercise in a RTE, namely a special [Quill](http://quilljs.com) editor. This statement may contain references to variables, drawings, objects that are prepared in...
 - the **Preparation** tab, where the user can make all the needed computations to set the variables, for example setting some of them as random. To that effect, a graphical Blockly editor is used.
 - the **Analysis** tab, where the answer type for the student is set, as well as all necessary action (in another Blockly editor) after the student has entered his answer and pushed the "Send" button.

The metadata (name of the exercise, name of the author, etc...) are entered in the **Header** tab. The **Code** tab will contain the OEF generated code that may be copied to the raw mode editor in the "*Createxo*" module of WIMS. In the **Saving** tab one can generate a JSON string that may be used to save and reload an exercise.
