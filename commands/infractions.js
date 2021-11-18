const Discord = require("discord.js")
const moment = require("moment")
moment.locale('fr')
module.exports = {
    run: async (message, args, client) => {
        const guild = message.guild;
        if (!message.member.hasPermission('VIEW_AUDIT_LOG')) return message.channel.send("Tu n'as pas la permission ``Voir les logs du serveur``.")
        const member = message.mentions.members.first()
        if (!member) return message.channel.send("Merci de mentionner le membre dont vous voulez voir les warn\nUtilisation : ``fb!infractions [@mention]``")
        if(!client.db.warns[member.id+guild.id]) return message.channel.send("Ce membre n'a aucun avertissement")
        message.channel.send(new Discord.MessageEmbed()
            .setDescription(`__Total de warns :__ ${client.db.warns[member.id+guild.id].length}\n\n__10 derniers warns :__\n\n${client.db.warns[member.id+guild.id].slice(0, 10).map((warn, i) => `**${i + 1}**\nRaison : ${warn.reason}\nSanctionné ${moment(warn.date).fromNow()} par <@!${warn.mod}>`).join('\n\n')}`)
        )
    },
    name: 'infractions',
    guildOnly: true,
    help : {
        description: "Affiche les infractions du membre mentionné",
        syntax: "[@mention]"
    }
}
