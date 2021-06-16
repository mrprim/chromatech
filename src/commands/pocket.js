import { DataResolver } from 'discord.js'
import { read, write } from '../data'

const emptyPocket = { contents: [] }

const pocket = {
  name: 'pocket',
  description: '',
  aliases: ['store'],
  execute: async (msg, args) => {
    const fileName = `pocket.${msg.author.id}.json`

    const data = { ...JSON.parse(read(fileName) || '{}'), ...emptyPocket }
    data.contents.push(args.join(' '))
    write(fileName, data)

    msg.author.send(`Your pockets contain: ${data.contents.join(', ')}`)
  }
}

export default pocket