import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { Layout } from '@renderer/components'

// TODO: add a form to edit the information about the tracks

export const Track = () => {
  const { trackId } = useParams()
  const navigate = useNavigate()

  const handleReturn = () => {
    navigate(-1)
  }

  if (!trackId) return <Navigate to="/" />

  return (
    <Layout>
      <div>
        <button onClick={handleReturn}>Return</button>
      </div>
      <div>{trackId}</div>

      <div>
        {/* <TrackAttribute title={'title'} value={title} />
        <TrackAttribute title={'album'} value={album} />
        <TrackAttribute title={'artist'} value={artist} />
        <TrackAttribute title={'year'} value={year} /> */}
      </div>
    </Layout>
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
