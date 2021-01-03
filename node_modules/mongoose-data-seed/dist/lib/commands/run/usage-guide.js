"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _commandLineUsage = _interopRequireDefault(require("command-line-usage"));

var _optionDefinitions = _interopRequireDefault(require("./option-definitions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Run command user guide
 * @type {string}
 */
const usageGuide = (0, _commandLineUsage.default)([{
  header: 'Seed runner',
  content: 'Seed data into the database'
}, {
  header: 'Synopsis',
  content: ['$ md-seed run [{bold --dropdb}] [{bold --seeders} {underline seeder} ...]', '$ md-seed run {bold --help}']
}, {
  header: 'Options',
  optionList: _optionDefinitions.default
}, {
  header: 'Examples',
  content: `{bold 1. Run all seeders:}
      $ md-seed run

      {bold 2. Run selected seeders:}
      $ md-seed run {bold --seeders} {underline User} {underline Settings}
      {italic  or}
      $ md-seed run {bold -s} {underline User} {underline Settings}
      {italic  or}
      $ md-seed run {underline User} {underline Settings}

      {bold 3. Drop database and run all seeders:}
      $ md-seed run {bold --dropdb}
      {italic  or}
      $ md-seed run {bold -d}

      {bold 4. Drop database and run selected seeders:}
      $ md-seed run {underline User} {underline Settings} {bold --dropdb}
      {italic   or}
      $ md-seed run {underline User} {underline Settings} {bold -d}
      `
}]);
var _default = usageGuide;
exports.default = _default;
module.exports = exports.default;