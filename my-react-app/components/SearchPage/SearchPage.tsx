import React, { useState } from 'react'
import { ProgressBar } from '@fluentui/react-components';
import type { TitleResponse } from "../types/BookResponseTypes"
import SearchBoxComponent from '../SearchBox/SearchBox'
import BookResultListComponent from '../BookCardList/BookCardList';
import "./SearchPage.css"

export default function SearchPage(){
    const [result, setResults] = useState<TitleResponse>({} as TitleResponse)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>()

    const handleSearchSubmit = async (query: string) => {
        try {
            setLoading(true)
            const response = await fetch(`http://127.0.0.1:8000/search/${query}`);

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



      console.log(loading)

      console.log(result)

    return (
        <>
        { loading && <ProgressBar className='loading-bar'/> }
        <div className='search-container'>
        <SearchBoxComponent onSearchSubmit={handleSearchSubmit}></SearchBoxComponent>
        </div>
        { result && <BookResultListComponent results={result} ></BookResultListComponent>}
        </>
    )
}