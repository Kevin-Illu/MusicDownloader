import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { Layout } from '@renderer/components'

export const Track = () => {
  const { trackId } = useParams()
  const navigate = useNavigate()

  const handleReturn = () => {
    navigate(-1)
  }

  if (trackId) return <Navigate to="/" />

  return (
    <Layout>
      <div>{trackId}</div>
    </Layout>
  )
}
