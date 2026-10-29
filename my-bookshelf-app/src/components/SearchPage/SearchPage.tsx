import { useState } from 'react'
import { ProgressBar, Title1 } from '@fluentui/react-components';
import BookResultListComponent from '../BookCardList/BookCardList';
import PaginationComponent from '../Pagination/Pagination';
import SearchBoxComponent from '../SearchBox/SearchBox'
import {  BookSearchResult} from "../types/BookResponseTypes"
import usePagination from '../../../hooks/usePagination';
import { results } from './tempData';
import "./SearchPage.css"


const PAGE_LIMIT: number = 10;
export default function SearchPage(){
    // const [results, setResults] = useState<BookSearchResult>({} as BookSearchResult)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>()
    const [currentQuery, setQuery] = useState<string>("")

    const executeFetch = async (query: string, page: number = 1) => {
        if (!query.trim()) return
        try {
            setLoading(true)

            const response = await fetch(`http://127.0.0.1:8000/search/general?query=${encodeURIComponent(query)}`);

            if (!response.ok) throw new Error(`HTTP ${response.status}`);
       
            const res = await response.json();
            // setResults(res)
            
        } catch(err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
      };

      const { pageNumber, pageNumbers, handlePageChange, resetPagination} = usePagination({
        totalItems: results?.found ?? 0,
        pageLimit: PAGE_LIMIT,
        onPageChange: (newPage) => executeFetch(currentQuery, newPage)
      })


      async function handleSearchSubmit(query: string){
        setQuery(query);
        resetPagination()
        await executeFetch(query, 1);
      }


    return (
        <>
        { loading && <ProgressBar className='loading-bar'/> }
        <div className='search-container'>
        <SearchBoxComponent onSearchSubmit={handleSearchSubmit}></SearchBoxComponent>
        </div>
        { results.found > 0 && ( 
             <><Title1 style={{ color: '#240A1B'}}>Keyword Search: {currentQuery}</Title1>
             <BookResultListComponent results={results} ></BookResultListComponent>
             </>
        )}
        <footer>
        {results.found > 0 && <PaginationComponent totalPages={pageNumbers.length} currentPage={pageNumber} pageNumbers={pageNumbers} onPageSelect={handlePageChange}/>}
        </footer>

        </>
    )
}