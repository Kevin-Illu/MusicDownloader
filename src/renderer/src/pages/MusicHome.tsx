import { useState } from 'react'
import { useMusic } from '@renderer/hooks'
import { getStorageSettings } from '@renderer/utils'
import { NavBar, MusicList, MusicListSkeleton, MusicDownloaded } from '@renderer/components'

// TODO: fix the initial page rendering to set a default initial page before loading
export const MusicHome = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { music } = useMusic()
  const { history } = getStorageSettings()

  // when the music list is already full
  const musicListIsAlreadyLoaded = !isLoading && music !== null

  // if the request to get the music list is loading
  const musicListIsLoading = isLoading

  // when there are no music and the load state is false and has a history
  const hasHistory = history !== null && history.length > 0 && !isLoading && !music

  return (
    <div className="bg-white relative h-screen">
      <NavBar setIsLoading={setIsLoading} />
      {/* TODO: fix this issue xD */}
      <div className="container mx-auto my-0">
        {/* if the music is loaded then show the music list */}
        {musicListIsAlreadyLoaded && <MusicList />}

        {/* if music request is loading then show the skeleton */}
        {musicListIsLoading && <MusicListSkeleton />}

        {/* if has history and not music and not is loading the show history first */}
        {hasHistory ? <MusicDownloaded /> : null}
      </div>
    </div>
  )
}

//  ;<div className="pt-20 pb-10">
//    <div className="text-8xl p-0 font-semibold text-center">
//      <h1 className="p-0 m-0">
//        To get started search your favorite track or artist like{' '}
//        <span className="font-bold">{'Drake'}</span> :-)
//      </h1>
//    </div>
//  </div>
