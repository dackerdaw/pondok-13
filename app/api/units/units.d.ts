import { Page } from "../pages/pages"

export interface UnitList {
  page: number
  perPage: number
  totalItems: number
  totalPages: number
  items: Unit[]
}

export interface Unit {
  child_pages: string[]
  collectionId: string
  collectionName: string
  course_id: string
  created: string
  description: string
  expand?: Expand
  id: string
  image: string
  index: number
  name: string
  slug: string
  updated: string
}

export interface Expand {
  child_pages: Page[]
}
