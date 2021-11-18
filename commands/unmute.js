const Discord = require("discord.js")
config = require('../config.json')
module.exports = {
    run: async (message, args) => {
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("Vous n'avez pas la permission ``Administrateur``")
        const member = message.mentions.members.first()
        if (!member) return message.channel.send('Veuillez mentionner le membre à unmute.')
        if (member.id === message.guild.ownerID) return message.channel.send('On ne unmute pas le propriétaire du serveur voyons.')
        if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send('Vous ne pouvez pas unmute ce membre.')
        if (!member.manageable) return message.channel.send("Mon rôle n'est pas assez élevé pour unmute ce membre.")
        const reason = args.slice(1).join(' ') || 'Aucune raison fournie.'
        const muteRole = message.guild.roles.cache.find(role => role.name === 'Muted by DualityBot')
        if (!muteRole) return message.channel.send("Ce membre n'est pas mute")
        await member.roles.remove(muteRole)
        message.channel.send(`${member} n'est plus réduit au silence !`)
        message.guild.channels.cache.get(config.logs).send(new Discord.MessageEmbed()
        .setAuthor(`[UNMUTE] ${member.user.tag}`, member.user.displayAvatarURL())
        .setColor('#ff0000')
        .addField('Utilisateur', member, true)
        .addField('Modérateur', message.author, true)
        )
    },
    name: 'unmute',
    guildOnly: true,
    help : {
        description: "Réautorise le membre mentionné à parler",
        syntax: "[@mention]"
    }
}
