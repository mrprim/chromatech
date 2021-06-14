import { log } from '../utils/logger'

const onReady = client => {
  // registerInteractions(client)
  log('BOT_READY')
}

const registerInteractions = client => {

  client.api.applications(client.user.id).commands.post({
    data: {
      name: "hello",
      description: "hello world command"
      // possible options here e.g. options: [{...}]
    }
  })


  client.ws.on('INTERACTION_CREATE', async interaction => {
    const command = interaction.data.name.toLowerCase();
    const args = interaction.data.options;

    if (command === 'hello') {
      // here you could do anything. in this sample
      // i reply with an api interaction
      client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
          type: 4,
          data: {
            content: "hello world!!!"
          }
        }
      })
    }
  });
}

export default onReady