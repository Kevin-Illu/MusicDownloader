import { getStorageSettings } from '@renderer/utils'
import { Navigate } from 'react-router-dom'

interface Props {
  children: JSX.Element
}

export const PrivateRoute = ({ children }: Props) => {
  const { path } = getStorageSettings()

  if (path) {
    return children
  } else {
    return <Navigate to={'/getStarted'} />
  }
}
