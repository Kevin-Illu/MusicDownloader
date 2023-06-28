import { ipcRenderer } from 'electron'
import { DownloadMusicSettings } from '../types'
import { DOWNLOAD_MUSIC_ACTION, GET_MUSIC_BY_NAME_ACTION, SET_PATH_ACTION } from './api'

// TODO: convert to object of actions to avoid circular dependency
export const getVideosByName = (name: string): Promise<void> => {
  return ipcRenderer.invoke(GET_MUSIC_BY_NAME_ACTION, name)
}

export const downloadMusicByURL = (settings: DownloadMusicSettings): Promise<void> => {
  return ipcRenderer.invoke(DOWNLOAD_MUSIC_ACTION, settings)
}

export const getPathFromDevice = (): Promise<string[]> => {
  return ipcRenderer.invoke(SET_PATH_ACTION)
}
