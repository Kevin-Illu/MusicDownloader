import { NavLink } from 'react-router-dom'
import { Layout } from '@renderer/components'

export const MyTracks = () => {
  return (
    <Layout>
      <div>
        <NavLink to="/home" className="text-sky-400">
          back to home
        </NavLink>
      </div>
      <h1 className="text-4xl">There area many local music here!</h1>
      <h2 className="text-green-400">Awesome!</h2>
    </Layout>
  )
}
