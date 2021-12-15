const { Message } = require("eris");

/**
  * @param {*} _
  * @param {Message} message
  */
exports.run = async (_, message) => {
  message.channel.createMessage("Pong!");
};

exports.help = {
  name: "ping",
  description: "Check if the bot was online.",
  usage: "!ping",
  example: "!ping"
};

exports.conf = {
  aliases: [],
  cooldown: 5 // Seconds
};
