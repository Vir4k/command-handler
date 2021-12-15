const {Client, Collection} = require("discord.js");

module.exports = class DiscordClient extends Client {
  constructor(options) {
    super(options)
    
    this.commands = new Collection(); // This will store your commands.
    this.cooldowns = new Collection(); // This will store your commands with cooldowns.
    this.aliases = new Collection(); // This will store your alternative commands. Example: /server -> /serverinfo, /guild, /guildinfo
    this.helps = new Collection();
    this.config = require('../config.json');
    this.package = require("../package.json");
  };
};
