export interface ArticleList {
  page: number
  perPage: number
  totalPages: number
  totalItems: number
  items: Article[]
}

export interface Article {
  id: string
  collectionId: string
  collectionName: string
  created: string
  updated: string
  slug: string
  name: string
  description: string
  article_url: string
  extra: string
}