const Discord = require("discord.js")
const { get } = require("https")

module.exports = {
    run: async (message, args, client) => {


        get("https://nekos.life/api/v2/img/feed",(res) => {
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
                    .setDescription(`${message.mentions.members.first() ? `**${message.author.username}** donne à manger à **${message.mentions.members.first().user.username}**` : `**${message.author.username}** mange`}`)
                    .setImage(parsedData.url)
                    .setFooter(`feed | `)
                    .setTimestamp())
                } catch (error) {
                    console.error(error.message);
                }
            });
        }).on("error", (error) => {
            console.error(error.meesage);
        });
    },
    name: "feed",
    guildOnly: true,
    help : {
        description: "Manger où donner à manger à quelqu'un",
        syntax: "<@mention>",
    }
}