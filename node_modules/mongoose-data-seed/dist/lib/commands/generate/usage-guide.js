"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _commandLineUsage = _interopRequireDefault(require("command-line-usage"));

var _optionDefinitions = _interopRequireDefault(require("./option-definitions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @private
 */
const usageGuide = (0, _commandLineUsage.default)([{
  header: 'Generate Seeder',
  content: 'Generate new seeder file into the seeder folder.'
}, {
  header: 'Synopsis',
  content: ['$ md-seed generate {underline seeder-name}', '$ md-seed g {underline seeder-name}', '$ md-seed g {bold --help}']
}, {
  header: 'Options',
  optionList: _optionDefinitions.default
}]);
var _default = usageGuide;
exports.default = _default;
module.exports = exports.default;