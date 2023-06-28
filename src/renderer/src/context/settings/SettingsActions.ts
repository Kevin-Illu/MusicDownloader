export const SET_PATH = '[SETTINGS] set path'
export interface SetPathAction {
  type: typeof SET_PATH
  payload: string | null
}

export type SettingsAction = SetPathAction
