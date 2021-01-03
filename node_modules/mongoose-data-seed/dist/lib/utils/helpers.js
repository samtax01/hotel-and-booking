"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.exit = exports.validateUserConfig = exports.validateSeederTemplatePath = exports.validateSeedersFolderName = exports.getObjectWithSelectedKeys = exports.getFolderNameFromPath = exports.normalizeSeederFileName = exports.normalizeSeederName = void 0;

var _lodash = require("lodash");

var _config = _interopRequireDefault(require("../config"));

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Normalize seeder name.
 * @param  {string} name seeder name
 * @return {string}      normalized seeder name
 */
const normalizeSeederName = name => (0, _lodash.upperFirst)((0, _lodash.camelCase)(name));
/**
 * Normalize seeder filename.
 * @param  {string} name seeder name
 * @return {string}      normalized seeder filename
 */


exports.normalizeSeederName = normalizeSeederName;

const normalizeSeederFileName = name => `${(0, _lodash.kebabCase)(name)}.seeder.js`;
/**
 * Get folder name from given path.
 * @param  {string} path path
 * @return {string}      folder name
 */


exports.normalizeSeederFileName = normalizeSeederFileName;

const getFolderNameFromPath = path => path.substring(path.lastIndexOf('/') + 1);
/**
 * Get object with selected keys from a given object.
 * @param  {Object}   obj  Object
 * @param  {string[]} keys Keys to get from the given object.
 * @return {Object} new object with the selected keys.
 */


exports.getFolderNameFromPath = getFolderNameFromPath;

const getObjectWithSelectedKeys = (obj, keys) => {
  const newObj = {};
  Object.keys(obj).forEach(k => {
    if (keys.includes(k)) {
      newObj[k] = obj[k];
    }
  });
  return newObj;
};
/**
 * Validate seeders folder name.
 * @param  {string} name folder name
 * @return {boolean}
 */


exports.getObjectWithSelectedKeys = getObjectWithSelectedKeys;

const validateSeedersFolderName = name => typeof name === 'string' && (0, _lodash.trim)(name).length >= 3;
/**
 * Validate seeder template path.
 * @param  {string} name path
 * @return {boolean}
 */


exports.validateSeedersFolderName = validateSeedersFolderName;

const validateSeederTemplatePath = name => typeof name === 'string' && (0, _lodash.trim)(name).length >= 6;
/**
 * Validate user config.
 * @throws {Error} throw error when user config is not valid.
 */


exports.validateSeederTemplatePath = validateSeederTemplatePath;

const validateUserConfig = () => {
  const {
    userConfigExists
  } = _config.default;

  if (!userConfigExists) {
    throw new Error('Must contain md-seed-config.js at the project root. run `md-seed init` to create the config file.');
  }
};
/**
 * Exit mongoose-data-seed.
 * @param  {Error} [error] Exit with error when supplied.
 */


exports.validateUserConfig = validateUserConfig;

const exit = error => {
  if (error && error.message && error.message !== 'exit') {
    console.error(error);
    process.exit(_constants.ExitCodes.Error);
  } else {
    process.exit(_constants.ExitCodes.Success);
  }
};

exports.exit = exit;