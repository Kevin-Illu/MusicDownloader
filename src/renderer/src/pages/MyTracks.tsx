import { NavLink } from 'react-router-dom'
import { Layout } from '@renderer/components'
import { useEffect, useState } from 'react'

interface Image {
  mime: string
  type: {
    id: number
    name: string
  }
  description?: string
  imageBuffer: Buffer
}
interface Metadata {
  namefile: string
  title?: string
  artist?: string
  album?: string
  year?: string
  comment?: string
  trackNumber?: string
  genre?: string
  image?: Image
}

export const MyTracks = () => {
  const getTracksFromDevice = window.api.getTracksFromDevice
  const [tracks, setTracks] = useState<Metadata[] | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function getTracksFromDeviceAsync() {
      setIsLoading(true)
      const result = await getTracksFromDevice()

      if (result.err) {
        setIsLoading(false)
        return
      }

      setTracks(result.response)
      setIsLoading(false)
    }

    getTracksFromDeviceAsync()
  }, [])

  return (
    <Layout>
      <div>
        <NavLink to="/home" className="text-sky-400">
          back to home
        </NavLink>
      </div>
      <h1 className="text-4xl">There area many local music here!</h1>
      <h2 className="text-green-400">Awesome!</h2>
      {isLoading && <p>Loading...</p>}
      {tracks && tracks.map((track) => <TrackItem key={track.namefile} {...track} />)}
    </Layout>
  )
}

// TODO: add styles and orgnize this component
// TODO: add a form to edit the information about the tracks
// TODO: implement a single route for each track

const TrackItem = ({
  namefile,
  album,
  artist,
  genre,
  image,
  comment,
  title,
  trackNumber,
  year
}: Metadata) => {
  return (
    <div>
      <p>{namefile}</p>
      <div>
        <p>{trackNumber || '?'}</p>
        <p>title: {title || 'unknown'}</p>
        <p>artist: {artist || 'unknown'}</p>
        <p>album: {album || 'unknown'}</p>
        <p>genre: {genre || 'unknown'}</p>
        <p>year: {year || 'unknown'}</p>
      </div>
    </div>
  )
}
