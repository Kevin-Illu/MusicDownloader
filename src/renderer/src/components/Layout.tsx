import { ReactNode, FC } from 'react'

interface Props {
  children: ReactNode
}

export const Layout: FC<Props> = ({ children }) => {
  return <div className="container my-0 mx-auto">{children}</div>
}
