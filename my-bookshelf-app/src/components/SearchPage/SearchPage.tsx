import { useState } from 'react'
import BookResultListComponent from '../BookCardList/BookCardList';
import {  BookSearchResult} from "../types/BookResponseTypes"
import { LoadingIndicator } from "@/untitled-components/application/loading-indicator/loading-indicator"
import * as Paginations from '@/untitled-components/application/pagination/pagination';
import { SearchComponent, SelectedTab } from '../SearchComponent/SearchComponent';
import { Header } from '../Header/Header';
import { searchCatalog } from '@/services/BookService';
import "./SearchPage.css"


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
            const res = await searchCatalog(selectedTab, query, page, perPage)
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

      const [selectedTab, setSelectedTab ] = useState<string>(SelectedTab.ALL)

      const handleSelectionChange = (id: string) => {
          setSelectedTab(id as SelectedTab)
      }


    return (
        <div className='search-header'>
            {/* <Header /> */}
          <div className='ms-20' style={{ marginTop: 55}}>
          <h1 className='mb-5' style={{ fontWeight: "bold", fontSize: 45 }}>Discover your next read!</h1>
          <p>Search millions of books, shelve, rate, and get personalized recommendations. </p>
          <SearchComponent handleSelectionChange={handleSelectionChange} selectedTab={selectedTab} onSearch={handleSearchSubmit} />
          </div>
        {results?.found > 0 && <div style={{ margin: "10px 10px"}}>
          <p>Total Results: {results.found }</p>
          </div>}
        { results?.found > 0 && ( 
             <>
             <BookResultListComponent results={results} ></BookResultListComponent>
             </>
        )}
        { loading &&  <LoadingIndicator type="dot-circle" size="md" label="Loading..." />}
        <footer>
        {results.total_pages > 0 && <Paginations.PaginationButtonGroup align="center" total={results?.total_pages} page={currentPage} onPageChange={handlePageChange} />}
        </footer>
        </div>
    )
}