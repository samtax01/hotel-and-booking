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
  header: 'Initialize mongoose-data-seed',
  content: `Install mongoose-data-seed into your project.
      Generate md-seed-config.js, md-seed-generator.js and create seeders folder`
}, {
  header: 'Synopsis',
  content: ['$ md-seed init [{bold --seedersFolder}={underline folder-name}] [{bold --seederTemplate}={underline file-path}]', '$ md-seed init {bold --help}']
}, {
  header: 'Options',
  optionList: _optionDefinitions.default
}]);
var _default = usageGuide;
exports.default = _default;
module.exports = exports.default;