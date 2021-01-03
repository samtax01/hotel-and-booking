"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * Generate command option defenitions
 * @type {Object[]}
 */
const optionDefinitions = [{
  name: 'name',
  alias: 'n',
  type: String,
  defaultOption: true,
  typeLabel: 'name',
  description: 'Seeder name to generate'
}, {
  name: 'help',
  alias: 'h',
  type: Boolean,
  defaultValue: false,
  description: 'Show usage guide'
}];
var _default = optionDefinitions;
exports.default = _default;
module.exports = exports.default;