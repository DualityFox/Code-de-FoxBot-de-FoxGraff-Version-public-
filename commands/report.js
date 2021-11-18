const Discord = require("discord.js")
const config = require("../config.json")

module.exports = {
    run: (message, args, client) => {
        message.delete();
 
        let target = message.mentions.members.first()
        if(!target) return message.channel.send("Merci de mentionner un utilisateur\nUtilisation : ``fb!report [@mention] [plainte]``").then(sent => sent.delete({timeout: 5e3}))
        let reason = args.slice(1).join(" ");
        if(!reason) return message.channel.send(`Merci de bien préciser la plainte pour pouvoir porter plainte contre l\'utilisateur **${target.user.tag}**\nUtilisation : \`fb!report [@mention] [plainte]\`.`).then(sent => sent.delete({timeout: 5e3}))
     
     
        message.channel.send("Votre plainte à été envoyer au fondateurs et modérateurs, ils régleront sa le plus vite possible.").then(sent => sent.delete({timeout: 5e3}))
        message.guild.channels.cache.find(channel => channel.id === "817397044158398497").send(new Discord.MessageEmbed()
        .setTitle(`Plainte de ${message.author.tag}`)
        .setColor("#e84211")
        .addField(`Plainte de :`,`\`${message.author.tag}\``)
        .addField(`Porte plainte contre :`,`\`${target.user.tag}\``)
        .addField(`Raison :`,`\`${reason}\``)).then(async msg => {
            msg.react("✅")
            msg.react("➖")
            msg.react("❌")
        })
    },
    name: 'report',
    guildOnly: true,
    help : {
        description: "Porter plainte contre quelqu'un",
        syntax: "[@mention] [plainte]"
    }
}
