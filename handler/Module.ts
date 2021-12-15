import fs from "fs";

const homePath: string = process.cwd();

export = async (client) => {
  fs.readdir(`${homePath}/commands/`, (err, categories) => {
    if (err) console.log(err);
    console.log(`Available: ${categories.length} category`);

    categories.forEach((category) => {
      let moduleConf = require(`${homePath}/commands/${category}/module.json`);
      if (moduleConf) {
        
        moduleConf.path = `${homePath}/commands/${category}`;
        moduleConf.cmds = [];
        client.helps.set(category, moduleConf);

        fs.readdir(`${homePath}/commands/${category}`, (err, files) => {

          console.log(`Available: ${files.length - 1} cmds - ${category} category`);
          if (err) console.log(err);

          files.forEach((file) => {
            if (file.endsWith(".ts")) { // Previously: .js

              let prop = require(`${homePath}/commands/${category}/${file}`);
              prop.type = category;

              client.commands.set(prop.help.name, prop);
              prop.conf.aliases.forEach((alias) => client.aliases.set(alias, prop.help.name));
              client.helps.get(category).cmds.push(prop.help.name);
            };
          });
        });
      };
    });
  });
};
