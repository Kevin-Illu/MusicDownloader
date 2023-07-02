import { FC, useContext } from 'react'
import { MusicItem } from './MusicItem'
import { MusicContext } from '@renderer/context/music/MusicContext'

export const MusicList: FC = () => {
  const { music } = useContext(MusicContext)!

  return (
    <>
      <div className="grid grid-cols-8">
        <div className="col-span-1"></div>
        <div className="col-span-3 pl-6">#Title</div>
        <div className="col-span-2 pl-6 flex flex-col items-end pr-2">Time</div>
        <div className="col-span-2 pl-6"></div>
      </div>
      <ol className="list-decimal list-inside flex flex-col pb-8">
        {music!.map((song) => (
          <MusicItem key={song.id} song={song} />
        ))}
      </ol>
    </>
  )
}
