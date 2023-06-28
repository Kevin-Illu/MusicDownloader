import { FC } from 'react'
import { Author } from 'src/main/types'

interface AuthorProps {
  author: Author
  title: string
  views: string
}

export const AuthorSongInformation: FC<AuthorProps> = ({ author, title, views }) => {
  const { avatars, name, verified } = author
  const { url, height, width } = avatars[0]

  return (
    <div className="col-span-4 gap-2 flex items-center justify-between">
      <p className="font-bold p-0 m-0 max-h-[4.8rem] overflow-hidden line-clamp-4 overflow-ellipsis">
        {title}
      </p>
      <div className="overflow-hidden relative">
        <img
          className="rounded-full"
          src={url}
          height={height / 1.8}
          width={width / 1.8}
          alt={'avatar'}
        />
      </div>
      <div className={`${verified && 'flex gap-2 items-center'}`}>
        {verified && <div className="bg-sky-400 h-2 w-2 items-center rounded-full"></div>}
        <p>{name}</p>
      </div>
      <p className="font-medium italic text-sm text-slate-400">{views} views</p>
    </div>
  )
}
