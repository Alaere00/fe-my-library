import React, { useState } from 'react'
import SearchBoxComponent from '../SearchBox/SearchBox'

export default function SearchPage(){
    const [result, setResults] = useState([])

    const handleSearchSubmit = async (query) => {
        const data = await fetch(`http://127.0.0.1:8000/search/${query}`);
        const json = await data.json();
        setResults(json);

      };

      console.log(result)

    return (
        <>
        <SearchBoxComponent onSearchSubmit={handleSearchSubmit}></SearchBoxComponent>

        
        </>
    )
}