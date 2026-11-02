export interface BookSearchResult {
    found: number;            
    hits: BookInfo[];
    page: number;  
    per_page: number;
    total_pages: number
}

export interface Bookshelf {
    book_id: string;
    books: BookInfo
    completed_at: string;
    is_favorite: boolean;
    progress_pages: number;
    rating: number;
    started_at: string;
    status: string;
    updated_at: string;
    user_id: string
}

export interface BookInfo {
    id: number               // was string
    title?: string | null
    subtitle?: string | null
    author_names?: string[] | null
    description?: string | null
    image?: CachedImage | null
    book_characters: BookCharacter[]
    content_warnings?: string[] | null
    contributions: Record<string, unknown>[]
    featured_series?: Series | null
    featured_series_position?: number | null
    genres?: string[] | null
    isbns?: string[] | null
    moods?: string[] | null
    tags?: string[] | null
    series_names?: string[] | null
    has_audiobook?: boolean | null
    has_ebook?: boolean | null
    pages?: number | null
    rating?: number | null
    ratings_count?: number | null
    release_date_i?: number | null
    release_year?: number | null
}

export interface CachedImage {
    id?: number | null
    url?: string | null
    color?: string | null
    width?: number | null
    height?: number | null
    color_name?: string | null
}

export interface Series {
    author?: string | null
    author_id?: number | null
    books_count?: number | null
    description?: string | null
    id?: number | null
    is_completed?: boolean | null
    locked?: boolean | null
    name?: string | null
    primary_books_count?: number | null
    user_id?: number | null
}

export interface BookCharacter {
    character: Character
}

export interface Character {
    name: string
}