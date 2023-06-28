import { MusicData, Music, ResponseMusic } from '../types'

export const parseResponse = (response): ResponseMusic => {
  // get unique videos from response music data
  const uniqueVideos = Array.from(new Set(response.map(({ id }) => id))).map((id) =>
    response.find((song: Music) => song.id === id)
  )

  if (response.length === 0) {
    return {
      message: 'Not Found',
      resolved: false,
      response: response
    }
  }

  return {
    message: 'OK',
    resolved: true,
    response: getMetadata(uniqueVideos)
  }
}

const getMetadata = (allVideos: MusicData[]): Music[] => {
  const metadata = allVideos.map(
    ({ type, title, id, url, bestThumbnail, author, views, duration }) => {
      return {
        type,
        title,
        id,
        url,
        bestThumbnail,
        author,
        views,
        duration
      }
    }
  )
  return metadata
}
