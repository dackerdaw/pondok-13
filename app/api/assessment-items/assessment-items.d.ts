import { ProblemType } from "../practices/practice"

export interface AssessmentItem {
  answer: any
  answer_type: string
  collectionId: string
  collectionName: string
  created: string
  expand: Expand
  extras: Extras
  hints: string[]
  id: string
  problem_type_parent: string
  question: string
  updated: string
}

export interface Expand {
  problem_type_parent: ProblemType
}

export interface Extras {
  simplify: boolean
  tolerance: number
}