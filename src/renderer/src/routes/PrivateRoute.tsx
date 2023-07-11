import { getStorageSettings } from '@renderer/utils'
import { Navigate } from 'react-router-dom'

interface Props {
  children: JSX.Element
}

export const PrivateRoute = ({ children }: Props) => {
  const { path } = getStorageSettings()

  return path ? children : <Navigate to="/getStarted" />
}
