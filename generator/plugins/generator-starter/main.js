(function() {
  "use strict";
  const meta = require("./package.json");

  const MENU_ID = meta.menu.id,
    MENU_LABEL = meta.menu.label,
    PLUGIN_ERROR = "plugin_error";

  var _generator = null,
    _currentDocumentId = null,
    _config = null;

  const io = require("socket.io")(8099);

  /**
   * Evaluates a JSX String always in the same JSX Engine
   * @param {String} JSXString The string to evaluate
   */
  const jsx = function(JSXString) {
    // keeps it thenable
    return _generator.evaluateJSXString(JSXString, true);
  };

  /*********** INIT ***********/

  function init(generator, config) {
    _generator = generator;
    _config = config;

    console.log("initializing with config %j", _config);

    io.on("connection", (socket) => {
      console.log("Socket: ", socket);

      //socket.on("some-event", (payload, callback) => {
      // console.log("Server has received from client this: ", payload);
      // let returnString = "Greetings from the server!";
      // comment
      //  return callback(returnString);
      //});

      //socket.on("jsxLib", function(payload, callback) {
      //  jsx(payload)
      //    .then((res) => {
      //      return jsx("ps.getActionsData()");
      //    })
      //    .then((res) => {
      //      callback(null, res);
      //    });
      // });

      socket.on("runScript", function(payload, callback) {
        jsx(payload)
          .then((res) => {
            callback(null, res);
          })
          .catch((err) => callback(err));
      });

      socket.on("getThumbnail", function(payload, callback) {
        jsx(`app.open(File("${payload}"))`)
          .then((res) => {
            return getThumbnail();
          })
          .then((res) => {
            callback(null, res);
          })
          .catch((err) => callback(err));
      });
    });

    _generator.addMenuItem(MENU_ID, MENU_LABEL, true, true).then(
      function() {
        console.log("Menu created", MENU_ID);
      },
      function() {
        console.error("Menu creation failed", MENU_ID);
      }
    );

    _generator.onPhotoshopEvent(
      "generatorMenuChanged",
      handleGeneratorMenuClicked
    );

    // TO DEBUG: chrome://inspect/#devices

    function initLater() {}

    process.nextTick(initLater);
  }

  /*********** EVENTS ***********/

  function handleGeneratorMenuClicked(event) {
    // Just FYI
    var startingMenuState = _generator.getMenuState(MENU_ID);
    console.log(
      "Menu event %s, starting state %s",
      stringify(event),
      stringify(startingMenuState)
    );
    // could be made nicer, but...
    // If checked, uncheck
    if (startingMenuState.checked) {
      // !name:String, !enabled:Bool, !checked:Bool, ?displayName:String
      _generator.toggleMenu(MENU_ID, true, false).then(
        // Success
        function() {
          console.log("Disabling the menu item");
        },
        // Error
        function() {
          console.error("Can't toggle menu");
        }
      );
    } else {
      _generator.toggleMenu(MENU_ID, true, true).then(
        // Success
        function() {
          console.log("Enabling the menu item");
        },
        // Error
        function() {
          console.error("Can't toggle menu");
        }
      );
    }
  }

  /*********** HELPERS ***********/

  function getThumbnail() {
    return _generator
      .getDocumentInfo(undefined, {
        compInfo: false,
        imageInfo: true,
        layerInfo: false,
        expandSmartObjects: false,
        getTextStyles: false,
        getFullTextStyles: false,
        selectedLayers: false,
        getCompLayerSettings: false,
        getDefaultLayerFX: false,
        getPathData: false,
      })
      .then((docInfo) => {
        const MAX_DIMENSION = 500;
        var w,
          h,
          ratio,
          thumbWidth,
          thumbHeight,
          pixmapSettings = {};

        w = docInfo.bounds.right - docInfo.bounds.left;
        h = docInfo.bounds.bottom - docInfo.bounds.top;

        ratio = w / h;

        pixmapSettings.inputRect = {
          top: 0,
          left: 0,
          bottom: docInfo.bounds.bottom,
          right: docInfo.bounds.right,
        };

        if (ratio >= 1) {
          // landscape
          thumbWidth = MAX_DIMENSION;
          thumbHeight = Math.floor(thumbWidth / ratio);
        } else {
          // portrait
          thumbHeight = MAX_DIMENSION;
          thumbWidth = Math.floor(thumbHeight * ratio);
        }

        pixmapSettings.outputRect = {
          top: 0,
          left: 0,
          right: thumbWidth,
          bottom: thumbHeight,
        };

        return _generator
          .getDocumentPixmap(docInfo.id, pixmapSettings)
          .then((pixmap) => {
            console.log("Swapping pixels...");
            var rgba = Uint8ClampedArray.from(pixmap.pixels);
            for (let i = 0; i < rgba.length; i += pixmap.channelCount) {
              [rgba[i], rgba[i + 1], rgba[i + 2], rgba[i + 3]] = [
                rgba[i + 1],
                rgba[i + 2],
                rgba[i + 3],
                rgba[i],
              ];
            }
            return {
              pixmap: rgba,
              width: thumbWidth,
              height: thumbHeight,
            };
          });
      });
  }

  function stringify(object) {
    try {
      return JSON.stringify(object, null, "    ");
    } catch (e) {
      console.error(e);
    }
    return String(object);
  }

  exports.init = init;
})();
