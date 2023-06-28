import { useState, useEffect, useContext } from 'react'
import { MusicContext } from '@renderer/context/music/MusicContext'

import { ResponseMusic } from 'src/main/types'

export const useMusic = () => {
  const getVideosByName = window.api.getVideosByName
  const { music, setMusic } = useContext(MusicContext)
  const [metadata, setMetadata] = useState<ResponseMusic>()
  const [musicRequest, setMusicRequest] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleGetSongs = (requestedSong: string) => {
    getVideosByName(requestedSong)
      .then((res) => {
        setMetadata(res!)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error(error)
        setIsLoading(false)
      })
  }

  useEffect(() => {
    // If the song has already been requested
    if (musicRequest !== '') {
      setIsLoading(true)
      handleGetSongs(musicRequest.trim())
    }
  }, [musicRequest, setMusicRequest])

  useEffect(() => {
    if (metadata?.resolved && metadata.message === 'OK') {
      setMusic(metadata.response)
    }
  }, [metadata])

  return {
    setMusicRequest,
    isLoading,
    music
  } as const
}
