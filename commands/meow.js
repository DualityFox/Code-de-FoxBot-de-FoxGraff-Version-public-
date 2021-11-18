const Discord = require("discord.js")
const { get } = require("https")

module.exports = {
    run: async (message, args, client) => {


        get("https://nekos.life/api/v2/img/meow",(res) => {
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
                    .setDescription(`Requête de **${message.author.username}**`)
                    .setImage(parsedData.url)
                    .setFooter(`meow | `)
                    .setTimestamp())
                } catch (error) {
                    console.error(error.message);
                }
            });
        }).on("error", (error) => {
            console.error(error.meesage);
        });
    },
    name: "meow",
    guildOnly: true,
    help : {
        description: "Affiche l'image d'un chat",
    }
}