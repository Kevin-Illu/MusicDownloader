import { useEffect, useState } from 'react'

interface ComponentStates {
  normal: string
  whileRunning: string
  whenFinished: string
  statusResponse: string | null // this is used to distinguish if is already finished or keep running
  timeout?: number
}

interface useLoadingReturnType {
  state: string
  isLoading: boolean
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export const useLoadingStates = ({
  normal = '',
  whenFinished = '',
  whileRunning = '',
  statusResponse = '',
  timeout = 3000
}: ComponentStates): useLoadingReturnType => {
  if (!normal || !whileRunning || !whenFinished) {
    throw new Error('useLoadingStates:Invalid states')
  }

  const [isLoading, setIsLoading] = useState(false)
  const [state, setState] = useState(normal)

  useEffect(() => {
    if (isLoading) {
      setState(whileRunning)
    } else if (statusResponse) {
      setState(whenFinished)
      setTimeout(() => {
        setState(normal)
      }, timeout)
    }
  }, [isLoading, statusResponse])

  return { state, isLoading, setIsLoading }
}
