import Eris from "eris";
import pluris from "pluris";
pluris(Eris);

import Package from "../package.json";
import Config from "../config";

export class ErisClient extends Eris.Client {
  commands: Map<any, any>;
  cooldowns: Map<any, any>;
  aliases: Map<any, any>;
  helps: Map<any, any>;
  package: typeof Package;
  config: typeof Config;

  constructor(token: string, options?: Eris.ClientOptions | undefined) { // Eris ClientOptions is optional, but recommended.
    super(token, options!); // https://stackoverflow.com/a/42274019
    
    this.commands = new Map();
    this.cooldowns = new Map();
    this.aliases = new Map();
    this.helps = new Map();
    this.package = Package;
    this.config = Config;
  };
};
