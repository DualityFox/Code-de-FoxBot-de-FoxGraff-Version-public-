const Discord = require("discord.js")

module.exports = {
    run: async (message, args) => {
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Vous n'avez pas la permission ``Gérer les messages``")
        const count = args[0]
        if (!/\d+/.test(count)) return message.channel.send("Merci d'indiquer le nombre de messages à supprimer\nUtilisation : ``fb!clear [nombre entre 1 et 99]``")
        if (count < 1 || count > 99) return message.channel.send("Le nombre de message doit être compris entre 1 et 99\nUtilisation : ``fb!clear [nombre entre 1 et 99]``")
        const { size } = await message.channel.bulkDelete(Number(count) + 1, true)
        message.channel.send(`${size - 1} messages ont été supprimés !`).then(sent => sent.delete({timeout: 5e3}))
    },
    name: "clear",
    guildOnly: true,
    help : {
        description: "Supprime le nombre de message demandé",
        syntax: "[nombre entre 1 et 99]"
    }
}
