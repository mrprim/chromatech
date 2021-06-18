import { get, upsert } from '../data/guild'

const setRecipient = {
  execute: (btn, guildId, value) => {
    const guildSettings = get(guildId) || {}

    guildSettings.response = value
    upsert(guildId, guildSettings)

    btn.reply.send('Recipient set to `' + value + '`')
  }
}

export default setRecipient