import { Music } from 'src/main/types'
import { SET_PATH, SettingsAction } from './SettingsActions'

export interface ISettingsState {
  path: string | null
  history: Music[]
}

export const SettingsReducer = (state: ISettingsState, action: SettingsAction) => {
  switch (action.type) {
    case SET_PATH:
      return {
        ...state,
        path: action.payload
      }
  }
}
