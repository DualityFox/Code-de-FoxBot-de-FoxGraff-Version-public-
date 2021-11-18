const Discord = require("discord.js")
const { get } = require("https")

module.exports = {
    run: async (message, args, client) => {


        get("https://nekos.life/api/v2/img/baka",(res) => {
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
                    .setDescription(`**${message.author.username}** insulte **${message.mentions.members.first().user.username}**`)
                    .setImage(parsedData.url)
                    .setFooter(`baka`)
                    .setTimestamp())
                } catch (error) {
                    console.error(error.message);
                }
            });
            if(!message.mentions.members.first() == 1) return message.channel.send(`Tu insulte quoi ??? Où qui ???\nCar tu viens de vexé la molécule d'air en face de toi...`)
        }).on("error", (error) => {
            console.error(error.meesage);
        });
    },
    name: "baka",
    guildOnly: true,
    help : {
        description: "Insulté quelqu'un",
        syntax: "[@mention]",
    }
}
