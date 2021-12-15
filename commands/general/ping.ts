export = {
  help: {
    name: "ping",
    description: "Check if the bot was online.",
    usage: "ping",
    example: "ping"
  },

  conf: {
    aliases: [],
    cooldown: 5
  },

  run: async (client, message, args) => {
    return message.channel.createMessage("Pong!");
  }
};
