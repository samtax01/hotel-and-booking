"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOptions = void 0;

var _commandLineArgs = _interopRequireDefault(require("command-line-args"));

var _optionDefinitions = _interopRequireDefault(require("./option-definitions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Get run options from argv or prompts
 * @param    {string[]} argv              cli argv
 * @return   {Object}                     run options
 * @property {string[]} selectedSeeders
 * @property {boolean}  dropDatabase
 * @property {boolean}  helpWanted
 */
const getOptions = argv => {
  const {
    seeders: selectedSeeders,
    dropdb: dropDatabase,
    help: helpWanted
  } = (0, _commandLineArgs.default)(_optionDefinitions.default, {
    argv
  });
  return {
    selectedSeeders,
    dropDatabase,
    helpWanted
  };
};

exports.getOptions = getOptions;