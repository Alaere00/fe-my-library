"use client";
import { useState } from 'react';
import { Input } from "@/untitled-components/base/input/input"
import { Button } from '@/untitled-components/base/buttons/button';
import './SearchBar.css'


const CatalogMap = {
    "all": "Search books across all catalogs",
    "isbn": "Search books by ISBN",
    "title": "Search books by Title",
    "author": "Search books by Author"
}

export default function SearchBarComponent ({ onSearch, catalog }) {
    const [query, setQuery] = useState('')

    return (
        <>
        <div className='search-container'>
            <Input className="search-bar" onChange={(q) => setQuery(q)} placeholder={CatalogMap[catalog]}></Input>
            <Button type='submit' onClick={() => onSearch(query)} size="md">Search</Button>
        </div>  
        </>
    )
}



