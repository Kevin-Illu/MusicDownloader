const ytsr = require('ytsr')
import { ResponseMusic } from '../types'
import { parseResponse } from '../utils'

export const getVideosByName = (name): Promise<ResponseMusic> => {
  return new Promise((resolve, reject) => {
    ytsr(name, { page: 1 })
      .then((results) => {
        const songs = results.items.filter((item) => item.type === 'video')
        const parsedResponse = parseResponse(songs)

        resolve(parsedResponse)
      })
      .catch((err) => reject(err))
  })
}
