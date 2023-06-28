import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { PrivateRoute } from './PrivateRoute'
import { History, InitialSettings, MusicHome } from '@renderer/pages'

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <MusicHome />
            </PrivateRoute>
          }
        />
        <Route
          path="/history"
          element={
            <PrivateRoute>
              <History />
            </PrivateRoute>
          }
        />
        <Route path="/*" element={<Navigate to="/" />} />
        <Route path="/getStarted" element={<InitialSettings />} />
      </Routes>
    </BrowserRouter>
  )
}
