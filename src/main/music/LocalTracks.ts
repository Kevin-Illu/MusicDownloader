import path from 'path'
import NodeID3 from 'node-id3'
import fs from 'fs'

import { store } from '..'

interface Image {
  mime: string
  type: {
    id: number
    name: string
  }
  description?: string
  imageBuffer: Buffer
}

interface Metadata {
  namefile: string
  title?: string
  artist?: string
  album?: string
  year?: string
  comment?: string
  trackNumber?: string
  genre?: string
  image?: Image
}

interface GetListOfLocalTracksResponse {
  err: Error | null
  response: Metadata[] | null
}

export function getListOfLocalTracks(): Promise<GetListOfLocalTracksResponse> {
  return new Promise((resolve, reject) => {
    const localPath = store.get('localTracks') as string
    const absolutePath = path.resolve(localPath)

    fs.readdir(absolutePath, (err, files) => {
      if (err) {
        console.error('Could not find local tracks')
        reject({
          err: err,
          response: null
        })
      }

      const mp3files = files.filter((file) => path.extname(file).toLowerCase() === '.mp3')
      const metadata = mp3files.map((file) => {
        const filePath = path.join(absolutePath, file)
        const tags = NodeID3.read(filePath)
        const comment = tags.comment ? tags.comment.language + ': ' + tags.comment.text : undefined
        const metadata: Metadata = {
          namefile: file,
          title: tags.title,
          artist: tags.artist,
          album: tags.album,
          year: tags.year,
          comment: comment,
          trackNumber: tags.trackNumber,
          genre: tags.genre,
          image: tags.image
            ? {
                mime: tags.image.mime,
                type: {
                  id: tags.image.type.id,
                  name: tags.image.type.name
                },
                description: tags.image.description,
                imageBuffer: Buffer.from(tags.image.imageBuffer)
              }
            : undefined
        }

        return metadata
      })

      resolve({
        err: err,
        response: metadata
      })
    })
  })
}

export function addMetadataToSong(songName: string, metadata: NodeID3.Tags) {
  return new Promise((resolve, reject) => {
    try {
      const localPath = store.get('localTracks') as string
      const absolutePath = path.resolve(localPath)

      const filePath = path.join(absolutePath, songName)
      const tags = NodeID3.read(filePath)

      const updatedTags = { ...tags, ...metadata }
      NodeID3.write(updatedTags, filePath)

      resolve({
        err: null,
        response: 'success'
      })
    } catch (err) {
      reject({
        err: err,
        response: null
      })
    }
  })
}
