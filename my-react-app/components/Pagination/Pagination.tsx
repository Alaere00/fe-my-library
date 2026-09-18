import React from 'react'
import { Button } from '@fluentui/react-components';
import { ChevronLeft16Filled, ChevronRight16Filled } from "@fluentui/react-icons"
import "./Pagination.css"


export default function PaginationComponent({ currentPage, totalPages, pageNumbers, onPageSelect }) {
    function getPageNumbers(): number[] {
        const maxVisible = 7;

        if (totalPages <= maxVisible){
            return Array.from({ length: totalPages}, (_, i) => i + 1);
        }

        let start = currentPage - 3;
        let end = currentPage + 3;

        if (start < 1){
            start = 1;
            end = maxVisible;
        }

        if (end > totalPages){
            end = totalPages;
            start = totalPages - maxVisible + 1
        }

        const pages: number[] = []
        for (let i= start; i < end; i++){
            pages.push(i);
        }
        return pages;

    }

    return (
        <div className="pagination-container">
            <span> Page {currentPage} of {totalPages} </span>
            {/* <div> */}
                <Button disabled={currentPage === 1} onClick={() => onPageSelect(currentPage - 1)} ><ChevronLeft16Filled/></Button>

                <ul className="pagination-list">
                { getPageNumbers().map((p: number, i: number) => (
                 
                    <Button key={i} shape="circular" className='btn-style' onClick={() => onPageSelect(p)}>{p}</Button>)
                ) }
                </ul>

                <Button disabled={currentPage == totalPages} onClick={() => onPageSelect(currentPage + 1)}><ChevronRight16Filled/></Button>
            {/* </div>  */}
        </div>
    )
}