const keepAlive = require(`./server`);

const { Client, GatewayIntentBits, Partials, Collection, ActivityType } = require("discord.js");

const Deezer = require("erela.js-deezer");
const Apple = require("better-erela.js-apple").default;
const Spotify = require("better-erela.js-spotify").default;
const { Manager } = require("erela.js");

const { LavasfyClient } = require("lavasfy");

const { Guilds, GuildMembers, GuildMessages, MessageContent, GuildMessageReactions, GuildVoiceStates } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember, Channel, Reaction } = Partials;

const client = new Client({
  intents: [Guilds, GuildMembers, GuildMessages, MessageContent, GuildMessageReactions, GuildVoiceStates], 
  Partials: [User, Message, GuildMember, ThreadMember, Channel, Reaction],
});

require("./Handler/antiCrash.js");
const { loadEvents } = require("./Handler/eventHandler");
const { loadModals } = require("./Handler/modalHandler");

client.config = require("./config.json")
client.commands = new Collection();
client.subCommands = new Collection();
client.events = new Collection();
client.modals = new Collection();

const { connect } = require("mongoose");
connect(process.env.database, {
}).then(() => console.log("The client is now connected to the database!"));

client.lavasfy = new LavasfyClient(
  {
    clientID: process.env.spotifyClientID,
    clientSecret: process.env.spotifySecret,
    filterAudioOnlyResult: true,
    autoResolve: true,
    useSpotifyMetadata: true,
    playlistPageLoadLimit: 1,
  },
  client.config.nodes
);

    setInterval(() => {  //+
      const index = Math.floor(Math.random() * (client.config.activities_list.length - 1) + 1);
          const targetGuild = client.guilds.cache.get("429089094690275338")
      if(targetGuild) {
      client.user.setPresence({
  activities: [{ name: client.config.activities_list[index] + ' with ' + targetGuild.memberCount + ' people', type: ActivityType.Listening }],
  status: 'dnd',
}); }
  }, 10000);//+
client.on("debug", ( e ) => console.log(e));

client.manager = new Manager({
  nodes: client.config.nodes,
  plugins: [
    new Spotify({
      clientID: process.env.spotifyClientID,
      clientSecret: process.env.spotifySecret,
    }),
    new Apple(),
    new Deezer(),
  ],
  send: (id, payload) => {
    let guild = client.guilds.cache.get(id);
    if (guild) guild.shard.send(payload);
  },
});

loadEvents(client);
loadModals(client);
client.login(process.env.token)

keepAlive();
module.exports = client;