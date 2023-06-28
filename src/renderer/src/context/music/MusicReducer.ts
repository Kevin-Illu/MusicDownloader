import { Music } from 'src/main/types'
import { MusicAction, SET_MUSIC_LIST } from './Actions'

export interface MusicState {
  music: Music[] | null
}

export const MusicReducer = (state: MusicState, action: MusicAction): MusicState => {
  switch (action.type) {
    case SET_MUSIC_LIST:
      return {
        ...state,
        music: action.payload
      }
  }
}
