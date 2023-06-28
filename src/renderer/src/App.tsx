import { MusicProvider } from './context/music/MusicProvider'
import { SettingsProvider } from './context/settings/SettingsProvider'
import { AppRouter } from './routes'

function App(): JSX.Element {
  return (
    <SettingsProvider>
      <MusicProvider>
        <AppRouter />
      </MusicProvider>
    </SettingsProvider>
  )
}

export default App
