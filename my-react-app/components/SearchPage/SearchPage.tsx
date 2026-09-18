import React, { useState } from 'react'
import { ProgressBar } from '@fluentui/react-components';
import { TitleResponse } from "../types/BookResponseTypes"
import SearchBoxComponent from '../SearchBox/SearchBox'
import BookResultListComponent from '../BookCardList/BookCardList';
import PaginationComponent from '../Pagination/Pagination';
import "./SearchPage.css"
import usePagination from '../../hooks/usePagination';

const PAGE_LIMIT: number = 10;
export default function SearchPage(){
    const [result, setResults] = useState<TitleResponse>({} as TitleResponse)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>()
    const [currentQuery, setQuery] = useState<string>("")

    const executeFetch = async (query: string, page: number = 1) => {
        try {
            setLoading(true)
            const response = await fetch(`http://127.0.0.1:8000/search?q=${encodeURIComponent(query)}&page=${page}&per_page=10`);

            if (!response.ok){
                throw new Error('Network response failed');
            }

            const res = await response.json();
            setResults(res)

        } catch(err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
      };

      const { pageNumber, pageNumbers, handlePageChange, resetPagination} = usePagination({
        totalItems: result?.totalItems ?? 0,
        pageLimit: PAGE_LIMIT,
        onPageChange: () => executeFetch(currentQuery, pageNumber)
      })

      async function handleSearchSubmit(query: string){
        setQuery(query);
        resetPagination()
        await executeFetch(query, 1);
      }





      console.log(pageNumber, pageNumbers)

      console.log(result)

    return (
        <>
        { loading && <ProgressBar className='loading-bar'/> }
        <div className='search-container'>
        <SearchBoxComponent onSearchSubmit={handleSearchSubmit}></SearchBoxComponent>
        </div>
        { result && <BookResultListComponent results={result} ></BookResultListComponent>}
        <footer>
        <PaginationComponent currentPage={pageNumber} pageNumbers={pageNumbers} onPageSelect={handlePageChange}/>
        </footer>

        </>
    )
}