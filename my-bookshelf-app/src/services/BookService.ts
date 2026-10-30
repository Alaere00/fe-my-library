


async function fetchJSON<T>(url: string){
    const response = await fetch(url);
    if (!response.ok) throw new Error (`Request failed: ${response.statusText}`)
    return response.json()
}

interface CatalogConfig<T> {
    search: (query: string) => Promise<T[]>;
}

const CatalogService = {
    all: {
        search: (query: string, page: number, perPage: number) =>
            fetchJSON(`http://localhost:8000/search/general?query=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}`)    
    },
    isbn: {
        search: (query: string) =>
            fetchJSON(`http://localhost:8000/search/isbn/${query}}`)    
    },
    title: {
        search: (title: string, page: number, perPage: number) =>
            fetchJSON(`http://localhost:8000/search/title/${title}?page=${page}&per_page=${perPage}`)    
    },
    author: {
        search: (authorName: string, page: number, perPage: number) =>
            fetchJSON(`http://localhost:8000/search/author/${authorName}?page=${page}&per_page=${perPage}`)    
    }

}

export function searchCatalog(catalog, query: string, page: number, perPage: number){
    return CatalogService[catalog].search(query, page, perPage)

}