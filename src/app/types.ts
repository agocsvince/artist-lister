export type artistType = { id: number, name: string, albumCount: number, portrait: string}
export type paginationResponseType = {
  current_page: number,
  total_pages: number,
  per_page: number,
  total_items: number
}
export type paginationModelType = { page: number, pageSize: number}