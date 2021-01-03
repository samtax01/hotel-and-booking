"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _chalk = _interopRequireDefault(require("chalk"));

var _logSymbols = _interopRequireDefault(require("log-symbols"));

var _clui = require("clui");

var _baseLogger = _interopRequireDefault(require("../../utils/base-logger"));

var _core = require("../../core");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Run Logger
 */
class RunLogger extends _baseLogger.default {
  constructor() {
    super();
    this.spinner = new _clui.Spinner();
  }
  /**
   * Log next notification
   * @param  {Object} notification notification to log
   * @param  {string} notification.type    operation type
   * @param  {Object} notification.payload operation payload
   */


  next({
    type,
    payload
  }) {
    this.spinner.stop();

    switch (type) {
      case _core.MdSeedRunner.operations.MONGOOSE_CONNECT_START:
        this.spinner.message('Trying to connect to MongoDB...');
        this.spinner.start();
        break;

      case _core.MdSeedRunner.operations.MONGOOSE_CONNECT_SUCCESS:
        console.log(`${_logSymbols.default.success} Successfully connected to MongoDB!`);
        break;

      case _core.MdSeedRunner.operations.MONGOOSE_DROP_START:
        this.spinner.message('Droping database...');
        this.spinner.start();
        break;

      case _core.MdSeedRunner.operations.MONGOOSE_DROP_SUCCESS:
        console.log(`${_logSymbols.default.success} Database dropped!`);
        break;

      case _core.MdSeedRunner.operations.ALL_SEEDERS_START:
        console.log();
        console.log(`${_chalk.default.cyan('Seeding Results:')}`);
        break;

      case _core.MdSeedRunner.operations.ALL_SEEDERS_FINISH:
        console.log();
        console.log(`${_logSymbols.default.success} Done.`);
        break;

      case _core.MdSeedRunner.operations.SEEDER_START:
        this.spinner.message(payload.name);
        this.spinner.start();
        break;

      case _core.MdSeedRunner.operations.SEEDER_SUCCESS:
        if (payload.results && payload.results.run) {
          console.log(`${_logSymbols.default.success} ${payload.name}: ${_chalk.default.gray(payload.results.created)}`);
        } else {
          console.log(`${_chalk.default.gray('-')} ${payload.name}: ${_chalk.default.gray(0)}`);
        }

        break;
    }
  }
  /**
   * Log error
   * @param  {Object} error         error to log
   * @param  {string} error.type    error type
   * @param  {Object} error.payload error payload
   */


  error({
    type,
    payload
  }) {
    this.spinner.stop();

    switch (type) {
      case _core.MdSeedRunner.operations.MONGOOSE_CONNECT_ERROR:
        console.log(`${_logSymbols.default.error} Unable to connected to MongoDB!`);
        break;

      case _core.MdSeedRunner.operations.MONGOOSE_DROP_ERROR:
        console.log(`${_logSymbols.default.error} Unable to drop database!`);
        break;

      case _core.MdSeedRunner.operations.SEEDER_ERROR:
        console.log(`${_logSymbols.default.error} ${payload.name}`);
        break;
    }

    if (payload && payload.error) console.error(payload.error);
  }

}

exports.default = RunLogger;
module.exports = exports.default;