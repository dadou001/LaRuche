/**
 * @fileoverview Helper functions for generating OEF for blocks.
 * @author buskulic@lapp.in2p3.fr (Damir Buskulic)
 */
'use strict';

goog.provide('Blockly.OEF');

goog.require('Blockly.Generator');


/**
 * OEF code generator.
 * @type {!Blockly.Generator}
 */
Blockly.OEF = new Blockly.Generator('OEF');

/**
 * List of illegal variable names.
 * This is not intended to be a security feature.  Blockly is 100% client-side,
 * so bypassing this list is trivial.  This is intended to prevent users from
 * accidentally clobbering a built-in object or function.
 * @private
 */
Blockly.OEF.addReservedWords(
    'Blockly,' +
    'for,while,do,real,integer,matrix,function,wims,answer,' +
    'const,null,true,false,');

/**
 * Order of operation ENUMs.
 */
Blockly.OEF.ORDER_ATOMIC = 0;           // 0 "" ...
Blockly.OEF.ORDER_NEW = 1.1;            // new
Blockly.OEF.ORDER_MEMBER = 1.2;         // . []
Blockly.OEF.ORDER_FUNCTION_CALL = 2;    // ()
Blockly.OEF.ORDER_INCREMENT = 3;        // ++
Blockly.OEF.ORDER_DECREMENT = 3;        // --
Blockly.OEF.ORDER_BITWISE_NOT = 4.1;    // ~
Blockly.OEF.ORDER_UNARY_PLUS = 4.2;     // +
Blockly.OEF.ORDER_UNARY_NEGATION = 4.3; // -
Blockly.OEF.ORDER_LOGICAL_NOT = 4.4;    // !
Blockly.OEF.ORDER_TYPEOF = 4.5;         // typeof
Blockly.OEF.ORDER_VOID = 4.6;           // void
Blockly.OEF.ORDER_DELETE = 4.7;         // delete
Blockly.OEF.ORDER_DIVISION = 5.1;       // /
Blockly.OEF.ORDER_MULTIPLICATION = 5.2; // *
Blockly.OEF.ORDER_MODULUS = 5.3;        // %
Blockly.OEF.ORDER_SUBTRACTION = 6.1;    // -
Blockly.OEF.ORDER_ADDITION = 6.2;       // +
Blockly.OEF.ORDER_BITWISE_SHIFT = 7;    // << >> >>>
Blockly.OEF.ORDER_RELATIONAL = 8;       // < <= > >=
Blockly.OEF.ORDER_IN = 8;               // in
Blockly.OEF.ORDER_INSTANCEOF = 8;       // instanceof
Blockly.OEF.ORDER_EQUALITY = 9;         // == != === !==
Blockly.OEF.ORDER_BITWISE_AND = 10;     // &
Blockly.OEF.ORDER_BITWISE_XOR = 11;     // ^
Blockly.OEF.ORDER_BITWISE_OR = 12;      // |
Blockly.OEF.ORDER_LOGICAL_AND = 13;     // &&
Blockly.OEF.ORDER_LOGICAL_OR = 14;      // ||
Blockly.OEF.ORDER_CONDITIONAL = 15;     // ?:
Blockly.OEF.ORDER_ASSIGNMENT = 16;      // = += -= *= /= %= <<= >>= ...
Blockly.OEF.ORDER_COMMA = 17;           // ,
Blockly.OEF.ORDER_NONE = 99;            // (...)

/**
 * List of outer-inner pairings that do NOT require parentheses.
 * @type {!Array.<!Array.<number>>}
 */
