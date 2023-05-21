export interface UnitList {
  page: number
  perPage: number
  totalItems: number
  totalPages: number
  items: Unit[]
}

export interface Unit {
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
  course_id: string
}