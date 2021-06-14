import path from 'path'

const poke = {
  name: 'poke',
  description: '',
  aliases: ['bowl', 'send'],
  execute: (msg, args) => {
    const file = path.join(__dirname, '../../static/poke.jpg')
    msg.channel.send({ files: [file] })
  }
}

export default poke