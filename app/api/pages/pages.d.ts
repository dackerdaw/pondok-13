import { Lesson } from "../lessons/lesson"

export interface PageList {
  page: number
  perPage: number
  totalItems: number
  totalPages: number
  items: Page[]
}

export interface Page {
  child_lessons: string[]
  collectionId: string
  collectionName: string
  created: string
  description: string
  expand?: Expand
  id: string
  image: string
  index: number
  is_quiz: boolean
  name: string
  slug: string
  unit_id: string
  updated: string
}

export interface Expand {
  child_lessons: Lesson[]
}
