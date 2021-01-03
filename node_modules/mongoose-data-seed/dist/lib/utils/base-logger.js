"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * Base Logger
 */
class BaseLogger {
  /**
   * Get the logger as observer
   * @return {Object} observer
   * @property {Function} next
   * @property {Function} error
   * @property {Function} complete
   */
  asObserver() {
    return {
      next: (...args) => this.next(...args),
      error: (...args) => this.error(...args),
      complete: (...args) => this.complete(...args)
    };
  }

  next() {}

  error() {}

  complete() {}

}

exports.default = BaseLogger;
module.exports = exports.default;