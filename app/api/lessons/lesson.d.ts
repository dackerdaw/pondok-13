export interface LessonList {
  page: number
  perPage: number
  totalPages: number
  totalItems: number
  items: Lesson[]
}

export interface Lesson {
  id: string
  collectionId: string
  collectionName: string
  created: string
  updated: string
  lesson_type: string
  index: number
  lesson_slug: string
  group_id: string
}