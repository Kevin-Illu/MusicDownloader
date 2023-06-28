import { NavLink } from 'react-router-dom'
import { MusicInputSearch } from './MusicInputSearch'

export const NavBar = (props) => {
  return (
    <div className="bg-[rgba(250,250,250,0.6)] backdrop-blur sticky top-0 w-full z-40">
      <div className="container my-0 mx-auto grid grid-cols-12">
        <div className="col-span-3 flex items-center">
          <p className="font-bold">MS</p>
        </div>
        <MusicInputSearch {...props} />
        <div className="col-span-3 flex items-center gap-2 flex-row-reverse">
          <NavLink to="/history">history</NavLink>
        </div>
      </div>
    </div>
  )
}
