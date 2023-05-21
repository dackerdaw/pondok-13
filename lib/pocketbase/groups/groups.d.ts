export interface GroupList {
  page: number
  perPage: number
  totalItems: number
  totalPages: number
  items: Group[]
}

export interface Group {
  collectionId: string
  collectionName: string
  created: string
  description: string
  id: string
  image: string
  index: number
  name: string
  slug: string
  updated: string
  unit_id: string
  is_quiz: boolean
}