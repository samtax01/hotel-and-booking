"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _commandLineUsage = _interopRequireDefault(require("command-line-usage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Help command user guide
 * @type {string}
 */
const usageGuide = (0, _commandLineUsage.default)([{
  header: 'Mongoose Data Seeder',
  content: 'Seed data into the database'
}, {
  header: 'Synopsis',
  content: ['$ md-seed <command> <options>']
}, {
  header: 'Command List',
  content: [{
    command: 'init',
    description: 'Install mongoose-data-seed into your project.'
  }, {
    command: 'g, generate',
    description: 'Generate new seeder file into the seeder folder.'
  }, {
    command: 'run',
    description: 'Run seeders.'
  }, {
    command: 'h, help',
    description: 'Show help'
  }]
}]);
var _default = usageGuide;
exports.default = _default;
module.exports = exports.default;