Blockly.OEF.ORDER_OVERRIDES = [
  // (foo()).bar -> foo().bar
  // (foo())[0] -> foo()[0]
  [Blockly.OEF.ORDER_FUNCTION_CALL, Blockly.OEF.ORDER_MEMBER],
  // (foo())() -> foo()()
  [Blockly.OEF.ORDER_FUNCTION_CALL, Blockly.OEF.ORDER_FUNCTION_CALL],
  // (foo.bar).baz -> foo.bar.baz
  // (foo.bar)[0] -> foo.bar[0]
  // (foo[0]).bar -> foo[0].bar
  // (foo[0])[1] -> foo[0][1]
  [Blockly.OEF.ORDER_MEMBER, Blockly.OEF.ORDER_MEMBER],
  // (foo.bar)() -> foo.bar()
  // (foo[0])() -> foo[0]()
  [Blockly.OEF.ORDER_MEMBER, Blockly.OEF.ORDER_FUNCTION_CALL],

  // !(!foo) -> !!foo
  [Blockly.OEF.ORDER_LOGICAL_NOT, Blockly.OEF.ORDER_LOGICAL_NOT],
  // a * (b * c) -> a * b * c
  [Blockly.OEF.ORDER_MULTIPLICATION, Blockly.OEF.ORDER_MULTIPLICATION],
  // a + (b + c) -> a + b + c
  [Blockly.OEF.ORDER_ADDITION, Blockly.OEF.ORDER_ADDITION],
  // a && (b && c) -> a && b && c
  [Blockly.OEF.ORDER_LOGICAL_AND, Blockly.OEF.ORDER_LOGICAL_AND],
  // a || (b || c) -> a || b || c
  [Blockly.OEF.ORDER_LOGICAL_OR, Blockly.OEF.ORDER_LOGICAL_OR]
];

/**
 * Initialise the database of variable names.
 * @param {!Blockly.Workspace} workspace Workspace to generate code from.
 */
Blockly.OEF.init = function(workspace) {
  // Create a dictionary of definitions to be printed before the code.
  Blockly.OEF.definitions_ = Object.create(null);
  // Create a dictionary mapping desired function names in definitions_
  // to actual function names (to avoid collisions with user functions).
  Blockly.OEF.functionNames_ = Object.create(null);

  if (!Blockly.OEF.variableDB_) {
    Blockly.OEF.variableDB_ =
        new Blockly.Names(Blockly.OEF.RESERVED_WORDS_);
  } else {
    Blockly.OEF.variableDB_.reset();
  }

  var defvars = [];
  var variables = workspace.variableList;
  if (variables.length) {
    for (var i = 0; i < variables.length; i++) {
      defvars[i] = Blockly.OEF.variableDB_.getName(variables[i],
          Blockly.Variables.NAME_TYPE);
    }
    Blockly.OEF.definitions_['variables'] = "";
  }
};

/**
 * Prepend the generated code with the variable definitions.
 * @param {string} code Generated code.
 * @return {string} Completed code.
 */
Blockly.OEF.finish = function(code) {
  // Convert the definitions dictionary into a list.
  var definitions = [];
  for (var name in Blockly.OEF.definitions_) {
    definitions.push(Blockly.OEF.definitions_[name]);
  }
  // Clean up temporary data.
  delete Blockly.OEF.definitions_;
  delete Blockly.OEF.functionNames_;
  Blockly.OEF.variableDB_.reset();
  return definitions.join('\n\n') + '\n\n\n' + code;
};

/**
 * Naked values are top-level blocks with outputs that aren't plugged into
 * anything.  A trailing semicolon is needed to make this legal.
 * @param {string} line Line of generated code.
 * @return {string} Legal line of code.
 */
Blockly.OEF.scrubNakedValue = function(line) {
  return line + '\n';
};

/**
 * Encode a string as a properly escaped JavaScript string, complete with
 * quotes.
 * @param {string} string Text to encode.
 * @return {string} JavaScript string.
 * @private
 */
Blockly.OEF.quote_ = function(string) {
  // Can't use goog.string.quote since Google's style guide recommends
  // JS string literals use single quotes.
  string = string.replace(/\\/g, '\\\\')
                 .replace(/\n/g, '\\\n')
                 .replace(/'/g, '\\\'');
  return '\'' + string + '\'';
};

