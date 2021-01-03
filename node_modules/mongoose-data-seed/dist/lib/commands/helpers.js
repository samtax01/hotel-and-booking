"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.runCommand = exports.getCommandAndArgvFromCli = exports.commandToFunction = exports.aliasToCommand = exports.isAlias = void 0;

var _commandLineCommands = _interopRequireDefault(require("command-line-commands"));

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Whether a given command is an alias
 * @param  {string}  command
 * @return {Boolean}
 */
const isAlias = command => Object.keys(_constants.aliases).includes(command);
/**
 * Get the command name of a given alias
 * @param  {string} alias
 * @return {string}
 */


exports.isAlias = isAlias;

const aliasToCommand = alias => _constants.aliases[alias];
/**
 * Get the function of a given command
 * @param  {string}   command command name
 * @return {Function} command function
 */


exports.aliasToCommand = aliasToCommand;

const commandToFunction = command => {
  command = command || _constants.defaultCommand;

  if (isAlias(command)) {
    command = aliasToCommand(command);
  }

  return _constants.commandsMap[command];
};
/**
 * Get the command and the arguments from the cli
 * @return   {Object}
 * @property {string}   command command name
 * @property {string[]} argv    command arguments
 */


exports.commandToFunction = commandToFunction;

const getCommandAndArgvFromCli = () => {
  const {
    command,
    argv
  } = (0, _commandLineCommands.default)(_constants.availableCommandsList);
  return {
    command,
    argv
  };
};
/**
 * Run command
 * @param  {string} command command name
 * @param  {string} argv    command arguments
 */


exports.getCommandAndArgvFromCli = getCommandAndArgvFromCli;

const runCommand = (command, argv) => {
  const commandFunction = commandToFunction(command);
  return commandFunction(argv);
};

exports.runCommand = runCommand;