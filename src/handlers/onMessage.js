import * as commands from '../commands'

const PREFIX = 'd'


const getArgs = msg => {
  const args = msg.content.split(/\s+/)

  if (msg.channel.type === 'dm') {
    return args
  }

  const prefix = args.shift()
  const mentionId = msg.client.user.id

  if ([PREFIX, `<@!${mentionId}>`, `<@${mentionId}>`].includes(prefix)) {
    return args
  }
}

const onMessage = async msg => {
  msg = await msg.partial ? msg.fetch() : msg

  if (msg.author.bot) return

  const args = getArgs(msg)
  if (!args) return

  const name = args.shift().toLowerCase()
  const command = commands[name] || Object.values(commands).find(c => c.aliases?.includes(name))

  if (!command?.execute) return

  try {
    await command.execute(msg, args)
  } catch (e) {
    console.log(e)
  }
}

export default onMessage