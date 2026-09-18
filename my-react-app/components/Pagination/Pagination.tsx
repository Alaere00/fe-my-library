import React from 'react'
import { Button } from '@fluentui/react-components';
import "./Pagination.css"


export default function PaginationComponent({ currentPage, pageNumbers, onPageSelect }) {
    return (
        <div className='pagination-container'>
            { pageNumbers.map((page: number) => {
                return (
                <Button className='btn-style' key={page} onClick={() => onPageSelect(page)}>{page}</Button>)

            }) }
        </div>
    )
}