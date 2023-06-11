import { Question } from "../questions/question"

export interface PracticeList {
  page: number
  perPage: number
  totalPages: number
  totalItems: number
  items: Practice[]
}

export interface Practice {
  id: string
  collectionId: string
  collectionName: string
  created: string
  updated: string
  slug: string
  name: string
  related_lessons: string[]
  number_of_questions: number
  questions: string[]
  expand?: Expand
}

export interface Expand {
  questions: Question[]
}