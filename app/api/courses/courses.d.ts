export interface CourseList {
  page: number
  perPage: number
  totalItems: number
  totalPages: number
  items: Course[]
}

export interface Course {
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
  subject_id: string
}