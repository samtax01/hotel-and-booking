"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _core = require("../../core");

var _options = require("./options");

var _installerLogger = _interopRequireDefault(require("./installer-logger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Run the installer
 * @param  {Object}  [options={}] installer options
 * @param  {string}  options.seedersFolder
 * @param  {string}  options.seedersTemplate
 * @return {Promise}
 */
var _default = async (options = {}) => {
  // get relevat config and options
  const {
    seedersFolder,
    customSeederTemplate
  } = await (0, _options.promptMissingOptions)(options); // create logger

  const logger = new _installerLogger.default(); // create installer

  const installer = new _core.Installer({
    seedersFolder,
    customSeederTemplate
  }); // run seeders

  const observable = installer.install(); // subscribe logger

  observable.subscribe(logger.asObserver()); // wait for installer to finish

  await observable.toPromise();
};

exports.default = _default;
module.exports = exports.default;