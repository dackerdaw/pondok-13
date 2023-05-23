export interface UnitList {
  page: number
  perPage: number
  totalItems: number
  totalPages: number
  items: Unit[]
}

export interface Unit {
  child_groups: string[]
  collectionId: string
  collectionName: string
  course_id: string
  created: string
  description: string
  expand: Expand
  id: string
  image: string
  index: number
  name: string
  slug: string
  updated: string
}

export interface Expand {
  child_groups: ChildGroup[]
}

export interface ChildGroup {
  collectionId: string
  collectionName: string
  created: string
  description: string
  id: string
  image: string
  index: number
  is_quiz: boolean
  name: string
  slug: string
  unit_id: string
  updated: string
}