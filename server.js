/*
  Reference:
  - https://github.com/abalabahaha/eris/blob/master/lib/Constants.js
  - https://abal.moe/Eris/docs/reference
  - https://abal.moe/Eris/
*/

const ExtendedClient = require("./handler/Client");
require("dotenv").config();

const token = `Bot ${process.env.botToken}`; // stored on .env file.
const client = new ExtendedClient(token, { // https://abal.moe/Eris/docs/Client
  getAllUsers: true,
  intents: ["guilds", "guildMembers", "guildMessages"],
  maxShards: "auto", // Use this if your bot uses sharding.
  restMode: true
});

require("./handler/Module")(client);
require("./handler/Event")(client);

client.connect();
