import { dialog } from 'electron'

// return the path where the user saved your music files :D
export const getPathFromDevice = (mainWindow): Promise<string[]> => {
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
