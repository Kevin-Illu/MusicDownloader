import { createContext } from 'react'

export interface ISettings {
  path: string | null
  setDownloadPath: (path: string) => void
}

export const SettingsContext = createContext({} as ISettings)
