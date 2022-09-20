const { ChatInputCommandInteraction, CommandInteraction } = require("discord.js");

module.exports = {
  name: "interactionCreate",
  /**
  *
  * @param {CommandInteraction} interaction
  */
  execute(interaction, client) {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) {
      return interaction.reply({
        content: "This command is outdated.",
        ephemeral: true
      });
    }

    if (command.developer && interaction.user.id !== "408675103946178561")
      return interaction.reply({
        content: "This command is only available to the developer.",
        ephemeral: true
  });

    command.execute(interaction, client);
  }
}