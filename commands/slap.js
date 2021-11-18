const Discord = require("discord.js")
const { get } = require("https")

module.exports = {
    run: async (message, args, client) => {


        get("https://nekos.life/api/v2/img/slap",(res) => {
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
                    .setDescription(`**${message.author.username}** met une claque à **${message.mentions.members.first().user.username}**`)
                    .setImage(parsedData.url)
                    .setFooter(`${client.user.username}`))
                } catch (error) {
                    console.error(error.message);
                }
            });
            if(!message.mentions.members.first() == 1) return message.channel.send(`Mettre une claque au le vent...\nBonne solution pour ne blesser personne`)
        }).on("error", (error) => {
            console.error(error.meesage);
        });
    },
    name: "slap",
    guildOnly: true,
    help : {
        description: "Mettre une claque à quelqu'un",
        syntax: "[@mention]",
    }
}
