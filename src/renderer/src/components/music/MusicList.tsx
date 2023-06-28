import { FC, useContext } from 'react'
import { SingleSong } from './SingleSong'
import { MusicContext } from '@renderer/context/music/MusicContext'

// TODO: add the list to a reusable component
export const MusicList: FC = () => {
  const { music } = useContext(MusicContext)!

  return (
    <div>
      <div className="grid grid-cols-8">
        <div className="col-span-1"></div>
        <div className="col-span-3 pl-6">#Title</div>
        <div className="col-span-2 pl-6">#Time</div>
        <div className="col-span-2 pl-6">#Download</div>
      </div>
      <ol className="list-decimal list-inside gap-4 flex flex-col">
        {music!.map((song) => (
          <SingleSong key={song.id} song={song} />
        ))}
      </ol>
    </div>
  )
}
