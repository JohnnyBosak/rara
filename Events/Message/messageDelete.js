const { EmbedBuilder, Message, WebhookClient } = require("discord.js");

const config = require("../../config.json");
const chDontScan = config.chDontScan;

module.exports = {
  name: "messageDelete",
  /**
   * @param {Message} message
   */
  execute(message) {
    if (message.author.bot) return;
    //if (message.guild.id !== "429089094690275338") return;
    if (chDontScan.some(element => message.channel.id === (element))) return;
    
    const Log = new EmbedBuilder()
    .setAuthor({ name: `${message.author.username} (message deleted)`, iconURL: `${message.author.avatarURL({ dynamic: true, format: 'png' })}`, url: `${message.url}` })
    .setColor("#FF0000")
    .setTimestamp()
    .setDescription(`**Deleted Message:**\n ${message.content ? message.content : "None"}`.slice(0, 4096))
	  .setFooter({ text: `${message.channel.name}`, iconURL: 'https://i.ibb.co/s3WkBCw/13e8a9704032f64926ac7f2487110f7b.png' });

    if (message.attachments.size >= 1) {
      Log.addFields(
{ name: 'Attachments :', value: `${message.attachments.map(a => a.url).join("\n")}`, "inline": true }, );
    }

  //let channel = message.guild.channels.cache.get('818290104053006336')
    const channel = message.guild.channels.cache.find(channel => channel.name === 'radelgirl')
    if (!channel) return;
    channel.send({embeds: [Log]}).catch((err) => console.log(err));


//    new WebhookClient({url: "https://discord.com/api/webhooks/1003324383378538526/oiHOda_eb9WLpsdGFJxVhl8OekwSJ_YD5G2G6f4T6VUrlRmRJSayr8sOW3u0tvlci2rG"}).send({embeds: [Log]}).catch((err) => console.log(err));
  }


}