export interface MusicData {
  type: Type
  title: string
  id: string
  url: string
  bestThumbnail: BestThumbnail
  thumbnails: BestThumbnail[]
  isUpcoming: boolean
  upcoming: null
  isLive: boolean
  badges: string[]
  author: Author
  description: null
  views: number
  duration: string
  uploadedAt: UploadedAt | null
}

export interface Music {
  type: Type
  title: string
  id: string
  url: string
  bestThumbnail: BestThumbnail
  author: Author
  views: number
  duration: string
}

export interface Author {
  name: string
  channelID: string
  url: string
  bestAvatar: BestThumbnail
  avatars: BestThumbnail[]
  ownerBadges: OwnerBadge[]
  verified: boolean
}

export interface BestThumbnail {
  url: string
  width: number
  height: number
}

export enum OwnerBadge {
  OfficialArtistChannel = 'Official Artist Channel',
  Verified = 'Verified'
}

export enum Type {
  Video = 'video'
}

export enum UploadedAt {
  The11MonthsAgo = '11 months ago',
  The1YearAgo = '1 year ago',
  The2MonthsAgo = '2 months ago',
  The2YearsAgo = '2 years ago',
  The3MonthsAgo = '3 months ago',
  The5MonthsAgo = '5 months ago',
  The7MonthsAgo = '7 months ago',
  The8MonthsAgo = '8 months ago',
  The9MonthsAgo = '9 months ago'
}

type TMessage = 'OK' | 'Not Found'

export interface ResponseMusic {
  message: TMessage
  resolved: boolean
  response: Music[]
}
