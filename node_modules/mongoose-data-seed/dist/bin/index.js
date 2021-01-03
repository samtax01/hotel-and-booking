"use strict";

require("@babel/register");

require("core-js/stable");

require("regenerator-runtime/runtime");

var _helpers = require("../lib/commands/helpers");

var _helpers2 = require("../lib/utils/helpers");

/**
 * Main entry point, run md-seed cli
 * @return {Promise}
 */
const run = async () => {
  try {
    // recive the command and the arguments input from the cli
    const {
      command,
      argv
    } = (0, _helpers.getCommandAndArgvFromCli)(); // run the cli command

    await (0, _helpers.runCommand)(command, argv);
    (0, _helpers2.exit)();
  } catch (error) {
    (0, _helpers2.exit)(error);
  }
};

run();