async function loadCommands(client) {
  const { loadFiles } = require("../Functions/fileLoader");
  const ascii = require("ascii-table");
  const table = new ascii().setHeading("Commands", "Status");

  await client.commands.clear();
  await client.subCommands.clear();

  let commandsArray = [];
  let developerArray = [];

  const Files = await loadFiles("Commands");

  Files.forEach((file) => {
    const command = require(file);

    if (command.subCommand) return client.subCommands.set(command.subCommand, command);
    
    client.commands.set(command.data.name, command);

    commandsArray.push(command.data.toJSON());

  table.addRow(command.data.name, "🟩");
  }); 
  client.application.commands.set(commandsArray);

  const developerGuild = client.guilds.cache.get(client.config.developerGuild);

  developerGuild.commands.set(developerArray);

  return console.log(table.toString(), "\n Loaded Commands");
}

module.exports = { loadCommands };