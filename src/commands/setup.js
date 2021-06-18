import { DataResolver, MessageEmbed } from 'discord.js'
import { MessageButton } from 'discord-buttons'
import { read, write } from '../data'

const setup = {
  name: 'setup',
  description: '',
  execute: async (msg, args) => {
    const command = args[0]
    if (!command) return

    if (command === 'responses') {
      if (!msg.guild) return

      const embed = new MessageEmbed()
      embed.setColor('#0099ff')
      embed.setTitle('Response Setup')
      embed.addFields(
        { name: 'Click "DM"', value: 'To receive responses as a DM' },
        { name: 'Click "Reply"', value: 'To receive responses as replies in the channel they were generated in' },
        { name: 'Click "Channel"', value: 'To receive responses in a specified channel' }
      )

      const eventName = 'setRecipient_' + msg.guild.id + '_'

      const button1 = new MessageButton()
      button1.setLabel("DM")
      button1.setStyle("blurple")
      button1.setID(eventName + "dm")

      const button2 = new MessageButton()
      button2.setLabel("Reply in Channel")
      button2.setStyle("blurple")
      button2.setID(eventName + "reply")

      msg.author.send({ embed, buttons: [button1, button2] })
    }
  }
}

export default setup