const Discord =require("discord.js");
const moment = require("moment");

module.exports = {
    run: (message, args, client) => {
        let member = message.member;
        if (args[0]) member = message.guild.member(message.mentions.users.first())
        let user = member.user;
        return message.channel.send(new Discord.MessageEmbed()
        .setDescription(`Information sur **${user.username}**`)
        .setThumbnail(user.displayAvatarURL())
        .addField('Mention :',`<@${user.id}>`,true)
        .addField('Surnom :', `${member.nickname === undefined ? ` ` : `${member.nickname}`}`,true)
        .addField('Tag :',`${user.tag}`,true)
        .addField('ID :',`${user.id}`,true)
        .addField('Bot :',`${user.bot ? 'Oui': 'Non'}`,true)
        .addField('Statut :',`${user.presence.status.toUpperCase()}`,true)
        .addField('Compte crée le :',`${moment(user.createdAt).format('LLL')}`, true)
        .addField("Date d'arrivée :",`${moment(member.joinedAt).format('LLL')}`, true)
        .addField(`\u200b`,`\u200b`, true)
        .addField("Rôle :",`${member.roles.cache.filter(r => r.name !== "@everyone").map(roles => `<@&${roles.id}>`).join('\n')}`, true)
        .setFooter(`Information sur ${user.username}`)
        .setTimestamp()
        )

    },
    name: 'userinfo',
    guildOnly: true,
    help : {
        description: "Donne des infos sur le membre mentionné",
        syntax: "[@mention]"
    }
}
