ace.define("ace/mode/ldpath", function(require, exports, module) {
  "use strict";
  
  var oop = require("../lib/oop");
  var TextMode = require("./text").Mode;
  
  var LdpathCompletions = require("./ldpath_completions").LdpathCompletions;
  var LdpathHighlightRules = require("./ldpath_highlight_rules").LdpathHighlightRules;
  
  var Mode = function() {
    this.HighlightRules = LdpathHighlightRules;
    this.completer = new LdpathCompletions();
  };
  oop.inherits(Mode, TextMode);
  
  (function() {
    this.lineCommentStart = "#";
    this.blockComment = {start: "/*", end: "*/"};
    
    this.getNextLineIndent = function(state, line, tab) {
      var indent = this.$getIndent(line);
      
      if (state == "start") {
        var match = line.match(/^.*[\{\(\[]\s*$/);
          if (match) {
            indent += tab;
          }
        }
        
        return indent;
      };
      
      this.$id = "ace/mode/ldpath";
    }).call(Mode.prototype);
    
    exports.Mode = Mode;
    
  });