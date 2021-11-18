const Discord = require("discord.js")
config = require('../config.json')
module.exports = {
    run: async (message, args, client) => {
        if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send("Tu n'as pas la permission ``Bannir des membres``.")
        let member = await client.users.fetch(args[0]);
        if (!member) return message.channel.send("L'utilisateur n'existe pas où plus");
        if (!member.ban) return message.channel.send("L'utilisateur n'est pas banni du serveur");
        message.guild.members.unban(member)
        message.channel.send(`**${member.username}** à été débanni`)
        message.guild.channels.cache.get(config.logs).send(new Discord.MessageEmbed()
        .setAuthor(`[UNBAN] ${member.username}`)
        .setColor('#ff0000')
        .addField('Utilisateur', member, true)
        .addField('Modérateur', message.author, true)
        )
    },
    name: 'unban',
    guildOnly: true,
    help : {
        description: "Débanni l'utilisateur",
        syntax: "[Id de l'utilisateur]"
    }
}
