export const SingleSongSkeleton = () => {
  return (
    <div className="grid grid-cols-1 grid-rows-3 gap-2 p-4 border-2 rounded-xl">
      <div className="animate-pulse bg-gray-300 row-span-3 rounded-xl overflow-hidden h-40 w-full relative"></div>

      <div className="row-span-1 grid grid-cols-6 gap-4 h-12">
        <div className="col-span-1 overflow-hidden relative rounded-full bg-gray-300 h-10 w-10"></div>
        <div className="col-span-5 animate-pulse bg-gray-300 rounded-full"></div>
      </div>

      <div className="row-span-1 py-2 animate-pulse bg-gray-300 h-12 rounded-full"></div>
    </div>
  )
}
