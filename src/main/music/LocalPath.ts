import { dialog } from 'electron'
import { store } from '..'

// return the path where the user saved your music files :D
export const setPathFromDevice = (mainWindow): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    dialog
      .showOpenDialog(mainWindow, {
        message: 'choose a folder to save your music',
        properties: ['openDirectory']
      })
      .then((result) => {
        resolve(result.filePaths)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export const getPathFromDevice = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    const path: string = store.get('localTracks') as string
    console.log(path)
    resolve(path)
    reject('')
  })
}
