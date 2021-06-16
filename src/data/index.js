import fs from 'fs'
import path from 'path'

const cache = {}

const cacheFile = (fileName, contents) => {
  cache[fileName] = { contents, cacheTime: Date.now() }
}

export const read = fileName => {
  if (cache[fileName]) return cache[fileName].contents

  const location = path.resolve(__dirname, `../../storage/${fileName}`)
  const options = { encoding: 'utf8', flag: 'r' }
  try {
    const contents = fs.readFileSync(location, options)
    cacheFile(fileName, contents)
    return contents
  } catch (ignore) { }
}

export const write = (filename, contents) => {
  if (typeof contents === 'object') {
    contents = JSON.stringify(contents)
  }

  cacheFile(filename, contents)

  const location = path.resolve(__dirname, '../../storage/', filename)
  const options = { encoding: 'utf8' }
  return fs.writeFileSync(location, contents, options)
}

export const remove = filename => {
  delete cache[filename]
  const location = path.resolve(__dirname, '../../storage/', filename)
  return fs.unlinkSync(location)
}