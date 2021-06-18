import * as buttons from '../buttons'

const onClick = btn => {
  const args = btn.id.split('_')
  const name = args.shift()

  console.log(name)
  console.log(buttons)
  if (!buttons[name]) {
    return
  }
  console.log('GO')

  buttons[name].execute(btn, ...args)
}

export default onClick