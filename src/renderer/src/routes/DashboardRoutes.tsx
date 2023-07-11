import { Route, Routes } from 'react-router-dom'
import { MusicHome, MyTracks, Track } from '@renderer/pages'

export const DashboardRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MusicHome />} />
      <Route path="/myTracks" element={<MyTracks />} />
      <Route path="/track/:trackId" element={<Track />} />
    </Routes>
  )
}
