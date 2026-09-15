export interface TitleResponse {
    totalItems: number
    items: ItemsResponse
}

interface ItemsResponse {
    volumeInfo: VolumeInfo[]

}

interface VolumeInfo {
    authors: string[]
    averageRating: number
    description: string
    imageLinks: object
    language: string
    pageCount: number
    publishDate: string
    publisher: string
    ratingsCount: number
    title: string
}
