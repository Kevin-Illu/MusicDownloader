export const SongDuration = ({ duration }: { duration: string }) => {
  return (
    <div className="backdrop-blur-sm bg-[rgba(255,255,255,0.6)] py-1 px-4 m-2 rounded absolute bottom-0 right-0">
      {duration}
    </div>
  )
}
