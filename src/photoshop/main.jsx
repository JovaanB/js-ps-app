/* eslint-disable */

// json2.js from https://raw.githubusercontent.com/douglascrockford/JSON-js/master/json2.js
// minified via: https://www.minifier.org/

if (typeof JSON !== "object") {
  JSON = {};
}
(function() {
  "use strict";
  var rx_one = /^[\],:{}\s]*$/;
  var rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;
  var rx_three = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
  var rx_four = /(?:^|:|,)(?:\s*\[)+/g;
  var rx_escapable = /[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
  var rx_dangerous = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
  function f(n) {
    return n < 10 ? "0" + n : n;
  }
  function this_value() {
    return this.valueOf();
  }
  if (typeof Date.prototype.toJSON !== "function") {
    Date.prototype.toJSON = function() {
      return isFinite(this.valueOf())
        ? this.getUTCFullYear() +
            "-" +
            f(this.getUTCMonth() + 1) +
            "-" +
            f(this.getUTCDate()) +
            "T" +
            f(this.getUTCHours()) +
            ":" +
            f(this.getUTCMinutes()) +
            ":" +
            f(this.getUTCSeconds()) +
            "Z"
        : null;
    };
    Boolean.prototype.toJSON = this_value;
    Number.prototype.toJSON = this_value;
    String.prototype.toJSON = this_value;
  }
  var gap;
  var indent;
  var meta;
  var rep;
  function quote(string) {
    rx_escapable.lastIndex = 0;
    return rx_escapable.test(string)
      ? '"' +
          string.replace(rx_escapable, function(a) {
            var c = meta[a];
            return typeof c === "string"
              ? c
              : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
          }) +
          '"'
      : '"' + string + '"';
  }
  function str(key, holder) {
    var i;
    var k;
    var v;
    var length;
    var mind = gap;
    var partial;
    var value = holder[key];
    if (
      value &&
      typeof value === "object" &&
      typeof value.toJSON === "function"
    ) {
      value = value.toJSON(key);
    }
    if (typeof rep === "function") {
      value = rep.call(holder, key, value);
    }
    switch (typeof value) {
      case "string":
        return quote(value);
      case "number":
        return isFinite(value) ? String(value) : "null";
      case "boolean":
      case "null":
        return String(value);
      case "object":
        if (!value) {
          return "null";
        }
        gap += indent;
        partial = [];
        if (Object.prototype.toString.apply(value) === "[object Array]") {
          length = value.length;
          for (i = 0; i < length; i += 1) {
            partial[i] = str(i, value) || "null";
          }
          v =
            partial.length === 0
              ? "[]"
              : gap
              ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]"
              : "[" + partial.join(",") + "]";
          gap = mind;
          return v;
        }
        if (rep && typeof rep === "object") {
          length = rep.length;
          for (i = 0; i < length; i += 1) {
            if (typeof rep[i] === "string") {
              k = rep[i];
              v = str(k, value);
              if (v) {
                partial.push(quote(k) + (gap ? ": " : ":") + v);
              }
            }
          }
        } else {
          for (k in value) {
            if (Object.prototype.hasOwnProperty.call(value, k)) {
              v = str(k, value);
              if (v) {
                partial.push(quote(k) + (gap ? ": " : ":") + v);
              }
            }
          }
        }
        v =
          partial.length === 0
            ? "{}"
            : gap
            ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}"
            : "{" + partial.join(",") + "}";
        gap = mind;
        return v;
    }
  }
  if (typeof JSON.stringify !== "function") {
    meta = {
      "\b": "\\b",
      "\t": "\\t",
      "\n": "\\n",
      "\f": "\\f",
      "\r": "\\r",
      '"': '\\"',
      "\\": "\\\\",
    };
    JSON.stringify = function(value, replacer, space) {
      var i;
      gap = "";
      indent = "";
      if (typeof space === "number") {
        for (i = 0; i < space; i += 1) {
          indent += " ";
        }
      } else if (typeof space === "string") {
        indent = space;
      }
      rep = replacer;
      if (
        replacer &&
        typeof replacer !== "function" &&
        (typeof replacer !== "object" || typeof replacer.length !== "number")
      ) {
        throw new Error("JSON.stringify");
      }
      return str("", { "": value });
    };
  }
  if (typeof JSON.parse !== "function") {
    JSON.parse = function(text, reviver) {
      var j;
      function walk(holder, key) {
        var k;
        var v;
        var value = holder[key];
        if (value && typeof value === "object") {
          for (k in value) {
            if (Object.prototype.hasOwnProperty.call(value, k)) {
              v = walk(value, k);
              if (v !== undefined) {
                value[k] = v;
              } else {
                delete value[k];
              }
            }
          }
        }
        return reviver.call(holder, key, value);
      }
      text = String(text);
      rx_dangerous.lastIndex = 0;
      if (rx_dangerous.test(text)) {
        text = text.replace(rx_dangerous, function(a) {
          return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
        });
      }
      if (
        rx_one.test(
          text
            .replace(rx_two, "@")
            .replace(rx_three, "]")
            .replace(rx_four, "")
        )
      ) {
        j = eval("(" + text + ")");
        return typeof reviver === "function" ? walk({ "": j }, "") : j;
      }
      throw new SyntaxError("JSON.parse");
    };
  }
})();

// Actual PS lib stuff

var ps = (function() {
  var s2t = function(s) {
    return app.stringIDToTypeID(s);
  };

  var c2t = function(c) {
    return app.charIDToTypeID(c);
  };

  // [
  //   {
  //     actionSet: "Default Actions",
  //     index: 1,
  //     count: "3",
  //     actions: ["Action One", "Action Two", "Action Three"]
  //   },
  //   {
  //     actionSet: "Some Other Set",
  //     index: 2,
  //     count: "2",
  //     actions: ["Action 1", "Action 2"]
  //   }
  // ]

  var getActionsData = function() {
    var i = 1;
    var actionSets = [];

    while (true) {
      var r = new ActionReference();
      r.putIndex(s2t("actionSet"), i);
      var d,
        l = $.level;
      $.level = 0;
      try {
        d = executeActionGet(r);
      } catch (e) {
        break;
      } finally {
        $.level = l;
      }

      if (d.hasKey(s2t("name"))) {
        var actionSet = {};
        actionSet.actionSet = d.getString(s2t("name")); // the name
        actionSet.index = i;
        actionSet.count = d.getString(s2t("numberOfChildren"));
        actionSet.actions = [];
        for (var j = 1; j <= actionSet.count; j++) {
          var r = new ActionReference();
          r.putIndex(s2t("action"), j);
          r.putIndex(s2t("actionSet"), actionSet.index);
          var d1 = executeActionGet(r);
          var actionName = d1.getString(s2t("name"));
          actionSet.actions.push(actionName);
        }
        actionSets.push(actionSet);
      }
      i++;
    }
    // $.writeln(actionSets.toSource())
    return JSON.stringify(actionSets);
  };

  var runAction = function(action, actionset) {
    app.doAction(action, actionset);
  };

  return {
    getActionsData: getActionsData,
    runAction: runAction,
  };
})();
