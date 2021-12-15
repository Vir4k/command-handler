import {readdirSync} from "fs";

export = async (client) => {
  for (let event of readdirSync("./events/")) {
    client.on(event.split(".")[0], (...args) => require(`../events/${event}`)(client, ...args));
  };
};
