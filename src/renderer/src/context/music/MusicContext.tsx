import { createContext } from 'react'
import { Music } from 'src/main/types'

interface IMusicContext {
  music: Music[] | null
  setMusic: (music: Music[]) => void
}

export const MusicContext = createContext({} as IMusicContext)
