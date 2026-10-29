"use client";
import { useState } from 'react';
import { Input } from "@/untitled-components/base/input/input"
import { Button } from '@/untitled-components/base/buttons/button';
import './SearchBar.css'


const CatalogMap = {
    "all": "Search books across all catalogs",
    "isbn": "Search books by ISBN",
    "title": "Search books by Title",
    "author": "Search books by Author"


}
export default function SearchBarComponent ({ catalog }) {
    const [query, setQuery] = useState('')
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>()


    const executeFetch = async (query: string, page: number = 1) => {
        if (!query.trim()) return
        try {
            setLoading(true)

            const response = await fetch(`http://localhost:8000/search/general?query=${encodeURIComponent(query)}`);

            if (!response.ok) throw new Error(`HTTP ${response.status}`);
       
            const res = await response.json();
            // setResults(res)
        } catch(err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
      };

    //   const { pageNumber, pageNumbers, handlePageChange, resetPagination} = usePagination({
    //     totalItems: results?.found ?? 0,
    //     pageLimit: PAGE_LIMIT,
    //     onPageChange: (newPage) => executeFetch(currentQuery, newPage)
    //   })


      async function handleSearchSubmit(query: string){
        await executeFetch(query, 1);
      }

    return (
        <>
        <div className='search-container'>
            <Input className="search-bar" onChange={(query) => setQuery(query)} placeholder={CatalogMap[catalog]}></Input>
            <Button type='submit' onClick={() => handleSearchSubmit(query)} size="md">Search</Button>
        </div>  
        </>
    )
}



