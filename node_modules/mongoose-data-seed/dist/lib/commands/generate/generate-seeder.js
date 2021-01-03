"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _chalk = _interopRequireDefault(require("chalk"));

var _core = require("../../core");

var _helpers = require("../../utils/helpers");

var _config = _interopRequireDefault(require("../../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Generate a new seeder.
 * @param  {string}  name seeder name
 * @return {Promise}
 */
const generateSeeder = async name => {
  (0, _helpers.validateUserConfig)();
  const {
    seederTemplate,
    userSeedersFolderPath
  } = _config.default;
  const generator = new _core.SeederGenerator({
    name,
    seederTemplate,
    userSeedersFolderPath
  });
  const generatedSeederFile = await generator.generate();
  console.log(`${_chalk.default.green('CREATED')} ${generatedSeederFile}`);
};

var _default = generateSeeder;
exports.default = _default;
module.exports = exports.default;