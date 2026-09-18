import React, { useState } from 'react';
import { SearchBox, makeStyles } from '@fluentui/react-components';
import './SearchBox.css'

const useStyles = makeStyles({
    searchBar: {
      width: '500px',
    },
  });


export default function SearchBoxComponent ({ onSearchSubmit }) {
    const [query, setQuery] = useState('')
    const styles = useStyles()

    function enterKeyPressed(e) {
        if (e.key === "Enter"){
            onSearchSubmit(query)
        }
    }

    return (
        <div className='search-container'>
        <p color='black'>Search</p>
        <SearchBox className={styles.searchBar} placeholder='Search by Author, Title, or ISBN' onChange={(_, v) => setQuery(v.value)} onKeyDown={enterKeyPressed}></SearchBox>
        </div>
    )
}



