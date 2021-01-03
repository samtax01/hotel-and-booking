"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateOptions = exports.getOptions = void 0;

var _commandLineArgs = _interopRequireDefault(require("command-line-args"));

var _chalk = _interopRequireDefault(require("chalk"));

var _lodash = require("lodash");

var _help = _interopRequireDefault(require("./help"));

var _optionDefinitions = _interopRequireDefault(require("./option-definitions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Get generate options from argv
 * @param    {string[]} argv              cli argv
 * @return   {Object}                     run options
 * @property {string}   seederName
 * @property {boolean}  helpWanted
 */
const getOptions = argv => {
  const {
    name: seederName,
    help: helpWanted
  } = (0, _commandLineArgs.default)(_optionDefinitions.default, {
    argv
  });
  const options = {
    seederName,
    helpWanted
  };
  validateOptions(options);
  return options;
};
/**
 * Validate generate command options
 * @param  {Object}  [options={}]       Options
 * @param  {string}  options.seederName seeder name to generate
 * @param  {boolean} options.helpWanted help wanted?
 * @throws {Error} throw error when options are not valid.
 */


exports.getOptions = getOptions;

const validateOptions = ({
  seederName,
  helpWanted
} = {}) => {
  if (!helpWanted && (typeof seederName !== 'string' || (0, _lodash.trim)(seederName).length < 3)) {
    console.log(`${_chalk.default.red('ERROR')} Please choose a seeder name`);
    console.log();
    (0, _help.default)();
    throw new Error('exit');
  }
};

exports.validateOptions = validateOptions;