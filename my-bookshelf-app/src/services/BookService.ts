


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


export async function handleSetRating(rating: number, provider_id: string){
    try {
        const token = sessionStorage.getItem("accessToken");
        const res = await fetch(`http://localhost:8000/my-bookshelf/${provider_id}/rating`, {
            method: "PATCH", headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            }, body: JSON.stringify({ rating })
    
        })
        if (!res.ok) throw new Error(await res.text());

    } catch(error) {
        console.error(error)
    }
}