const Discord = require("discord.js")
const config = require("../config.json")
const pagination = require("discord.js-pagination")

module.exports = {
    run: (message, args, client) => {
        if (args[0]) {
            const command = client.commands.get(args[0].toLowerCase())
            if (!command || !command.help) return message.channel.send("Cette commande n'existe pas.")
            message.channel.send(new Discord.MessageEmbed()
            .setDescription(`Commande : **${command.name}**\n\n${command.help.description}\n\nSyntaxe : \`${config.prefix}${command.name} ${command.help.syntax ? `${command.help.syntax}` : " "}\``)
            .setFooter("[] = Obligatoire\n<> = Facultatif"))
        }
        else {
            if (!message.member.hasPermission('BAN_MEMBERS'))
            const page1 = new Discord.MessageEmbed()
            .setTitle("Liste des commandes")
            .setDescription(`Pour plus d'info sur une commande tapez \`${config.prefix}help [nom de la commande]\``)
            .addField("Sommaire", "Page 1 : **Sommaire**\nPage 2 : **⚙️Administration**\nPage 3 : **🎉Amusement**\nPage 4 : **📸 Image**\nPage 5 : **🎵 Musique**\nPage 6 : **📡 Utilitaire**\nPage 7 : **📌Autre**\nPage 8 : **🔗 Lien utile**")
            .setColor('#142c96')
            .setTimestamp();

            const page2 = new Discord.MessageEmbed()
            .setTitle('⚙️ Administration :')
            .setDescription("Voici toutes les commandes d'administration")
            .addField('Liste des commandes', '**ban**: Banni l\'utilisateur mentionée\n\n**clear**: Supprime le nombre de message demander\n\n**kick**: Expulse le membre mentionné\n\n**mute**: Rend muet le membre mentionné\n\n**tempban**: Banni le membre mentionné pendant le temps donné\n\n**tempmute**: Rend muet le membre mentionné pendant le temps donné\n\n**unmute**: Réautorise le membre mentionné à parler\n\n**warn**: Avertit le membre mentionné *(lui envoie un message privé)*\n\n**unwarn**: Retire un warn au membre mentionné\n\n**infractions**: Affiche les infractions du membre mentionné\n\n**say**: Envoie un message via le bot',true)
            .setColor('#ff0707')
            .setTimestamp();

            const page3 = new Discord.MessageEmbed()
            .setTitle("🎉 Amusement")
            .setDescription("Voici toutes les commandes d'amusement")
            .addField('Liste des commandes', '**hug**: Faire un calin au membre mentionné\n\n**kiss**: Faire un bisous au membre mentionné\n\n**pat**: Tapoter le membre mentionné\n\n**slap**: Frapper le membre mentionné\n\n**smug**: Sourire où sourire au membre mentionné\n\n**tickle**: Chatoullier le membre mentionné\n\n**feed**: Manger ou donné à manger au membre mentionné\n\n**baka**: Insulter le membre mentionné\n\n**8ball**: Posser une question le bot vous répond', true)
            .setColor('#fab701')
            .setTimestamp();

            const page4 = new Discord.MessageEmbed()
            .setTitle("📸 Image")
            .setDescription("Voici toutes les commandes d'image")
            .addField('Liste des commandes','**fox_girl**: Envoie une image d\'une fille renarde\n\n**neko**: Envoie une image d\'une fille d\'animée\n\n**waifu**: Envoie une image d\'une fille d\'animée mignone\n\n**meow**: Miaou', true)
            .setColor('#5a127e')
            .setTimestamp();

            const page5 = new Discord.MessageEmbed()
            .setTitle("🎵 Musique")
            .setDescription("Voici toutes les commandes de musique")
            .addField('Liste des commandes', '**MERCI YOUTUBE, ON AS PLUS LE DROITS MAINTENANT, SALE MÉCHANT !!!**', true)
            .setColor('#216032')
            .setTimestamp();

            const page6 = new Discord.MessageEmbed()
            .setTitle("📡 Utilitaire")
            .setDescription("Voici toutes les commandes utile")
            .addField('Liste des commandes','**ticket**: Ouvre un ticket à votre nom\n\n**close**: Ferme votre ticket\n\n**report**: Avertir les modérateurs d\'une fautes commis par quelqu\'un', true)
            .setColor('#0e0e0e')
            .setTimestamp();

            const page7 = new Discord.MessageEmbed()
            .setTitle("📌 Autre")
            .setDescription("Voici toutes les autres commandes")
            .addField('Liste des commandes','**help**: Cette commande même\n\n**botinfo**: Donne des informations sur le bot\n\n**serverinfo**: Donne des informations sur le serveur\n\n**userinfo**: Donne des informations sur l\'utilisateur mentionné', true)
            .setColor('#acaeac')
            .setTimestamp();

            const page8 = new Discord.MessageEmbed()
            .setTitle("🔗 Lien utile")
            .setDescription("Voici tout les liens utile")
            .addField('Liste des liens','[Donne ton avis sur •|Fox Graff|•](https://top.gg/servers/731599872892993626)\n[Vote pour •|Fox Graff|•](https://top.gg/servers/731599872892993626)\n[Donne ton avis et note •|Fox Graff|• sur DISBOARD](https://disboard.org/fr/server/731599872892993626)', false)
            .setColor('#e1137a')
            .setTimestamp();

            const pages = [
                page1,
                page2,
                page3,
                page4,
                page5,
                page6,
                page7,
                page8
            ]

            const emoji = ["⬅️", "➡️"]

            

            pagination(message, pages, emoji)
            
        }
    },
    name: 'help',
    guildOnly: true,
    help : {
        description: "Affiche la page d'aide",
        syntax: "[nom de la commande]"
    }
}
