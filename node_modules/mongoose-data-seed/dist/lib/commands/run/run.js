"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _config = _interopRequireDefault(require("../../config"));

var _core = require("../../core");

var _helpers = require("../../utils/helpers");

var _runLogger = _interopRequireDefault(require("./run-logger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Run seeders
 * @param  {Object}   [options={}]          Options
 * @param  {string[]} [options.selectedSeeders=[]]  Selected seeders to run.
 *                                                  When empty, run all seeders.
 * @param  {boolean}   [options.dropDatabase=false] Drop database before running?
 * @return {Promise}
 */
const run = async ({
  selectedSeeders = [],
  dropDatabase = false
} = {}) => {
  (0, _helpers.validateUserConfig)(); // get relevant user-config

  const {
    connect,
    dropdb,
    seedersList
  } = _config.default.loadUserConfig(); // create logger


  const logger = new _runLogger.default(); // create runner

  const runner = new _core.MdSeedRunner({
    connect,
    dropdb,
    seedersList
  }); // run seeders

  const observable = runner.run({
    selectedSeeders,
    dropDatabase
  }); // subscribe logger

  observable.subscribe(logger.asObserver()); // wait for runner

  await observable.toPromise();
};

var _default = run;
exports.default = _default;
module.exports = exports.default;