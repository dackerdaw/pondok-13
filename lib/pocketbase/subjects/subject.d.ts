export interface SubjectList {
  page: number
  perPage: number
  totalItems: number
  totalPages: number
  items: Subject[]
}

export interface Subject {
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
}