const Discord = require("discord.js")
const config = require('../config.json')
 
module.exports = {
    run: async (message, args, client) => {
        if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('Tu n\'as pas la permission ``Gérer le serveur``.')
        if (!args[0]) return message.channel.send('Veuillez indiquer du texte à envoyer.')
        message.delete()
        message.channel.send(message.content.trim().slice(`${config.prefix}say`.length))
    },
    name: 'say',
    guildOnly: true,
    help : {
        description: "Envoie un message via le bot",
        syntax: "[message]"
    }
}
