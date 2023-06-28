import { useForm, useMusic } from '@renderer/hooks'
import { useRef, FC, useEffect } from 'react'

interface MusicInputSearchProps {
  setIsLoading: (n: boolean) => void
}

export const MusicInputSearch: FC<MusicInputSearchProps> = ({ setIsLoading }) => {
  const { setMusicRequest, isLoading } = useMusic()
  const [values, handleInputChange, reset] = useForm({
    requestedSong: ''
  })
  const { requestedSong } = values
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    const userRequestedSong = inputRef.current?.value.trim() || ''
    if (userRequestedSong === '') {
      console.log('Please enter a song')
      return
    }

    setMusicRequest(userRequestedSong)
    reset()
  }

  useEffect(() => {
    setIsLoading(isLoading)
  }, [isLoading])

  return (
    <div className="col-span-6">
      <form onSubmit={handleSubmit} className="py-4 px-2 w-full">
        <input
          className="py-4 px-6 rounded-full bg-[#eee6] w-full"
          type="text"
          autoComplete="off"
          autoCorrect="off"
          autoFocus={true}
          placeholder="Search by song or artist name..."
          name="requestedSong"
          value={requestedSong}
          ref={inputRef}
          onChange={handleInputChange}
        />
      </form>
    </div>
  )
}
