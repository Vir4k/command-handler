export = async (client, message) => {
  if (message.author.bot || message.channel.type === 1) return;
  
  // Mention Prefix.
  let mentionRegex = message.content.match(new RegExp(`^<@!?(${client.user.id})>`, 'gi')), prefix;
  if (mentionRegex) prefix = `${mentionRegex[0]} `;
  else prefix = client.config.prefix;
  
  if (!message.content.startsWith(prefix)) return;
  
  let args = message.content.slice(prefix.length).trim().split(/ +/g);
  let msg = message.content.toLowerCase();
  let cmd = args.shift().toLowerCase();
  let sender = message.author || message.member || message.member.user;
  
  let commandFile = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
  if (!commandFile) return;

  // Cooldown
  if (!client.cooldowns.has(commandFile.help.name)) client.cooldowns.set(commandFile.help.name, new Map());
  
  const now = Date.now();
  const timestamps = client.cooldowns.get(commandFile.help.name);
  const cooldownAmount = (commandFile.conf.cooldown || 3) * 1000;
  
  if (!timestamps.has(sender.id)) {
    if (!client.config.owners.includes(sender.id)) {
      timestamps.set(sender.id, now);
    };
  } else {
    const expirationTime = timestamps.get(sender.id) + cooldownAmount;
    
    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.channel.createMessage({
        content: `Calm down dude, please wait **${timeLeft.toFixed(1)}** seconds to try the command again.`,
        messageReference: {
          messageID: message.id
        }
      });
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
    console.log(`${senderTag} (id: ${sender.id}) ran a command: ${cmd}`);
  };
};
