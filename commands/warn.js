const Discord = require("discord.js")
const fs = require("fs")
config = require('../config.json')
module.exports = {
    run: async (message, args, client) => {
        const guild = message.guild;
        if (!message.member.hasPermission('VIEW_AUDIT_LOG')) return message.channel.send("Tu n'as pas la permission ``Voir les logs du serveur``.")
        const member = message.mentions.members.first()
        if (!member) return message.channel.send("Merci de mentionner le membre à warn\nUtilisation : ``fb!warn [@mention] [raison]``")
        if (member.id === message.guild.ownerID) return message.channel.send("On ne warn pas le propriétaire du serveur voyons !!!")
        if(message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send("Vous ne pouvez pas warn ce membre")
        const reason = args.slice(1).join(" ")
        if (!reason) return message.channel.send("Merci de donner une raison !\nUtilisation : ``fb!warn [@mention] [raison]``")
        if (!client.db.warns[member.id+guild.id]) client.db.warns[member.id+guild.id] = []
        client.db.warns[member.id+guild.id].unshift({
            reason,
            date: Date.now(),
            mod: message.author.id
        })
        fs.writeFileSync("./db.json", JSON.stringify(client.db))
        message.channel.send(`${member} à été averti !`)
        message.guild.channels.cache.get(config.logs).send(new Discord.MessageEmbed()
        .setAuthor(`[WARN] ${member.user.tag}`, member.user.displayAvatarURL())
        .setColor('#ff0000')
        .addField('Utilisateur', member, true)
        .addField('Modérateur', message.author, true)
        .addField('Raison', `${reason}`, true)
        )
        message.mentions.members.first().createDM().then(channel => {channel.send(`Tu à était averti sur le serveur ${guild.name} pour la raison suivante : \`${reason}\`.`)});
    },
    name: 'warn',
    guildOnly: true,
    help : {
        description: "Avertis le membre mentionné",
        syntax: "[@mention] [raison]"
    }
}
