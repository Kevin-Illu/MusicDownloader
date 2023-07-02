import { useState } from 'react'

import { useMusic } from '@renderer/hooks'
import { MusicList, MusicListSkeleton, NavBar } from '@renderer/components'

export const MusicHome = () => {
  const { music: musicLoaded } = useMusic()
  const [isMusicListLoading, setIsMusicListLoading] = useState(false)
  let ComponentToRender: React.ReactElement | null = null

  if (isMusicListLoading) {
    ComponentToRender = <MusicListSkeleton />
  } else if (musicLoaded) {
    ComponentToRender = <MusicList />
  } else {
    ComponentToRender = <p>hola :D</p>
  }

  return (
    <div className="bg-white relative">
      <NavBar setIsLoading={setIsMusicListLoading} />
      <div className="container mx-auto my-0 mt-4">{ComponentToRender}</div>
    </div>
  )
}
