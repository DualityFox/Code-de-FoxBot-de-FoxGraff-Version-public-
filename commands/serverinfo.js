const Discord = require("discord.js")
const moment = require("moment")
moment.locale('fr')

module.exports = {
    run: (message, args, client) => {
        const guild = message.guild;
        message.channel.send(new Discord.MessageEmbed()
        .setTitle(`Information sur le serveur **${guild.name}**`)
        .addField('ID :',`${guild.id}`)
        .addField('Créateur :',`${guild.owner.user.tag}`)
        .addField('Créé le :',`${moment(guild.createdAt).format('DD/MM/YYYY')}`)
        .addField('Roles :',`${guild.roles.cache.size}`)
        .addField('Nombre de salon textuel :',`${guild.channels.cache.filter(ch => ch.type === "text").size}`)
        .addField('Nombre de salon vocal :',`${guild.channels.cache.filter(ch => ch.type === "voice").size}`)
        .addField('Nombre de membre :',`${guild.memberCount}`)
        .setThumbnail(`${guild.iconURL()}`)
        .setTimestamp()
        )

    },
    name: "serverinfo",
    guildOnly: true,
    help : {
        description: "Donne des infos sur le serveur"
    }
}