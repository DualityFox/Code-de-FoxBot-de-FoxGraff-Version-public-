const Discord = require("discord.js")
const { get } = require("https")

module.exports = {
    run: async (message, args, client) => {


        get("https://nekos.life/api/v2/img/hug",(res) => {
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
                    .setDescription(`**${message.author.username}** fait un calin à **${message.mentions.members.first().user.username}**`)
                    .setImage(parsedData.url)
                    .setFooter(`hug | `)
                    .setTimestamp())
                } catch (error) {
                    console.error(error.message);
                }
            });
            if(!message.mentions.members.first() == 1) return message.channel.send(`Faire un calin au vide\nPourquoi pas...`)
        }).on("error", (error) => {
            console.error(error.meesage);
        });
    },
    name: "hug",
    guildOnly: true,
    help : {
        description: "Faire un calin à quelqu'un",
        syntax: "[@mention]",
    }
}