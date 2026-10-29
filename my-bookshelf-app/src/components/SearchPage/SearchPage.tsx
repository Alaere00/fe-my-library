import { useState } from 'react'
import { Title1 } from '@fluentui/react-components';
import BookResultListComponent from '../BookCardList/BookCardList';
import {  BookSearchResult} from "../types/BookResponseTypes"
import { LoadingIndicator } from "@/untitled-components/application/loading-indicator/loading-indicator"
import * as Paginations from '@/untitled-components/application/pagination/pagination';
import { SearchComponent } from '../SearchComponent/SearchComponent';
// import { results } from './tempData';
import "./SearchPage.css"



const PAGE_LIMIT: number = 10;
export default function SearchPage(){
    const [results, setResults] = useState<BookSearchResult>({} as BookSearchResult)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>()
    const [currentQuery, setQuery] = useState<string>("")
    const [currentPage, setCurrentPage] = useState<number>(1)

    const executeFetch = async (query: string, page: number = 1, perPage: number = 10) => {
        if (!query.trim()) return
        try {
            setLoading(true)

            const response = await fetch(`http://localhost:8000/search/general?query=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}`);

            if (!response.ok) throw new Error(`HTTP ${response.status}`);
       
            const res = await response.json();
            setResults(res)
            
        } catch(err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
      };


      async function handleSearchSubmit(query: string){
        setQuery(query);
        setCurrentPage(1)
        await executeFetch(query, 1);
      }
 
      async function handlePageChange(page: number){
        setCurrentPage(page)
        await executeFetch(currentQuery, page);
      }


    return (
        <>
        <div className='search-container'>
        <SearchComponent onSearch={handleSearchSubmit} />
        </div>
        {results.found > 0 && <div style={{ margin: "10px 10px"}}>
          <p>Total Results: {results.found }</p>
          </div>}
        { results.found > 0 && ( 
             <>
             <BookResultListComponent results={results} ></BookResultListComponent>
             </>
        )}
        { loading &&  <LoadingIndicator type="dot-circle" size="md" label="Loading..." />}
        <footer>
        {results.total_pages > 0 && <Paginations.PaginationButtonGroup align="center" total={results.total_pages} page={currentPage} onPageChange={handlePageChange} />}
        </footer>

        </>
    )
}