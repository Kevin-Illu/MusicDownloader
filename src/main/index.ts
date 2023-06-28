import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { downloadMusicByURL, getVideosByName } from './music'
import { DOWNLOAD_MUSIC_ACTION, GET_MUSIC_BY_NAME_ACTION, SET_PATH_ACTION } from '../preload/api'
import { getPathFromDevice } from './music'

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    // show the dev tools window
    vibrancy: 'window',
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  ipcMain.handle(SET_PATH_ACTION, async () => {
    console.log('getting path from ipc')
    return await getPathFromDevice(mainWindow)
  })

  mainWindow.webContents.openDevTools()

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  ipcMain.handle(GET_MUSIC_BY_NAME_ACTION, async (_, name: string) => {
    console.log('executing....')
    try {
      const result = await getVideosByName(name)
      console.log('executed.')
      return result
    } catch (err) {
      console.error('Failed to get videos')
      console.error('the name of the video is required Dx')
      return err
    }
  })

  ipcMain.handle(DOWNLOAD_MUSIC_ACTION, async (_, { url, filename, path }) => {
    try {
      const result = await downloadMusicByURL(url, filename, path)
      return result
    } catch (err) {
      return null
    }
  })

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in sepa`rate files and require them here.
