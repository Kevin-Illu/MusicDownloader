import { ElectronAPI } from '@electron-toolkit/preload'
import { GET_MUSIC_BY_NAME_ACTION, DOWNLOAD_MUSIC_ACTION } from './api'

declare global {
  interface Window {
    electron: ElectronAPI
    api: IPublicAPI
  }
}

export interface IPublicAPI {
  getVideosByName: (name: string) => Promise<void>
  downloadMusicByURL: (settings: DownloadMusicSettings) => Promise<void>
  getPathFromDevice: () => Promise<styring[]>
}

export type API_MUSIC_ACTION = typeof GET_MUSIC_BY_NAME_ACTION | typeof DOWNLOAD_MUSIC_ACTION

export interface DownloadMusicSettings {
  url: string
  filename: string
  path: string
}
