const Eris = require("eris");
require('pluris')(Eris);

module.exports = class ExtendedClient extends Eris.Client {
  /**
   * @param {String} token 
   * @param {Eris.ClientOptions} options
   */
  constructor(token, options) {
    super(token, options);

    this.commands = new Map();
    this.cooldowns = new Map();
    this.aliases = new Map();
    this.helps = new Map();
    this.config = require("../config.json");
    this.package = require("../package.json");
  };
};
