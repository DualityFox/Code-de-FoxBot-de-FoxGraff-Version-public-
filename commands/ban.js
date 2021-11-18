const Discord = require("discord.js")
config = require('../config.json')

module.exports = {
    run: async (message, args) => {
        if (!message.member.hasPermission('BAN_MEMBERS')) return message.reply("tu n'as pas la permission ``Bannir des membres``.")
        const member = message.mentions.members.first()
        if (!member) return message.reply("merci de mentionner le membre à bannir\nUtilisation : ``fb!ban [@mention] <raison>``")
        if (member.id === message.guild.ownerID) return message.reply("On ne banni pas le propriétaire du serveur voyons !!!")
        if(message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.reply("Vous ne pouvez pas bannir ce membre")
        if(!member.bannable) return message.reply("Mon rôle n'est pas assez élevé pour bannir ce membre !")
        const reason = args.slice(1).join(" ") || 'Aucune raison fournie'
        await member.ban({reason})
        message.channel.send(`${member.user.tag} à été banni !`)
        message.guild.channels.cache.get(config.logs).send(new Discord.MessageEmbed()
        .setAuthor(`[BAN] ${member.user.tag}`, member.user.displayAvatarURL())
        .setColor('#ff0000')
        .addField('Utilisateur', member, true)
        .addField('Modérateur', message.author, true)
        .addField('Raison :', `${reason}`, true)
        .addField('Durée', '∞', true)
        )
    },
    name: 'ban',
    guildOnly: true,
    help : {
        description: "Banni l'utilisateur mentionné",
        syntax: "[@mention] <raison>"
    }
}
