const { Client, Message } = require("eris");

/**
  * @param {Client} client
  * @param {Message} message
  */
module.exports = async (client, message) => {
  if (message.author.bot) return;
  
  // Ignore DM channel. Remove this line if you want to.
  if (message.channel.type === 1) return;
  // More info: https://github.com/abalabahaha/eris/blob/master/lib/Constants.js
  
  let prefix = client.config.prefix;
  
  if (!message.content.startsWith(prefix)) return;
  
  let args = message.content.slice(prefix.length).trim().split(/ +/g);
  let msg = message.content.toLowerCase();
  let cmd = args.shift().toLowerCase();
  let sender = message.author || message.member.user;
  
  let commandFile = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
  if (!commandFile) return;

  if (!client.cooldowns.has(commandFile.help.name)) client.cooldowns.set(commandFile.help.name, new Map());
  
  const now = Date.now();
  const timestamps = client.cooldowns.get(commandFile.help.name);
  const defaultCooldown = 3;
  const cooldownAmount = (commandFile.conf.cooldown || defaultCooldown) * 1000;
  
  if (!timestamps.has(sender.id)) {
    // Bypass Owner Cooldown
    if (!client.config.owners.includes(message.author.id)) {
      timestamps.set(sender.id, now);
    };
  } else {
    const expirationTime = timestamps.get(sender.id) + cooldownAmount;
    
    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.channel.createMessage(`Calm down dude, please wait **${timeLeft.toFixed(1)}** seconds to try the command again.`);
    };
    
    timestamps.set(sender.id, now);
    setTimeout(() => timestamps.delete(sender.id), cooldownAmount);
  };
  
  try {
    if (!commandFile) return;
    commandFile.run(client, message, args);
  } catch (error) {
    console.log(error.message);
  } finally {
    let senderTag = `${sender.username}#${sender.discriminator}`;
    console.log(`${senderTag} executed ${prefix + cmd}`);
  };
};
