const Discord = require("discord.js")
const { get } = require("https")

module.exports = {
    run: async (message, args, client) => {


        get("https://nekos.life/api/v2/img/smug",(res) => {
            const { statusCode } = res;
            if (statusCode !== 200) {
                return message.channel.send("Euh... J'ai eu un problème avec l'API...Réessaye.");
            }
    
            res.setEncoding("utf8");
            let rawData = "";
    
            res.on("data", chunk => {
                rawData += chunk;
            });
    
            res.on("end", () => {
                try {
                    const parsedData = JSON.parse(rawData);
    
                    message.channel.send(new Discord.MessageEmbed()
                    .setDescription(`${message.mentions.members.first() ? `**${message.author.username}** sourit à **${message.mentions.members.first().user.username}**` : `**${message.author.username}** sourit à la vie`}`)
                    .setImage(parsedData.url)
                    .setFooter(`${client.user.username}`))
                } catch (error) {
                    console.error(error.message);
                }
            });
        }).on("error", (error) => {
            console.error(error.meesage);
        });
    },
    name: "smug",
    guildOnly: true,
    help : {
        description: "Sourire où sourire à quelqu'un",
        syntax: "<@mention>",
    }
}