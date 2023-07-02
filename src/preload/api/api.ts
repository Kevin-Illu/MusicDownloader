import { IPublicAPI } from '../types'
import { ipcRenderer } from 'electron'
import { DownloadMusicSettings } from '../types'

export const GET_MUSIC_BY_NAME_ACTION = 'music:getVideosByName'
export const DOWNLOAD_MUSIC_ACTION = 'music:downloadMusicByURL'
export const SET_PATH_ACTION = 'music:getPathFromDevice'

export const publicAPI: IPublicAPI = {
  getVideosByName: (name: string): Promise<void> => {
    return ipcRenderer.invoke(GET_MUSIC_BY_NAME_ACTION, name)
  },
  downloadMusicByURL: (settings: DownloadMusicSettings): Promise<void> => {
    return ipcRenderer.invoke(DOWNLOAD_MUSIC_ACTION, settings)
  },
  getPathFromDevice: (): Promise<string[]> => {
    return ipcRenderer.invoke(SET_PATH_ACTION)
  }
}
