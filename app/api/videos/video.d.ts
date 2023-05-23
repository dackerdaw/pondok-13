export interface VideoList {
  page: number
  perPage: number
  totalPages: number
  totalItems: number
  items: Video[]
}

export interface Video {
  id: string
  collectionId: string
  collectionName: string
  created: string
  updated: string
  slug: string
  name: string
  description: string
  transcript: string
  video_url: string
}