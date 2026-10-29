import { useState } from 'react';
import { SearchBox, Divider, Label } from '@fluentui/react-components';
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
        <div className='feed'>
            <div className='login-container'>
            <Label className="header">MY-BOOKSHELF</Label>
            <LoginButton></LoginButton>
            </div>
            <Divider className='divider-style' appearance='brand'/>

        <div className='search-container'>
            <p color='black'>Search</p>
            <SearchBox className="search-bar" placeholder='Search by Author, Title, or ISBN' onChange={(_, v) => setQuery(v.value)} onKeyDown={enterKeyPressed}></SearchBox>
            </div>
            
        </div>
    )
}



