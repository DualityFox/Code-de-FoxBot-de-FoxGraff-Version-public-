const message = require("./commands/say")

const Discord = require(`discord.js`),
client = new Discord.Client(),
config = require("./config.json"),
fs = require(`fs`)

client.login(config.token)
client.commands = new Discord.Collection()
client.db = require('./db.json')

fs.readdir('./commands', (err, files) => {
    if (err) throw err
    files.forEach(file => {
        if (!file.endsWith('.js')) return
        const command = require(`./commands/${file}`)
        client.commands.set(command.name, command)
    })
})

client.on('message', message => {
    if (message.type !== 'DEFAULT' || message.author.bot) return

    const args = message.content.trim().split(/ +/g)
    const commandName = args.shift().toLowerCase()
    if(!commandName.startsWith(config.prefix)) return
    const command = client.commands.get(commandName.slice(config.prefix.length))
    if (!command) return message.channel.send(`La commande \`${message.content}\` n'a pas était trouvé !`)
    if (command.guildOnly && !message.guild) return message.channel.send('Je ne répond pas au commande en mp !')
    command.run(message, args, client)
})

//Message d'accueil aléatoire
client.on(`guildMemberAdd`, member => { replies = [`${member} ! Bienvenue sur •|Fox Graff|• !`, `Accueillions tous ${member} qui débarque sur •|Fox Graff|• !`, `Oh ! Un(e) petit(e) nouveau(elle) !\nBienvenue à toi ${member} !`, `${member}, bonjour, passe un bon moment sur •|Fox Graff|• !`,`Salutation à toi, ${member} !`]
   member.guild.channels.cache.find(channel => channel.id === "814123969359249460").send(`${replies[Math.floor(Math.random() * replies.length)]}`)
})

//Message de départ aléatoire
client.on(`guildMemberRemove`, member => { replies = [`${member.user.tag} a quitté le serveur... 😢`, `Au revoir ${member.user.tag}...`, `${member.user.tag} est parti...\nBye...`, `${member.user.tag} est parti.\nReviens quand tu veux`]
    member.guild.channels.cache.find(channel => channel.id === "814123969359249460").send(`${replies[Math.floor(Math.random() * replies.length)]}`)
})

client.on( 'ready', () => {
    client.user.setStatus("dnd")
    const statuses = [
        () => `•|Fox Graff|•`,
        () => `${client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0) - 22} membres sur •|Fox Graff|• !`,
        () => `Invite tes amis sur •|Fox Graff|•`,
        () => `Nounard de retour sur Discord et •|Fox Graff|• ❤`,
        () => `Je suis un robot déguisé en renard déguisé en robot !`,
        () => `Mon préfix est fb!`,
        
    ]
    let i = 0
    setInterval(() => {
        client.user.setActivity(statuses[i](), {type: `WATCHING`,})
        i = ++i % statuses.length
    },1e4)
})

client.on('channelCreate', channel => {
    if (!channel.guild) return
    const muteRole = channel.guild.roles.cache.find(role => role.name === 'Muted by •|Fox Bot|•')
    if (!muteRole) return
    channel.createOverwrite(muteRole, {
        SEND_MESSAGES: false,
        CONNECT: false,
        ADD_REACTIONS: false
    })
})

client.on('message', message => {
    if (message.content === "@everyone") return message.channel.send(`\`${message.author.tag}\`, il est interdit de mentionner everyone\n\`(sauf si tu est DualityFox#0018 où DualityFox 2#0018)\``)
    if (message.content === "@•|Fox Bot|•") return message.channel.send(`${message.author.tag}, mon préfix est \`fb!\``)
    if (message.content === "<@813734273894842370>") return message.channel.send(`${message.author.tag}, mon préfix est \`fb!\``)
})
