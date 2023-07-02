import { FC, useContext, useState } from 'react'
import { Music } from 'src/main/types'

import { SettingsContext } from '@renderer/context/settings/SettingsContext'
import { useLoadingStates } from '@renderer/hooks'
import { getStorageSettings, setSettingsPropertys } from '@renderer/utils'

interface Props {
  song: Music
}

export const MusicItem: FC<Props> = ({ song }) => {
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
    <li key={id} className="grid grid-cols-8 hover:bg-gray-100 p-4 rounded">
      <div className="col-span-1 grid place-items-center">
        <img loading="lazy" src={imageUrl} width={width} height={height} alt={title} />
      </div>
      <div className="col-span-3 flex justify-center flex-col pl-6">
        <p className="font-bold text-xl text-ellipsis overflow-hidden line-clamp-2">{title}</p>
        <p className="text-gray-800">{author.name}</p>
        <p className="text-gray-800">
          <small>views {parsedViews}</small>
        </p>
      </div>
      <div className="col-span-2 flex justify-center flex-col pl-6 items-end">{duration}</div>
      <div className="col-span-2 flex items-center justify-end">
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
