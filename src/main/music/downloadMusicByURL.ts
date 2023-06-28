const fs = require('fs')
const ytdl = require('ytdl-core')

export function downloadMusicByURL(url: string, filename: string, path: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const audio = ytdl(url, { filter: 'audioonly' })
    audio.pipe(fs.createWriteStream(`${path}\\${filename}.mp3`))
    audio.on('end', () => {
      resolve('downloaded')
    })
    audio.on('error', (error) => {
      reject(error)
    })
  })
}
