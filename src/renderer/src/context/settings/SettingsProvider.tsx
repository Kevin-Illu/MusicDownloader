import { useReducer, FC, useEffect } from 'react'
import { setSettingsPropertys, getStorageSettings } from '@renderer/utils'
import { ISettingsState, SettingsReducer } from './SettingsReducer'
import { SettingsContext } from './SettingsContext'

interface Props {
  children: React.ReactNode
}

const initialState: ISettingsState = {
  path: null,
  history: []
}

export const SettingsProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(SettingsReducer, initialState)

  const setDownloadPath = (path: string) => {
    const settings = getStorageSettings()
    dispatch({ type: '[SETTINGS] set path', payload: path })

    // if there are changes set to current settings
    const newSettings: ISettingsState = { ...settings }
    newSettings.path = path

    setSettingsPropertys(newSettings)
  }

  // initialize the state settings
  useEffect(() => {
    const settings = getStorageSettings()
    dispatch({ type: '[SETTINGS] set path', payload: settings.path })
  }, [])

  return (
    <SettingsContext.Provider
      value={{
        ...state,
        setDownloadPath
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}
