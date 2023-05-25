export interface LessonList {
  page: number
  perPage: number
  totalPages: number
  totalItems: number
  items: Lesson[]
}

export interface Lesson {
  collectionId: string
  collectionName: string
  created: string
  id: string
  index: number
  lesson_slug: string
  lesson_type: string
  page_id: string
  updated: string
}