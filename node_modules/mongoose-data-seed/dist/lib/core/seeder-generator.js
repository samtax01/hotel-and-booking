"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _memFs = _interopRequireDefault(require("mem-fs"));

var _memFsEditor = _interopRequireDefault(require("mem-fs-editor"));

var _chalk = _interopRequireDefault(require("chalk"));

var _helpers = require("../utils/helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Seeder Generator
 *
 * Generate a new seeder
 */
class SeederGenerator {
  constructor({
    name,
    seederTemplate,
    userSeedersFolderPath
  }) {
    this._initOptions({
      seederTemplate,
      userSeedersFolderPath
    });

    this._initMemFs();

    this._initName(name);
  }
  /**
   * generate the new seeder
   */


  async generate() {
    this._validateSeederFileNotExists();

    this._copySeederTemplate();

    await this._commitMemFsChanges();
    return this.seederFileRelativePath;
  }
  /**
   * Private
   */


  _initOptions({
    seederTemplate,
    userSeedersFolderPath
  }) {
    const userSeedersFolderName = (0, _helpers.getFolderNameFromPath)(userSeedersFolderPath);
    this.options = {
      seederTemplate,
      userSeedersFolderName,
      userSeedersFolderPath
    };
  }

  _initMemFs() {
    const store = _memFs.default.create();

    this.fs = _memFsEditor.default.create(store);
  }

  _initName(name) {
    const {
      userSeedersFolderPath,
      userSeedersFolderName
    } = this.options; // set name

    this.name = name; // set seeder-name

    this.seederName = (0, _helpers.normalizeSeederName)(name); // set seeder-file-name

    this.seederFileName = (0, _helpers.normalizeSeederFileName)(name); // set seeder-file-path

    this.seederFilePath = _path.default.join(userSeedersFolderPath, this.seederFileName); // set seeder-file-relative-path

    this.seederFileRelativePath = _path.default.join(userSeedersFolderName, this.seederFileName);
  }

  _validateSeederFileNotExists() {
    if (this.fs.exists(this.seederFilePath)) {
      throw new Error(`${_chalk.default.red('ERROR')}
         ${this.seederFileRelativePath} are already exists`);
    }
  }

  async _commitMemFsChanges() {
    return new Promise(resolve => {
      this.fs.commit(() => {
        resolve();
      });
    });
  }

  _copySeederTemplate() {
    const {
      seederName,
      seederFilePath
    } = this;
    const {
      seederTemplate
    } = this.options;
    const templateArgs = {
      seederName
    };
    this.fs.copyTpl(seederTemplate, seederFilePath, templateArgs);
  }

}

exports.default = SeederGenerator;
module.exports = exports.default;