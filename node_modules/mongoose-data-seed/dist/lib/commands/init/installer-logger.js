"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _chalk = _interopRequireDefault(require("chalk"));

var _baseLogger = _interopRequireDefault(require("../../utils/base-logger"));

var _core = require("../../core");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Installer Logger
 */
class InstallerLogger extends _baseLogger.default {
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
    switch (type) {
      case _core.Installer.operations.WRITE_USER_GENERETOR_CONFIG_SUCCESS:
        console.log(`${_chalk.default.green('UPDATED')} package.json`);
        break;

      case _core.Installer.operations.CREATE_CUSTOM_SEEDER_TEMPLATE_FILE_SKIP_FILE_EXISTS:
        console.log(`${_chalk.default.yellow('SKIP')} ${payload.customSeederTemplateFilename} are already exists`);
        break;

      case _core.Installer.operations.CREATE_CUSTOM_SEEDER_TEMPLATE_FILE_SUCCESS:
        console.log(`${_chalk.default.green('CREATED')} ${payload.customSeederTemplateFilename}`);
        break;

      case _core.Installer.operations.CREATE_SEEDERS_FOLDER_SKIP_FOLDER_EXISTS:
        console.log(`${_chalk.default.yellow('SKIP')} ${payload.foldername} are already exists`);
        break;

      case _core.Installer.operations.CREATE_SEEDERS_FOLDER_SUCCESS:
        console.log(`${_chalk.default.green('CREATED')} ${payload.foldername}`);
        break;

      case _core.Installer.operations.WRITE_USER_CONFIG_SKIP_FILE_EXISTS:
        console.log(`${_chalk.default.yellow('SKIP')} ${payload.filename} are already exists`);
        break;

      case _core.Installer.operations.WRITE_USER_CONFIG_SUCCESS:
        console.log(`${_chalk.default.green('CREATED')} ${payload.filename}`);
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
    switch (type) {
      case _core.Installer.operations.WRITE_USER_GENERETOR_CONFIG_ERROR:
        console.log(`${_chalk.default.red('ERROR')} Unable to write config file: ${_chalk.default.gray(payload.filepath)}`);
        break;

      case _core.Installer.operations.CREATE_CUSTOM_SEEDER_TEMPLATE_FILE_ERROR:
        console.log(`${_chalk.default.red('ERROR')} Unable to create custom seeder template: ${_chalk.default.gray(payload.customSeederTemplatePath)}`);
        break;

      case _core.Installer.operations.CREATE_SEEDERS_FOLDER_ERROR:
        console.log(`${_chalk.default.red('ERROR')} Unable to create seeders folder: ${_chalk.default.gray(payload.folderpath)}`);
        break;

      case _core.Installer.operations.WRITE_USER_CONFIG_ERROR:
        console.log(`${_chalk.default.red('ERROR')} Unable to write user config file: ${_chalk.default.gray(payload.filepath)}`);
        break;
    }

    if (payload && payload.error) console.error(payload.error);
  }

}

exports.default = InstallerLogger;
module.exports = exports.default;