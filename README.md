La Ruche
========
La Ruche is an interactive editor of exercises for the [WIMS pedagogical platform](http://wims.auto.u-psud.fr/wims/) (see also [the WIMSEDU association](http://wimsedu.info)) that produces OEF (Open Exercise Format) code. This code may be sent or copied to a WIMS server that will generate the exercise, show it to a student, mark it, etc...

Use
-----
For the end user :

 - in a terminal, go to the LaRuche/build directory :
   ```
   cd LaRuche/build
   ```
 - run the dist_build.sh script. This will build the "distribution" directory. The "uglifyjs" software should have been installed :
   ```
   ./dist_build.sh
   ```
 - inside the distribution/LaRuche directory, double-click on the "index.html" file, this should bring the editor in standalone mode

Integration into WIMS
--------------------------
La Ruche will be integrated into WIMS very soon (promise on the 17 July 2017...)

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
