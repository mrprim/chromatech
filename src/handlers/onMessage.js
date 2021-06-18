import { Emoji, Message } from 'discord.js'
import * as commands from '../commands'
import svgToFile from '../utils/svgToFile'
import Vibrant from 'node-vibrant'

const PREFIX = 'g'


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

  if (msg.attachments.size) {
    onMessageWithAttachment(msg)
  }

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

const onMessageWithAttachment = async msg => {
  const url = msg.attachments.find(a => a.url).url
  const palette = await Vibrant.from(url).getPalette()
  const swatches = Object.values(palette)
  const width = 20

  let svg = `<svg class="Icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${swatches.length * width} 20">`

  for (let i = 0; i < swatches.length; i++) {
    svg += `<rect x="${width * i}" y="0" height="20" width="${width}" fill="${swatches[i].getHex()}"></rect>`
  }
  svg += '</svg>'

  const file = await svgToFile(svg, { width: swatches.length * width * 3, height: 60 })
  await msg.reply({ files: [file] })
}

export default onMessage