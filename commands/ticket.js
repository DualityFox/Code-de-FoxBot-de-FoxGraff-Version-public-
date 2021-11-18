const config = require('../config.json'),
    fs = require('fs'),
    Discord = require('discord.js')
 
module.exports = {
    run: async (message, args, client) => {
        //if (Object.values(client.db.tickets).some(ticket => ticket.author === message.author.id)) return message.channel.send('Vous avez déjà un ticket d\'ouvert.')
        //const channel = await message.guild.channels.create(`📝・ticket ${message.author.username}`, {
            //type: 'text',
            //parent: config.ticket.category,
            //permissionOverwrites: [{
              //  id: message.guild.id,
                //deny: 'VIEW_CHANNEL'
            //}, {
                //id: message.author.id,
              //  allow: 'VIEW_CHANNEL'
            //}, ...config.ticket.roles.map(id => ({
           //     id,
            //    allow: 'VIEW_CHANNEL'
          //  }))]
        //})
        //client.db.tickets[channel.id] = {
       //     author: message.author.id
        //}
        //fs.writeFileSync('D:\Images\Fox Bot/db.json', JSON.stringify(client.db))
        //channel.send(`Bonjour ${message.member}, bienvenue dans votre ticket.`)
        //channel.send(new Discord.MessageEmbed()
        //    .setDescription('Pour fermer ce ticket tape ``fb!close`` .'))
       // message.channel.send(`Votre ticket ${channel} a été créé !`)
        message.channel.send(`__**Désolé !**__ \nLes tickets ont étaient **temporairement** désactivé !`)
    },
    name: 'ticket',
    guildOnly: true,
    help : {
        description: "Ouvre un ticket à votre nom"
    }
}
