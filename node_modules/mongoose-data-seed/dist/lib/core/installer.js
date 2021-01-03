"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _memFs = _interopRequireDefault(require("mem-fs"));

var _memFsEditor = _interopRequireDefault(require("mem-fs-editor"));

var _rxjs = require("rxjs");

var _constants = require("../constants");

var _config = _interopRequireDefault(require("../config"));

var _installerError = _interopRequireDefault(require("./installer-error"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * mongoose-data-seed installer
 *
 * @example
 * // create installer
 * const installer = new Installer({ seedersFolder: './seeders' });
 *
 * // run seeders
 * const observable = installer.install();
 *
 * // subscribe logger
 * observable.subscribe({
 *   next({ type, payload }) {
 *     switch (type) {
 *       case Installer.operations.START:
 *         console.log('Installer started!');
 *         break;
 *       case Installer.operations.SUCCESS:
 *         console.log('Installer finished successfully!');
 *         break;
 *     }
 *   },
 *   error({ type, payload }) {
 *     console.error(`Error: ${type}`);
 *     console.error(payload.error);
 *   }
 * });
 */
class Installer {
  /**
   * @typedef {Object} InstallerConfig
   * @property {string}  seedersFolder        Relative path to your seeders-folder.
   * @property {?string} customSeederTemplate Relative path to your seeder-template
   *                                          if you would like to use your own seeders-template
   */

  /**
   * Installer operations constants
   * @type {Object}
   * @property {string} START        Installation starts.
   * @property {string} SUCCESS      Installation succeed.
   * @property {string} ERROR        Installation finished with an error.
   */

  /**
   * Creates mongoose-data-seed installer
   * @param {InstallerConfig} [config] Generator config
   */
  constructor({
    seedersFolder,
    customSeederTemplate
  } = _constants.defaultUserGeneratorConfig) {
    this._subject = new _rxjs.Subject();

    this._initConfig({
      seedersFolder,
      customSeederTemplate
    });

    this._initMemFs();
  }
  /**
   * Run installer - install `mongoose-data-seeder`
   * @return {Observable}
   * @see https://rxjs-dev.firebaseapp.com/api/index/class/Observable
   */


  install() {
    this._install();

    return this._subject.asObservable();
  }
  /**
   * get the config that should be written into the `package.json`
   * @return {InstallerConfig} generator config
   */


  getGeneratorConfig() {
    const {
      userSeedersFolderName: seedersFolder,
      customSeederTemplateFilename: customSeederTemplate
    } = this.config;
    const generatorConfig = {
      seedersFolder
    };

    if (customSeederTemplate) {
      generatorConfig.customSeederTemplate = customSeederTemplate;
    }

    return generatorConfig;
  }
  /*
    Private methods
   */

  /**
   * Initiate this.config
   * @param {InstallerConfig} config generator config
   */


  _initConfig({
    seedersFolder,
    customSeederTemplate
  }) {
    /**
     * Full configuration object
     * @type {Object}
     * @property {string}  userPackageJsonPath path to the user package.json file.
     * @property {?string} customSeederTemplateFilename custom seeder template filename.
     * @property {?string} customSeederTemplatePath custom seeder template path.
     * @property {string}  userSeedersFolderName seeders folder name.
     * @property {string}  userSeedersFolderPath seeders folder path.
     * @property {boolean} userConfigExists user has a config file?.
     * @property {?string} userConfigFilename config file name.
     * @property {?string} userConfigFilepath config file path.
     * @property {string}  configTemplatePath config template path.
     */
    this.config = {
      userPackageJsonPath: _path.default.join(_config.default.projectRoot, './package.json'),
      customSeederTemplateFilename: customSeederTemplate && customSeederTemplate,
      customSeederTemplatePath: customSeederTemplate && _path.default.join(_config.default.projectRoot, customSeederTemplate),
      userSeedersFolderName: seedersFolder,
      userSeedersFolderPath: _path.default.join(_config.default.projectRoot, seedersFolder),
      userConfigExists: _config.default.userConfigExists,
      userConfigFilename: _config.default.userConfigFilename,
      userConfigFilepath: _config.default.userConfigFilepath,
      configTemplatePath: _config.default.configTemplate
    };
  }
  /**
   * Initiate the in-memory file-system
   */


  _initMemFs() {
    const store = _memFs.default.create();

    this._memFsEditor = _memFsEditor.default.create(store);
  }
  /**
   * Run the installation process
   * @return {Promise}
   */


  async _install() {
    const {
      START,
      SUCCESS,
      ERROR
    } = Installer.operations;

    try {
      this._subject.next({
        type: START
      });

      await this._createCustomSeederTemplate();
      await this._writeUserGeneratorConfigToPackageJson();
      await this._createSeedersFolder();
      await this._writeUserConfig();

      this._subject.next({
        type: SUCCESS
      });

      this._subject.complete();
    } catch (error) {
      const {
        type = ERROR,
        payload = {
          error
        }
      } = error;

      this._subject.error({
        type,
        payload
      });
    }
  }
  /**
   * Commit the in-memory file changes
   * @return {Promise}
   */


  async _commitMemFsChanges() {
    return new Promise(resolve => {
      this._memFsEditor.commit(() => {
        resolve();
      });
    });
  }
  /**
   * Copy the package seeder-template to the user desired
   * custom-seeder-template path if the user wants to use his own seeder-template
   * @return {Promise} [description]
   */


  async _createCustomSeederTemplate() {
    const {
      CREATE_CUSTOM_SEEDER_TEMPLATE_FILE_START,
      CREATE_CUSTOM_SEEDER_TEMPLATE_FILE_SUCCESS,
      CREATE_CUSTOM_SEEDER_TEMPLATE_FILE_ERROR,
      CREATE_CUSTOM_SEEDER_TEMPLATE_FILE_SKIP_FILE_EXISTS,
      CREATE_CUSTOM_SEEDER_TEMPLATE_FILE_SKIP_NO_CUSTOM
    } = Installer.operations;
    const {
      customSeederTemplateFilename,
      customSeederTemplatePath
    } = this.config;
    const payload = {
      customSeederTemplateFilename,
      customSeederTemplatePath
    };

    const notify = type => this._subject.next({
      type,
      payload
    });

    try {
      notify(CREATE_CUSTOM_SEEDER_TEMPLATE_FILE_START);

      if (!customSeederTemplatePath) {
        return notify(CREATE_CUSTOM_SEEDER_TEMPLATE_FILE_SKIP_NO_CUSTOM);
      }

      if (_fs.default.existsSync(customSeederTemplatePath)) {
        notify(CREATE_CUSTOM_SEEDER_TEMPLATE_FILE_SKIP_FILE_EXISTS);
      } else {
        // copy template
        this._memFsEditor.copy(_constants.systemSeederTemplate, customSeederTemplatePath); // commit changes


        await this._commitMemFsChanges();
        notify(CREATE_CUSTOM_SEEDER_TEMPLATE_FILE_SUCCESS);
      }
    } catch (error) {
      throw new _installerError.default({
        type: CREATE_CUSTOM_SEEDER_TEMPLATE_FILE_ERROR,
        payload,
        error
      });
    }
  }
  /**
   * Write the config into the user package.json
   */


  async _writeUserGeneratorConfigToPackageJson() {
    const {
      WRITE_USER_GENERETOR_CONFIG_START,
      WRITE_USER_GENERETOR_CONFIG_SUCCESS,
      WRITE_USER_GENERETOR_CONFIG_ERROR
    } = Installer.operations;
    const {
      userPackageJsonPath: packageJsonPath
    } = this.config;
    const payload = {
      packageJsonPath
    };

    try {
      this._subject.next({
        type: WRITE_USER_GENERETOR_CONFIG_START,
        payload
      });

      const packageJson = require(packageJsonPath);

      packageJson.mdSeed = this.getGeneratorConfig();

      this._memFsEditor.writeJSON(packageJsonPath, packageJson);

      await this._commitMemFsChanges();

      this._subject.next({
        type: WRITE_USER_GENERETOR_CONFIG_SUCCESS,
        payload
      });
    } catch (error) {
      throw new _installerError.default({
        type: WRITE_USER_GENERETOR_CONFIG_ERROR,
        payload,
        error
      });
    }
  }
  /**
   * Create the seeders folder
   */


  async _createSeedersFolder() {
    const {
      CREATE_SEEDERS_FOLDER_START,
      CREATE_SEEDERS_FOLDER_SUCCESS,
      CREATE_SEEDERS_FOLDER_ERROR,
      CREATE_SEEDERS_FOLDER_SKIP_FOLDER_EXISTS
    } = Installer.operations;
    const {
      userSeedersFolderPath: folderpath,
      userSeedersFolderName: foldername
    } = this.config;
    const payload = {
      folderpath,
      foldername
    };

    try {
      this._subject.next({
        type: CREATE_SEEDERS_FOLDER_START,
        payload
      });

      if (_fs.default.existsSync(folderpath)) {
        this._subject.next({
          type: CREATE_SEEDERS_FOLDER_SKIP_FOLDER_EXISTS,
          payload
        });
      } else {
        _fs.default.mkdirSync(folderpath);

        this._subject.next({
          type: CREATE_SEEDERS_FOLDER_SUCCESS,
          payload
        });
      }
    } catch (error) {
      throw new _installerError.default({
        type: CREATE_SEEDERS_FOLDER_ERROR,
        payload,
        error
      });
    }
  }
  /**
   * Write the `md-seed-config.js` into the root folder
   */


  async _writeUserConfig() {
    const {
      WRITE_USER_CONFIG_START,
      WRITE_USER_CONFIG_SUCCESS,
      WRITE_USER_CONFIG_ERROR,
      WRITE_USER_CONFIG_SKIP_FILE_EXISTS
    } = Installer.operations;
    const {
      userConfigExists: fileExists,
      userConfigFilename: filename,
      userConfigFilepath: filepath,
      configTemplatePath
    } = this.config;
    const payload = {
      fileExists,
      filename,
      filepath
    };

    try {
      this._subject.next({
        type: WRITE_USER_CONFIG_START,
        payload
      });

      if (fileExists === true) {
        this._subject.next({
          type: WRITE_USER_CONFIG_SKIP_FILE_EXISTS,
          payload
        });
      } else {
        // copy template
        this._memFsEditor.copy(configTemplatePath, filepath); // commit changes


        await this._commitMemFsChanges();

        this._subject.next({
          type: WRITE_USER_CONFIG_SUCCESS,
          payload
        });
      }
    } catch (error) {
      throw new _installerError.default({
        type: WRITE_USER_CONFIG_ERROR,
        payload,
        error
      });
    }
  }

}

exports.default = Installer;

_defineProperty(Installer, "operations", {
  START: 'START',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
  WRITE_USER_GENERETOR_CONFIG_START: 'WRITE_USER_GENERETOR_CONFIG_START',
  WRITE_USER_GENERETOR_CONFIG_SUCCESS: 'WRITE_USER_GENERETOR_CONFIG_SUCCESS',
  WRITE_USER_GENERETOR_CONFIG_ERROR: 'WRITE_USER_GENERETOR_CONFIG_ERROR',
  CREATE_CUSTOM_SEEDER_TEMPLATE_FILE_START: 'CREATE_CUSTOM_SEEDER_TEMPLATE_FILE_START',
  CREATE_CUSTOM_SEEDER_TEMPLATE_FILE_SUCCESS: 'CREATE_CUSTOM_SEEDER_TEMPLATE_FILE_SUCCESS',
  CREATE_CUSTOM_SEEDER_TEMPLATE_FILE_ERROR: 'CREATE_CUSTOM_SEEDER_TEMPLATE_FILE_ERROR',
  CREATE_CUSTOM_SEEDER_TEMPLATE_FILE_SKIP_FILE_EXISTS: 'CREATE_CUSTOM_SEEDER_TEMPLATE_FILE_SKIP_FILE_EXISTS',
  CREATE_CUSTOM_SEEDER_TEMPLATE_FILE_SKIP_NO_CUSTOM: 'CREATE_CUSTOM_SEEDER_TEMPLATE_FILE_SKIP_NO_CUSTOM',
  CREATE_SEEDERS_FOLDER_START: 'CREATE_SEEDERS_FOLDER_START',
  CREATE_SEEDERS_FOLDER_SUCCESS: 'CREATE_SEEDERS_FOLDER_SUCCESS',
  CREATE_SEEDERS_FOLDER_ERROR: 'CREATE_SEEDERS_FOLDER_ERROR',
  CREATE_SEEDERS_FOLDER_SKIP_FOLDER_EXISTS: 'CREATE_SEEDERS_FOLDER_SKIP_FOLDER_EXISTS',
  WRITE_USER_CONFIG_START: 'WRITE_USER_CONFIG_START',
  WRITE_USER_CONFIG_SUCCESS: 'WRITE_USER_CONFIG_SUCCESS',
  WRITE_USER_CONFIG_ERROR: 'WRITE_USER_CONFIG_ERROR',
  WRITE_USER_CONFIG_SKIP_FILE_EXISTS: 'WRITE_USER_CONFIG_SKIP_FILE_EXISTS'
});

module.exports = exports.default;