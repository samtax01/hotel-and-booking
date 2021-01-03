"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.promptMissingOptions = exports.getOptions = void 0;

var _commandLineArgs = _interopRequireDefault(require("command-line-args"));

var _helpers = require("../../utils/helpers");

var _prompts = require("./prompts");

var _optionDefinitions = _interopRequireDefault(require("./option-definitions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Get init options from argv
 * @param    {string[]} argv              cli argv
 * @return   {Object}                     init options
 * @property {string}   seedersFolder
 * @property {string}   customSeederTemplate
 * @property {boolean}  helpWanted
 */
const getOptions = argv => {
  const {
    seedersFolder,
    seederTemplate: customSeederTemplate,
    help: helpWanted
  } = (0, _commandLineArgs.default)(_optionDefinitions.default, {
    argv
  });
  return {
    seedersFolder,
    customSeederTemplate,
    helpWanted
  };
};
/**
 * Prompt missing options for init command
 * @param  {Object}  [options={}]                 Init command options
 * @param  {[type]}  options.seedersFolder        seeders folder
 * @param  {[type]}  options.customSeederTemplate custom seeder template
 * @return {Promise} Options without missing
 */


exports.getOptions = getOptions;

const promptMissingOptions = async ({
  seedersFolder,
  customSeederTemplate
} = {}) => {
  const getSeedersFolder = async () => (0, _helpers.validateSeedersFolderName)(seedersFolder) ? seedersFolder : (0, _prompts.promptSeedersFolder)();

  const getCustomSeederTemplate = async () => (0, _helpers.validateSeederTemplatePath)(customSeederTemplate) ? customSeederTemplate : (0, _prompts.promptSeederTemplate)();

  return {
    seedersFolder: await getSeedersFolder(),
    customSeederTemplate: await getCustomSeederTemplate()
  };
};

exports.promptMissingOptions = promptMissingOptions;