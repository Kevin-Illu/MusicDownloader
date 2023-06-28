import { ISettingsState } from '@renderer/context/settings/SettingsReducer'

export const getStorageSettings = (): ISettingsState => {
  const localSettings = JSON.parse(localStorage.getItem('settings') || '{}')

  if (Object.keys(localSettings).length === 0) {
    return {
      path: null,
      history: []
    }
  }

  return localSettings
}
