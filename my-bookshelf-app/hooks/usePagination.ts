import { useState } from "react";

interface PaginationProps {
    totalItems: number;
    pageLimit: number;
    onPageChange: (newPage: number) => void;

}
function usePagination({totalItems, pageLimit, onPageChange} : PaginationProps){
    const [pageNumber, setPageNumber] = useState<number>(1);

    const totalPages = Math.max(1, Math.ceil(totalItems/pageLimit))
    const pageNumbers: number[] = []

    for (let i = 1; i <= totalPages; i++){
        pageNumbers.push(i);
    }
    
    function handlePageChange(page: number){
        setPageNumber(page);
        onPageChange(page);
    }

    const resetPagination = () => {
        setPageNumber(1)
    }

    return { pageNumber, totalPages, pageNumbers, handlePageChange, resetPagination};

}

export default usePagination;