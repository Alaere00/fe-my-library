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
        <nav>
            <ul className='pagination-container'>
                <li>
                    <Button className='page-item' disabled={currentPage === 1} onClick={() => onPageSelect(currentPage - 1)} ><ChevronLeft16Filled/></Button>
                { getPageNumbers().map((p: number, i: number) => (
                    <Button key={i} className={`page-item ${currentPage === p ? 'active': ''}`} onClick={() => onPageSelect(p)}>{p}</Button>)
                ) }
                <Button className='page-item' disabled={currentPage == totalPages} onClick={() => onPageSelect(currentPage + 1)}><ChevronRight16Filled/></Button>
                </li>
                <span style={{ "verticalAlign": "center"}}> Page {currentPage} of {totalPages} </span>
                </ul>
        </nav>
    )
}