import { SingleSongSkeleton } from './SingleSongSkeleton'

export const MusicListSkeleton = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
      <SingleSongSkeleton />
      <SingleSongSkeleton />
      <SingleSongSkeleton />
      <SingleSongSkeleton />
      <SingleSongSkeleton />
      <SingleSongSkeleton />
      <SingleSongSkeleton />
      <SingleSongSkeleton />
    </div>
  )
}
