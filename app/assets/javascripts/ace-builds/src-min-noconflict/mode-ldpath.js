ace.define("ace/mode/ldpath", function(require, exports, module) {
  "use strict";
  
  var oop = require("../lib/oop");
  var TextMode = require("./text").Mode;
  var LdpathHighlightRules = require("./ldpath_highlight_rules").LdpathHighlightRules;
  
  var Mode = function() {
    this.HighlightRules = LdpathHighlightRules;
  };
  oop.inherits(Mode, TextMode);
  
  (function() {
    
    this.lineCommentStart = "#";
    
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