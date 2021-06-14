import { fabric } from 'fabric'
import { MessageAttachment } from 'discord.js'

const defaults = {
  width: 375,
  height: 375,
  format: 'png'
}

const svgToFile = async (svg, convertOptions = {}) => {
  const canvas = new fabric.Canvas('image');
  convertOptions = { ...defaults, ...convertOptions }

  let data

  await fabric.loadSVGFromString(svg, (objects, options) => {
    var el = fabric.util.groupSVGElements(objects, options);
    el.scaleToWidth(convertOptions.width);
    el.scaleToHeight(convertOptions.height);
    canvas.add(el)
    data = canvas.toDataURL(convertOptions).split(',')[1]
  })

  const buf = new Buffer.from(data, 'base64')

  return new MessageAttachment(buf, `img.${convertOptions.format}`)
}

export default svgToFile