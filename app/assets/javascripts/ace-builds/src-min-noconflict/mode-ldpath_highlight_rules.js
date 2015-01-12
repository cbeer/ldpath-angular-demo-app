ace.define("ace/mode/ldpath_highlight_rules", function(require, exports, module) {
  "use strict";
  
  var oop = require("../lib/oop");
  var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;
  
  var LdpathHighlightRules = function() {
    
    
    var escapeRe = /\\u[0-9a-fA-F]{4}|\\/;
    
    this.$rules = {
      "start" : [
    {
      token: ['punctuation.eol'],
      regex: '(\\s*;\\s*)$'
    },
    {
      token: ['keyword.operator.prefix', 'constant.prefix'],
      regex: '^(@prefix\\s+)(\\w+)'
    },
    {
      token: ['keyword.operator'],
      regex: '^(@\\w+)'
    },
    {
      token : "constant.string", // single line
      regex : '["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]'
    },
    {
      token: ["constant.language.uri"],
      regex: '(<[^>]+>)'
    },
    {
      token: ["meta.tag.language"],
      regex: '(\\[@\\w+\\])'
    },
    {
      token: ["keyword.selector.self_selector"],
      regex: '(\\s*\\.\\s*)'
    },
    {
      token: ["keyword.selector.compound_selector"],
      regex: '(\\s*[/|&]\\s*)'
    },
    {
      token: ["keyword.selector.function_selector"],
      regex: '(\\s*fn:\\w+)'
    },
    {
      token: ["keyword.operator.recursive_operator"],
      regex: '(\\s*([\\*\\+]|({\\s*\\d*\\s*,\\s*\\d*\\s*}))\\s*)'
    },
    {
      token: ["keyword.operator.test.test_type"],
      regex: '(\\^\\^)'
    },
    {
      token: ["keyword.operator.test.test_is"],
      regex: '(\\s+is\\s+)'
    },
    {
      token: ["keyword.operator.reverse"],
      regex: '(\\s*\\^)'
    },
    {
      token: ["keyword.operator.dcolon"],
      regex: '(\\s*::\\s*)'
    },
    {
      token: ["punctuation.grouping"],
      regex: '([\\(|\\)])'
    },
    {
      token: ["punctuation.testing"],
      regex: '([\\[|\\]])'
    },
    {
      token: ["constant.prefix", "punctuation.ns", "constant.localName"],
      regex: '([^\\s:]+)(:)(\\w+)'
    },
    {
      token: ["variable", "punctuation.assign"],
      regex: '^(\\w+)(\\s*=)'
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