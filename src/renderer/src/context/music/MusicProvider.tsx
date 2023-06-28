import { useReducer, FC } from 'react'
import { MusicReducer, MusicState } from './MusicReducer'
import { MusicContext } from './MusicContext'
import { Music } from 'src/main/types'

interface Props {
  children: React.ReactNode
}

const INITIAL_STATE: MusicState = {
  music: null
}

export const MusicProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(MusicReducer, INITIAL_STATE)

  const setMusic = (music: Music[]) => {
    dispatch({ type: '[MUSIC] - set list of songs', payload: music })
  }

  return (
    <MusicContext.Provider
      value={{
        ...state,
        setMusic
      }}
    >
      {children}
    </MusicContext.Provider>
  )
}
