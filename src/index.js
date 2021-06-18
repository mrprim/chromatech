import 'regenerator-runtime'
import Discord from 'discord.js'
import disbut from 'discord-buttons'
import getSecret from './utils/getSecret'
import logger from './utils/logger'
import onReady from './handlers/onReady'
import onClick from './handlers/onClick'
import onMessage from './handlers/onMessage'
import onReaction from './handlers/onReaction'

const start = () => {
  const token = getSecret('token')
  if (!token) {
    logger.error('FAILED_TO_START: MISSING_TOKEN')
    return
  }

  const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] })

  disbut(client)

  client.on('ready', () => onReady(client))

  client.on('message', onMessage)

  client.on('messageReactionAdd', onReaction)

  client.on('clickButton', onClick)

  // client.on('disconnect', onDisconnect)

  // client.on('guildCreate', onGuildCreate)

  // client.on('guildDelete', onGuildDelete)

  client.login(token).catch(console.log)
}

start()