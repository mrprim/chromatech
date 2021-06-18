import 'regenerator-runtime'
import Discord from 'discord.js'
import getSecret from './utils/getSecret'
import logger from './utils/logger'
import onReady from './handlers/onReady'
import onMessage from './handlers/onMessage'
import onReaction from './handlers/onReaction'
// import onDisconnect from './handlers/onDisconnect'
// import onGuildCreate from './handlers/onGuildCreate'
// import onGuildDelete from './handlers/onGuildDelete'

const start = () => {
  const token = getSecret('token')
  console.log('TOKEN', token)
  if (!token) {
    logger.error('FAILED_TO_START: MISSING_TOKEN')
    return
  }

  const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] })

  client.on('ready', () => onReady(client))

  client.on('message', onMessage)

  client.on('messageReactionAdd', onReaction)

  // client.on('disconnect', onDisconnect)

  // client.on('guildCreate', onGuildCreate)

  // client.on('guildDelete', onGuildDelete)

  client.login(token).catch(console.log)
}

start()