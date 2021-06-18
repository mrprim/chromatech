import { read, write } from './index'

export const get = guildId => {
  console.log('guildId', guildId)
  const file = read('guild_' + guildId + '.json')
  console.log('file', file)
  if (!file) return

  return JSON.parse(file)
}

export const upsert = (guildId, data) => {
  write('guild_' + guildId + '.json', data)
}