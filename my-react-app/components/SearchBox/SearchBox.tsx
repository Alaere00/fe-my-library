import React, { useState } from 'react';
import { SearchBox, Divider } from '@fluentui/react-components';
import './SearchBox.css'
import LoginButton from '../LoginButton/LoginButton';


export default function SearchBoxComponent ({ onSearchSubmit }) {
    const [query, setQuery] = useState('')

    function enterKeyPressed(e) {
        if (e.key === "Enter"){
            onSearchSubmit(query)
        }
    }

    return (
        <div>
            <div className='login-container'>
            <LoginButton></LoginButton>
            <Divider className='divider-style' appearance='brand'/>
            </div>

        <div className='search-container'>
            <p color='black'>Search</p>
            <SearchBox className="search-bar" placeholder='Search by Author, Title, or ISBN' onChange={(_, v) => setQuery(v.value)} onKeyDown={enterKeyPressed}></SearchBox>
            </div>
            
        </div>
    )
}



