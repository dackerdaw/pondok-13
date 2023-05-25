export interface PageList {
  page: number
  perPage: number
  totalItems: number
  totalPages: number
  items: Page[]
}

export interface Page {
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