const client = require("../../index.js");
const wait = require("node:timers/promises").setTimeout;
const { EmbedBuilder } = require("discord.js");
const pms = require("pretty-ms");
const { magenta, white, red, green } = require("chalk");

client.on("raw", (data) => client.manager.updateVoiceState(data));

module.exports = {
  name: "Erela",
  run: client.manager
    .on("nodeConnect", (node) => {
    console.log(
      magenta("[") +
        magenta("Erela") +
        magenta("]") +
        green(" Node ") +
        white(node.options.id) +
        green(" connected!")
      );
    })

    .on("nodeDisconnect", (node) => {
    console.log(
      magenta("[") +
        magenta("Erela") +
        magenta("] ") +
        white(`Lost connection to node`) +
        red(` ${node.options.identifier}.`)
      );
    })

    .on("nodeError", (node, error) => {
    console.log(
      magenta("[") +
        magenta("Erela") +
        magenta("] ") +
        red("An error has occured regarding node ") +
        white(node.options.identifier) +
        red(`: ${error.message}.`)
      );
    })

    .on("trackStart", (player, track) => {
    client.channels.cache.get(player.textChannel).send({
      embeds: [
        new EmbedBuilder()
          .setColor("Blurple")
          .setDescription(
            `🔹| Now Playing: **[${track.title}](${track.uri})** [<@${
              track.requester.id
            }> - ${pms(track.duration)}]`
          )
          .setTimestamp(),
        ],
      });
    })

      .on("playerMove", async (player, newChannel) => {
    if (!newChannel) {
      const channel = client.channels.cache.get(player.textChannel);
      if (channel)
        channel.send({
          embeds: [
            new EmbedBuilder()
              .setColor("Blurple")
              .setDescription(
                "🔹 | I have been kicked from the channel, you could've at least said bye. :c"
              )
              .setFooter({ text: "Bots have feelings too, you know?" })
              .setTimestamp(),
          ],
        });
      return player.destroy();
    } else {
      player.voiceChannel = newChannel;
      await wait(1000);
      player.pause(false);
    }
  }),

  /**
   * @param {VoiceState} newState
   */
  async execute(newState) {
    if (
      newState.channelId &&
      newState.channel?.type === "GUILD_STAGE_VOICE" &&
      newState.guild.members.me?.voice.suppress
    ) {
      if (newState.guild.members.me.permissions.has(Speak)) {
        await newState.guild.members.me.voice.setSuppressed(false).catch(_err);
      }
    }
  },
};