/**
 * Common tasks for generating JavaScript from blocks.
 * Handles comments for the specified block and any connected value blocks.
 * Calls any statements following this block.
 * @param {!Blockly.Block} block The current block.
 * @param {string} code The JavaScript code created for this block.
 * @return {string} JavaScript code with comments and subsequent blocks added.
 * @private
 */
Blockly.OEF.scrub_ = function(block, code) {
  var commentCode = '';
  // Only collect comments for blocks that aren't inline.
  if (!block.outputConnection || !block.outputConnection.targetConnection) {
    // Collect comment for this block.
    var comment = block.getCommentText();
    comment = Blockly.utils.wrap(comment, Blockly.OEF.COMMENT_WRAP - 3);
    if (comment) {
      if (block.getProcedureDef) {
        // Use a comment block for function comments.
        commentCode += '/**\n' +
                       Blockly.OEF.prefixLines(comment + '\n', ' * ') +
                       ' */\n';
      } else {
        commentCode += Blockly.OEF.prefixLines(comment + '\n', '// ');
      }
    }
    // Collect comments for all value arguments.
    // Don't collect comments for nested statements.
    for (var i = 0; i < block.inputList.length; i++) {
      if (block.inputList[i].type == Blockly.INPUT_VALUE) {
        var childBlock = block.inputList[i].connection.targetBlock();
        if (childBlock) {
          var comment = Blockly.OEF.allNestedComments(childBlock);
          if (comment) {
            commentCode += Blockly.OEF.prefixLines(comment, '// ');
          }
        }
      }
    }
  }
  var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  var nextCode = Blockly.OEF.blockToCode(nextBlock);
  return commentCode + code + nextCode;
};

/**
 * Gets a property and adjusts the value while taking into account indexing.
 * @param {!Blockly.Block} block The block.
 * @param {string} atId The property ID of the element to get.
 * @param {number=} opt_delta Value to add.
 * @param {boolean=} opt_negate Whether to negate the value.
 * @param {number=} opt_order The highest order acting on this value.
 * @return {string|number}
 */
Blockly.OEF.getAdjusted = function(block, atId, opt_delta, opt_negate,
    opt_order) {
  var delta = opt_delta || 0;
  var order = opt_order || Blockly.OEF.ORDER_NONE;
  if (block.workspace.options.oneBasedIndex) {
    delta--;
  }
  var defaultAtIndex = block.workspace.options.oneBasedIndex ? '1' : '0';
  if (delta > 0) {
    var at = Blockly.OEF.valueToCode(block, atId,
        Blockly.OEF.ORDER_ADDITION) || defaultAtIndex;
  } else if (delta < 0) {
    var at = Blockly.OEF.valueToCode(block, atId,
        Blockly.OEF.ORDER_SUBTRACTION) || defaultAtIndex;
  } else if (opt_negate) {
    var at = Blockly.OEF.valueToCode(block, atId,
        Blockly.OEF.ORDER_UNARY_NEGATION) || defaultAtIndex;
  } else {
    var at = Blockly.OEF.valueToCode(block, atId, order) ||
        defaultAtIndex;
  }

  if (Blockly.isNumber(at)) {
    // If the index is a naked number, adjust it right now.
    at = parseFloat(at) + delta;
    if (opt_negate) {
      at = -at;
    }
  } else {
    // If the index is dynamic, adjust it in code.
    if (delta > 0) {
      at = at + ' + ' + delta;
      var innerOrder = Blockly.OEF.ORDER_ADDITION;
    } else if (delta < 0) {
      at = at + ' - ' + -delta;
      var innerOrder = Blockly.OEF.ORDER_SUBTRACTION;
    }
    if (opt_negate) {
      if (delta) {
        at = '-(' + at + ')';
      } else {
        at = '-' + at;
      }
      var innerOrder = Blockly.OEF.ORDER_UNARY_NEGATION;
    }
    innerOrder = Math.floor(innerOrder);
    order = Math.floor(order);
    if (innerOrder && order >= innerOrder) {
      at = '(' + at + ')';
    }
  }
  return at;
};
