import { useState } from 'react'
import { useBookshelf } from '@/contexts/BookShelfContext'


export function Bookshelf () {
    const { results } = useBookshelf()

    return (
        <>
        <h1>My Bookshelf</h1>
        </>
    )
}