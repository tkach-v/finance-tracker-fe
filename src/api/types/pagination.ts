export type PaginationRequestParams = {
  page: number
}

export type PaginationResponse<T> = {
  count: number
  results: T[]
}
