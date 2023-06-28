import { FC, useContext, useState } from 'react'
import { Music } from 'src/main/types'

// TODO: Remove this unused components and delete the files below
// import { AuthorSongInformation } from './AuthorSongInformation'
// import { SongDuration } from './SongDuration'
import { SettingsContext } from '@renderer/context/settings/SettingsContext'
import { useLoadingStates } from '@renderer/hooks'
import { getStorageSettings, setSettingsPropertys } from '@renderer/utils'

interface Props {
  song: Music
}

export const SingleSong: FC<Props> = ({ song }) => {
  const { path } = useContext(SettingsContext)!
  const downloadSong = window.api.downloadMusicByURL

  // song data from the request
  const { id, title, views, duration, author, bestThumbnail, url } = song
  const { height, url: imageUrl, width } = bestThumbnail
  const parsedViews = views.toLocaleString()

  // song download request state
  const [isDownloaded, setIsDownloaded] = useState<string | null>(null)
  const {
    state: downloadButtonText,
    setIsLoading,
    isLoading
  } = useLoadingStates({
    normal: 'Download',
    whileRunning: 'Downloading...',
    whenFinished: 'Done!',
    statusResponse: isDownloaded
  })

  const handleClick = () => {
    setIsLoading(true)
    downloadSong({ url, filename: title, path: path! })
      .then((res) => {
        setIsLoading(false)
        setIsDownloaded(res!)
        addDownloadedSongToHistory(song)
      })
      .catch((err) => {
        setIsLoading(false)
        setIsDownloaded('error')
        console.error(err)
      })
  }

  const addDownloadedSongToHistory = (currentSong: Music) => {
    const settings = getStorageSettings()
    const newSettings = { ...settings }

    const isAleradyInHistory = newSettings.history.some((song) => song.id === currentSong.id)

    if (!isAleradyInHistory) {
      newSettings.history.push(currentSong)
    }

    setSettingsPropertys(newSettings)
  }

  return (
    <li key={id} className="grid grid-cols-8">
      <div className="col-span-1 grid place-items-center">
        <img loading="lazy" src={imageUrl} width={width} height={height} alt={title} />
      </div>
      <div className="col-span-3 flex justify-center flex-col pl-6">
        <p>{title}</p>
        <p>
          <small>{author.name}</small>
        </p>
        <p>
          <small>views: {parsedViews}</small>
        </p>
      </div>
      <div className="col-span-2 flex justify-center flex-col pl-6">{duration}</div>
      <div className="col-span-2 pl-6 flex items-center">
        <button
          className="w-fit bg-green-800 text-white py-4 px-6 rounded-full hover:bg-green-700 disabled:bg-green-300 disabled:cursor-wait"
          onClick={handleClick}
          disabled={isLoading}
        >
          {downloadButtonText}
        </button>
      </div>
    </li>
  )
}
