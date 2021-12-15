// In here, we're can add some events in /events folder, so we don't need to fill it up the server.js with all these events.

const { Client } = require("eris");
const { readdirSync } = require("fs"); // You don't need to install this again.

/**
  * @param {Client} client
  */
module.exports = (client) => {
  for (const event of readdirSync("./events/")) {
    client.on(event.split(".")[0], (...args) => require(`../events/${event}`)(client, ...args));
    // This will remove the .js and only with the name of the event.
  }
}
