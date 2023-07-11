import { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Layout } from '@renderer/components'

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
  const navigate = useNavigate()
  const getTracksFromDevice = window.api.getTracksFromDevice
  const [tracks, setTracks] = useState<Metadata[] | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleReturn = () => navigate(-1)

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
      <div className="w-full h-fit py-10 flex items-center justify-between">
        <div className="font-semibold capitalize">
          <button
            className="bg-neutral-400 text-white px-6 py-2 rounded-full hover:bg-neutral-500"
            onClick={handleReturn}
          >
            Back to home
          </button>
        </div>
        <div className="">
          <h1 className="text-4xl p-0 font-extrabold">Your Store</h1>
        </div>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <ul className="grid grid-cols-4 gap-6">
            {tracks && tracks.map((track) => <TrackItem key={track.namefile} {...track} />)}
          </ul>
        </div>
      )}
    </Layout>
  )
}

const TrackItem = (props: Metadata) => {
  const { namefile } = props

  return (
    <li className="flex flex-col hover:bg-gray-100 p-4 relative gap-2">
      <div className="col-span-2">
        <div className="bg-gray-200 h-64 flex items-center justify-center">
          <p className="text-8xl font-bold text-gray-400">?</p>
        </div>
      </div>
      <div className="col-span-6">
        <p className="italic pb-2">{namefile.replace('.mp3', '')}</p>
      </div>
      <div className="pt-4">
        <NavLink
          to={`/track/${namefile}`}
          className="bg-red-100 m-2 py-1 px-4 rounded-full absolute bottom-0 right-0 font-bold capitalize p-0"
        >
          Edit track
        </NavLink>
      </div>
    </li>
  )
}
