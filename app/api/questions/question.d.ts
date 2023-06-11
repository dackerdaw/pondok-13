export interface QuestionList {
  page: number
  perPage: number
  totalPages: number
  totalItems: number
  items: Question[]
}

export interface Question {
  id: string
  collectionId: string
  collectionName: string
  created: string
  updated: string
  type: string
  answer: string
  hints: string
  question: string
  extras: string
  practice_id: string
}