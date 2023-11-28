export interface ICategory {
    id?: string
    name: string
    date: string
    description:string
    img:string
    count:number
}

export interface PaginationInfo {
    totalRecords: number
    page: number
    pageSize: number
  }

  export interface paramRequest {
    searchTerm?: any
    skip?: number,
    take?: number
  }