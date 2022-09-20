const { ChatInputCommandInteraction, SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
  .setName("ping")
  .setDescription("pong"),
/**
*
* @param {ChatInputCommandInteraction} interaction
*/
execute(interaction) {
  interaction.reply({content: "pong!", ephemeral: true})
  }
}