import { IPublicAPI } from '../types'
import { downloadMusicByURL, getVideosByName, getPathFromDevice } from './musicActions'

export const GET_MUSIC_BY_NAME_ACTION = 'music:getVideosByName'
export const DOWNLOAD_MUSIC_ACTION = 'music:downloadMusicByURL'
export const SET_PATH_ACTION = 'music:getPathFromDevice'

export const publicAPI: IPublicAPI = {
  getVideosByName,
  downloadMusicByURL,
  getPathFromDevice
}
