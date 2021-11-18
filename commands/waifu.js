const Discord = require("discord.js")
const { get } = require("https")

module.exports = {
    run: async (message, args, client) => {


        get("https://nekos.life/api/v2/img/waifu",(res) => {
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
    name: "waifu",
    guildOnly: true,
    help : {
        description: "Affiche une image d'un personnage féminin de mangas, d'animé où de jeux vidéo.",
    }
}