const Discord =require("discord.js");
const moment = require("moment");

module.exports = {

    run: async (message, args, client) => {

        message.channel.send(new Discord.MessageEmbed()
        .setDescription(`Information sur les serveurs de **${client.user.tag}**`)
        .addField('Nombre de serveurs :', `${client.guilds.cache.size}`)
        .addField('Nom des serveurs :', `${client.guilds.cache.map( guilds => `${guilds.name}`).join('\n')} `)

        )
    },
    name: "botservinfo",
    guildOnly: true,
    help : {
        description: "Donne des infos sur les serveurs du bot"
    }
}