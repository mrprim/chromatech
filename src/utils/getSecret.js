import { readFileSync } from 'fs'
import path from 'path'
import logger from './logger'

const getSecret = name => {
  const file = path.resolve(__dirname, `../../secrets/${name}`)
  const options = { encoding: 'utf8', flag: 'r' }

  try {
    const data = readFileSync(file, options)
    return data
  } catch (e) {
    logger.error(`SECRET_FILE_NOT_FOUND: "${file}"`)
  }
}

export default getSecret