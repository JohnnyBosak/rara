const { ChatInputCommandInteraction, SlashCommandBuilder, PermissionFlagsBits, Client } = require("discord.js");
const { loadCommands } = require("../../Handler/commandHandler");
const { loadEvents } = require("../../Handler/eventHandler");

module.exports = {
  developer: true,
  data: new SlashCommandBuilder()
  .setName("reload")
  .setDescription("Reload your events/command.")
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
  .addSubcommand((options) => 
    options
    .setName("events")
    .setDescription("Reload your events"))
  .addSubcommand((options) => 
    options
    .setName("commands")
    .setDescription("Reload your commands")),
  /**
  *
  * @param {ChatInputCommandInteraction} interaction
  * @param {Client} client
  */
  execute(interaction, client) {
    const subCommand = interaction.options.getSubcommand();

    switch(subCommand) {
        case "events" : {
          for( const [key, value] of client.events )
            client.removeListener(`${key}`, value, true);
          loadEvents(client);
          interaction.reply({content: "Reloaded the events.", ephemeral: true});
          
        }
        break;
      case "commands" : {
          loadCommands(client);
          interaction.reply({content: "Reloaded the commands.", ephemeral: true});
        
      }
        break;
    } 
  }
}