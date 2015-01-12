ace.define("ace/mode/ldpath_highlight_rules", function(require, exports, module) {
  "use strict";
  
  var oop = require("../lib/oop");
  var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;
  
  var LdpathHighlightRules = function() {
    
    
    var escapeRe = /\\u[0-9a-fA-F]{4}|\\/;
    
    this.$rules = {
      "start" : [
    {
      token: ["constant.language.uri", "meta.tag.language"],
      regex: '(<[^>]+>)(\\[@\\w+\\])?'
    },
    {
      token: ["keyword.operator"],
      regex: '(\\s*[/|]\\s*)'
    },
    {
      token: ["keyword.operator"],
      regex: '(\\s*::\\s*)'
    },

    {
      token: ["punctuation"],
      regex: '([\\(|\\)])'
    },
    {
      token: ["text.prefix", "punctuation.ns", "text.localName", "meta.tag.language"],
      regex: '([^\\s:]+)(:)(\\w+)(\\[@\\w+\\])?'
    },
    {
      token: ["variable", "text"],
      regex: '^(\\w+)(\\s*=)'
    },
    {
      token: ['keyword.operator.prefix', 'constant'],
      regex: '^(@prefix\\s+)(\\w+)'
    },
    {
      token: ['keyword.operator'],
      regex: '^(@\\w+)'
    },
    {
      token: ['punctuation'],
      regex: '(\\s*;\\s*)$'
    },
    {
      defaultToken : "text"
    }
    ]
    };

  this.normalizeRules();
};

oop.inherits(LdpathHighlightRules, TextHighlightRules);

exports.LdpathHighlightRules = LdpathHighlightRules;

});