const Discord = require("discord.js")
const { get } = require("https")

module.exports = {
    run: async (message, args, client) => {


        get("https://nekos.life/api/v2/img/poke",(res) => {
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
                    .setDescription(`**${message.author.username}** donne des petits coups à **${message.mentions.members.first().user.username}**`)
                    .setImage(parsedData.url)
                    .setFooter(`baka`)
                    .setTimestamp())
                } catch (error) {
                    console.error(error.message);
                }
            });
            if(!message.mentions.members.first() == 1) return message.channel.send(`Donner de petits coup c'est bien...\nLes donner à quelqu'un c'est mieux...`)
        }).on("error", (error) => {
            console.error(error.meesage);
        });
    },
    name: "poke",
    guildOnly: true,
    help : {
        description: "Donné des petit coup à quelqu'un",
        syntax: "[@mention]",
    }
}