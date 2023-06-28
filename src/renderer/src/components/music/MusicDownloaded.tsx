import { getStorageSettings } from '@renderer/utils'
import { SingleSong } from './SingleSong'

// TODO: make the list as a reusable component
export const MusicDownloaded = () => {
  const { history } = getStorageSettings()
  return (
    <div className="">
      <div className="grid grid-cols-8">
        <div className="col-span-1"></div>
        <div className="col-span-3 pl-6">#Title</div>
        <div className="col-span-2 pl-6">#Time</div>
        <div className="col-span-2 pl-6">#Download</div>
      </div>
      <ol className="list-decimal list-inside gap-4 flex flex-col">
        {history!.map((song) => (
          <SingleSong key={song.id} song={song} />
        ))}
      </ol>
    </div>
  )
}
