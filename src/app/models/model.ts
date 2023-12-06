export interface ICategory {
    id?: string
    name: string
    date: string
    description:string
    img?:string
    products?:IProduct[]
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

  export interface IProduct {
    id?: string
    idCategory?: string
    name: string
    price: number
    date?: string
    description:string
    img?:string
}
