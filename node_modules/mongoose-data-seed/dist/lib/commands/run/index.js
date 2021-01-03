"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _options = require("./options");

var _help = _interopRequireDefault(require("./help"));

var _run = _interopRequireDefault(require("./run"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/**
 * mongoose-data-seed run command
 * @param  {stringp[]}  argv cli arguments
 * @return {Promise}
 */
var _default = async argv => {
  const _getOptions = (0, _options.getOptions)(argv),
        {
    helpWanted
  } = _getOptions,
        options = _objectWithoutProperties(_getOptions, ["helpWanted"]);

  if (helpWanted) return (0, _help.default)();
  return (0, _run.default)(options);
};

exports.default = _default;
module.exports = exports.default;