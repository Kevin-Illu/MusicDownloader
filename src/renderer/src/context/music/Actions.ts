import { Music } from 'src/main/types'

export const SET_MUSIC_LIST = '[MUSIC] - set list of songs'

export interface SetMusicListAction {
  type: typeof SET_MUSIC_LIST
  payload: Music[]
}

export type MusicAction = SetMusicListAction
