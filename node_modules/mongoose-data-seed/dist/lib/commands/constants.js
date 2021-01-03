"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultCommand = exports.commandsMap = exports.availableCommandsList = exports.aliases = exports.commands = void 0;

var _generate = _interopRequireDefault(require("./generate"));

var _help = _interopRequireDefault(require("./help"));

var _init = _interopRequireDefault(require("./init"));

var _run = _interopRequireDefault(require("./run"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Available command names
 *
 * Map command key to command name
 * @type {Map<string, string>}
 */
const commands = {
  GENERATE: 'generate',
  HELP: 'help',
  INIT: 'init',
  RUN: 'run'
};
/**
 * Available command aliases
 *
 * Map alias to command name
 * @type {Map<string, string>}
 */

exports.commands = commands;
const aliases = {
  g: commands.GENERATE,
  h: commands.HELP
};
/**
 * All available command names as list (includes aliases)
 * @type {string[]}
 */

exports.aliases = aliases;
const availableCommandsList = [null, // no command should run help
...Object.values(commands), ...Object.keys(aliases)];
/**
 * Commands map
 *
 * Map command name to the actuall command function
 * @type {Map<string, Function>}
 */

exports.availableCommandsList = availableCommandsList;
const commandsMap = {
  [commands.GENERATE]: _generate.default,
  [commands.HELP]: _help.default,
  [commands.INIT]: _init.default,
  [commands.RUN]: _run.default
};
/**
 * The fefault command name
 * @type {string}
 */

exports.commandsMap = commandsMap;
const defaultCommand = commands.HELP;
exports.defaultCommand = defaultCommand;