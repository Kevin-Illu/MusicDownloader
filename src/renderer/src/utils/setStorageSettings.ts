import { ISettingsState } from '@renderer/context/settings/SettingsReducer'

export const setSettingsPropertys = (settings: ISettingsState): void => {
  localStorage.setItem('settings', JSON.stringify(settings))
}
