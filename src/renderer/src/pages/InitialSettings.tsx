/* eslint-disable react/no-unescaped-entities */
import { SettingsContext } from '@renderer/context/settings/SettingsContext'
import { useLoadingStates } from '@renderer/hooks'
import { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'

export const InitialSettings = () => {
  const getPathFromDevice = window.api.getPathFromDevice
  const { setDownloadPath, path } = useContext(SettingsContext)
  const [redirectToHome, setRedirectToHome] = useState<boolean>(false)

  const { state: buttonText, setIsLoading } = useLoadingStates({
    normal: 'Choose a Home',
    whileRunning: 'Loadding...',
    whenFinished: 'Thanks :D',
    statusResponse: path,
    timeout: 5000
  })

  const handleClick = () => {
    setIsLoading(true)
    getPathFromDevice()
      .then((res) => {
        setIsLoading(false)

        if (res.length < 1) {
          console.error('selection cancelled')
          return
        }

        setDownloadPath(res[0])
        setRedirectToHome(true)
      })
      .catch((err) => {
        setIsLoading(false)
        console.log(err)
      })
  }

  return (
    <div className="container w-screen h-screen my-0 mx-auto">
      <div className="py-16">
        <div className="text-4xl">
          <h1 className="font-bold text-6xl text-green-600">OASIS</h1>
          <p className="font-bold">
            Let's give your music a cozy home! Select a cozy nest where your favorite tunes can
            snuggle up. Where will your melodies find their comfy retreat?
          </p>
        </div>
        <div className="py-6 flex gap-2">
          <button
            onClick={handleClick}
            className="bg-green-400 py-2 px-6 rounded-full font-bold"
            type="button"
          >
            {!path ? buttonText : 'Thanks :D'}
          </button>
          {redirectToHome || path ? (
            <NavLink to={'/'} className="bg-blue-400 py-2 px-6 rounded-full font-bold">
              Continue
            </NavLink>
          ) : null}
        </div>
      </div>
    </div>
  )
}
