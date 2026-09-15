import React, { useState } from 'react'
import type { TitleResponse } from "../types/BookResponseTypes"
import SearchBoxComponent from '../SearchBox/SearchBox'
import BookResultListComponent from '../BookResultList/BookResultList';

export default function SearchPage(){
    const [result, setResults] = useState<TitleResponse>({} as TitleResponse)

    const handleSearchSubmit = async (query: string) => {
        const data = await fetch(`http://127.0.0.1:8000/search/${query}`);
        const json = await data.json();
        setResults(json);

      };

      console.log(result)

    return (
        <>
        <SearchBoxComponent onSearchSubmit={handleSearchSubmit}></SearchBoxComponent>
        { result && <BookResultListComponent results={result} ></BookResultListComponent>}
        </>
    )
}