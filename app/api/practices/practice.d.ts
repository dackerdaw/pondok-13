export interface PracticeList {
  page: number
  perPage: number
  totalItems: number
  totalPages: number
  items: Practice[]
}

export interface Practice {
  collectionId: string
  collectionName: string
  created: string
  expand: Expand
  id: string
  name: string
  number_of_questions: number
  problem_types: string[]
  slug: string
  time_estimate_lower_bound: number
  time_estimate_upper_bound: number
  updated: string
}

export interface Expand {
  problem_types: ProblemType[]
}

export interface ProblemType {
  assessment_items: string[]
  collectionId: string
  collectionName: string
  created: string
  id: string
  parent_practice: string
  related_contents: string[]
  slug: string
  updated: string
}
