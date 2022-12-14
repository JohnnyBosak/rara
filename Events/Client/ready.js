const { loadCommands } = require("../../Handler/commandHandler");

module.exports = {
  name: "ready",
  once: true,
  /**
  *
  * @param {Client} client 
  */
  execute(client) {
    console.log(`The client is now logged in as ${client.user.username}`)
    
    client.manager.init(client.user.id);
    client.lavasfy.requestToken();
    
    loadCommands(client);
  }
}

