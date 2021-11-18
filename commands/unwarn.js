const Discord = require("discord.js")
const fs = require("fs")
module.exports = {
    run: async (message, args, client) => {
        const guild = message.guild;
        if (!message.member.hasPermission('VIEW_AUDIT_LOG')) return message.channel.send("Tu n'as pas la permission ``Voir les logs du serveur``.")
        const member = message.mentions.members.first()
        if (!member) return message.channel.send("Merci de mentionner le membre à unwarn\nUtilisation : ``fb!unwarn [@mention] [numéro du warn]``")
        if (!client.db.warns[member.id+guild.id]) return message.channel.send("Ce membre n'a aucun avertissement")
        const warnIndex = parseInt(args[1], 10) - 1
        if (warnIndex < 0 || !client.db.warns[member.id+guild.id][warnIndex]) return message.channel.send("Merci de présicer le numéro du warn\nUtilisation : ``fb!unwarn [@mention] [numéro du warn]``\n\nSi cela fonctionne toujours pas il ce peut que le membre mentionné n'est pas autant de warn\n\nVérifie avec ``fb!infrations [@mention]``")
        const { reason } = client.db.warns[member.id+guild.id].splice(warnIndex, 1)[0]
        if (!client.db.warns[member.id+guild.id].length) delete client.db.warns[member.id+guild.id]
        fs.writeFileSync("./db.json", JSON.stringify(client.db))
        message.channel.send(`Le warn **${reason}** de ${member} à bien été supprimé !`)
    },
    name: 'unwarn',
    guildOnly: true,
    help : {
        description: "Supprime un avertissement du membre mentionné",
        syntax: "[@mention] [numéro du warn]"
    }
}
