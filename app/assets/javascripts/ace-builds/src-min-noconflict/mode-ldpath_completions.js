ace.define("ace/mode/ldpath_completions", function(require, exports, module) {
  "use strict";
  
  var LdpathCompletions = function() {    
  };

  (function() {
    var tap = "?<autocomplete>fn:predicates()";
    var prefixes = {};

    this.getTypeCompletions = function(editor, session, pos, prefix, callback) {
      callback(null, []);
      return;
    };

    this.getCompletions = function(editor, session, pos, prefix, callback) {
      var line = session.getLine(pos.row);

      // x = <info:b> / info:x :: xsd:string
      // xxxxxxxxxxxxxxxxxxxxxxxxx^^^^^^^^^^
      if (line.match(/::/) && line.lastIndexOfRegex(/::/) < pos.column) {
        this.getTypeCompletions(editor, session, pos, prefix, callback);
        return;
      }
      
      // x = <info:b> / info:x :: xsd:string 
      // xxxx^xxxxxxxxxx^xxxxxxxxxxxxxxxxxxxx
      if (line.match(/=/) && line.indexOfRegex(/=/) < pos.column) {
        this.getPropertyCompletions(editor, session, pos, prefix, callback);
        return;
      }
      
      callback(null, []);
      return;

    };

    this.insertAutocompleteTap = function(line, column) {
      // x = <info:b> / info:x / info:y[is-a info:z] :: xsd:string

      // split the line at the cursor
      var segment = line.slice(0, column);
      var rest_of_line = line.slice(column + 1, line.length);

      // backtrack to the whitespace, property selector or test
      var tap_location = segment.lastIndexOfRegex(/[\s/\[]/);
      var preamble = line.slice(0, tap_location);
      
      // look forward to the next whitespace, property selector, or end of test
      var post_tap_location = rest_of_line.indexOfRegex(/[\s\/\]]/);

      var good_rest_of_line;

      if (post_tap_location == -1) {
        good_rest_of_line = "";
      } else {
        good_rest_of_line = rest_of_line.slice(post_tap_location, rest_of_line.length);
      }

      var line_with_tap = line.slice(0, tap_location) + " " + tap + " " + good_rest_of_line;
      
      if (!line_with_tap.match(/::/)) {
        line_with_tap += " :: xsd:string";
      }

      if (!line_with_tap.match(/;\s*$/)) {
        line_with_tap += " ; ";
      }

      return line_with_tap;

    };

    this.extractPrefixes = function(session) {
      var prefix_lines = $.grep(session.getLines(0,session.getRowLength()), function(e) { return e.match(/^@prefix/); });

      $.each(prefix_lines, function(i, line) {
        var match = line.match(/@prefix\s+([^:]+):\s*<([^>]+)>/);
        prefixes[match[2]] = match[1];
      });

      return prefix_lines;
    };
    
    this.getPropertyCompletions = function(editor, session, pos, prefix, callback) {

      var prefix_lines = this.extractPrefixes(session);
      var line_with_tap = this.insertAutocompleteTap(session.getLine(pos.row), pos.column);

      var program = prefix_lines.join("\n") + "\n" + line_with_tap;

      var $http = editor.$http;
      var $ldpath = editor.$ldpath;

      if ($ldpath.url == "") {
        callback(null, []);
        return;
      }
      
      $http.post("/evaluate", { url: $ldpath.url, program: program}).success(function(data,status) {
        var uris = Object.keys(prefixes).sort(function(a,b) { return b.length - a.length; });

        callback(null, $.map($.unique(data["autocomplete"]), function(e) {
          var val = "<" + e + ">";
          uris.some(function(uri) {
            var idx = e.search(uri);
            if (idx == 0) {
              val = prefixes[uri] + ":" + e.slice(uri.length);
              return true;
            }
          });
          return { value: val, identifierRegex: /[a-zA-Z_0-9\$\-\u00A2-\uFFFF<>]/};
        }));
      });
    };
      
  }).call(LdpathCompletions.prototype);
          
  exports.LdpathCompletions = LdpathCompletions;
});


String.prototype.indexOfRegex = function(regex){
  var match = this.match(regex);
  if(match) return this.indexOf(match[0]);
  else return -1;
}

String.prototype.lastIndexOfRegex = function(regex){
  var match = this.match(regex);
  if(match) return this.lastIndexOf(match[match.length-1]);
  else return -1;
}
