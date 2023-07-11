import { getStorageSettings } from '@renderer/utils'
import { FC } from 'react'
import { Navigate } from 'react-router-dom'

interface Props {
  children: JSX.Element
}

export const PublicRoute: FC<Props> = ({ children }) => {
  const { path } = getStorageSettings()
  return !path ? children : <Navigate to="/" />
}
