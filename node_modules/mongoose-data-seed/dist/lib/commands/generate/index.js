"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _options = require("./options");

var _help = _interopRequireDefault(require("./help"));

var _generateSeeder = _interopRequireDefault(require("./generate-seeder"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * mongoose-data-seed generate command
 * @param  {stringp[]}  argv cli arguments
 * @return {Promise}
 */
var _default = async argv => {
  const {
    seederName,
    helpWanted
  } = (0, _options.getOptions)(argv);
  if (helpWanted) return (0, _help.default)();
  await (0, _generateSeeder.default)(seederName);
};

exports.default = _default;
module.exports = exports.default;