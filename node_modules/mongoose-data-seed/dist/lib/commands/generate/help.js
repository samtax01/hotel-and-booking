"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _usageGuide = _interopRequireDefault(require("./usage-guide"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Prints the generate command user-guide
 */
const help = () => console.log(_usageGuide.default);

var _default = help;
exports.default = _default;
module.exports = exports.default;