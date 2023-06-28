import { NavLink } from 'react-router-dom'
import { Layout, MusicDownloaded } from '@renderer/components'
import { getStorageSettings } from '@renderer/utils'

export const History = () => {
  const { history } = getStorageSettings()
  const thereAreMusicDownloaded = history.length > 0

  if (!thereAreMusicDownloaded) {
    return (
      <Layout>
        <div>
          <NavLink to="/home" className="text-sky-400">
            back to home
          </NavLink>
        </div>
        <div>to find something here download some music ;D</div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div>
        <NavLink to="/home" className="text-sky-400">
          back to home
        </NavLink>
      </div>
      <h1 className="text-4xl">There area many local music here!</h1>
      <h2 className="text-green-400">Awesome!</h2>
      <MusicDownloaded />
    </Layout>
  )
}
