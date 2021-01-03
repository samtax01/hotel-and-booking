"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.promptSeederTemplate = exports.promptSeedersFolder = void 0;

var _inquirer = _interopRequireDefault(require("inquirer"));

var _lodash = require("lodash");

var _helpers = require("../../utils/helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @private
 */
const promptSeedersFolder = async () => {
  const {
    seedersFolderName
  } = await _inquirer.default.prompt([{
    name: 'seedersFolderName',
    type: 'input',
    message: 'Choose your seeders folder name',
    default: './seeders',
    filter: input => (0, _lodash.trim)(input),
    validate: input => (0, _helpers.validateSeedersFolderName)(input)
  }]);
  return seedersFolderName;
};
/**
 * @private
 */


exports.promptSeedersFolder = promptSeedersFolder;

const promptSeederTemplate = async () => {
  const {
    useCustomSeeder
  } = await _inquirer.default.prompt([{
    name: 'useCustomSeeder',
    type: 'confirm',
    message: 'Would you like to use your own custom template for your seeders?',
    default: false
  }]);

  if (!useCustomSeeder) {
    return;
  }

  const {
    seederTemplatePath
  } = await _inquirer.default.prompt([{
    name: 'seederTemplatePath',
    type: 'input',
    message: 'Choose a path for your seeder template',
    default: './md-seed-template.ejs',
    filter: input => (0, _lodash.trim)(input),
    validate: input => (0, _helpers.validateSeederTemplatePath)(input)
  }]);
  return seederTemplatePath;
};

exports.promptSeederTemplate = promptSeederTemplate;