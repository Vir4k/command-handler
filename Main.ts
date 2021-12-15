import * as dotenv from "dotenv";
dotenv.config();

import {ErisClient} from "./handler/Client";
import Module from "./handler/Module";
import Event from "./handler/Event";

const client = new ErisClient(`Bot ${process.env.TOKEN}`, {
  getAllUsers: true,
  intents: ["guilds", "guildMembers", "guildMessages", "guildPresences"],
  restMode: true
});

Module(client);
Event(client);

client.connect();
