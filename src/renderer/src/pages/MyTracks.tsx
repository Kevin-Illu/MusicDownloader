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
          <ul className="list-decimal list-inside flex flex-col pb-8">
            {tracks && tracks.map((track) => <TrackItem key={track.namefile} {...track} />)}
          </ul>
        </div>
      )}
    </Layout>
  )
}

// TODO: implement a single route for each track
// TODO: add a form to edit the information about the tracks

const TrackItem = (props: Metadata) => {
  const { namefile, album, artist, genre, image, comment, title, trackNumber, year } = props

  return (
    <li className="grid grid-cols-8 hover:bg-gray-100 p-4 rounded relative">
      <div className="col-span-2">
        <div className="bg-gray-200 h-48 w-48 flex items-center justify-center">
          <p className="text-8xl font-bold text-gray-400">?</p>
        </div>
      </div>
      <div className="col-span-6">
        <p className="font-bold text-4xl italic pb-2">{namefile.replace('.mp3', '')}</p>
        <TrackAttribute title={'title'} value={title} />
        <TrackAttribute title={'album'} value={album} />
        <TrackAttribute title={'artist'} value={artist} />
        <TrackAttribute title={'year'} value={year} />
      </div>
      <div className="absolute border-solid border-2 border-black rounded-full p-4 bottom-0 right-0 m-4">
        <NavLink to={`/track/${namefile.replaceAll(' ', '')}`} className="font-bold capitalize p-0">
          <p>Edit track info</p>
        </NavLink>
      </div>
    </li>
  )
}

const TrackAttribute = ({
  title,
  value,
  defaultValue
}: {
  title: string
  value: string | undefined
  defaultValue?: string | null
}) => {
  const defaultInfo = defaultValue || '"Unknow"'

  return (
    <div className="flex items-center gap-2 text-xl capitalize font-bold">
      <p>{title}</p>
      <p className="italic text-gray-400">{value || defaultInfo}</p>
    </div>
  )
}
