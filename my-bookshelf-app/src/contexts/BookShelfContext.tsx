import { useEffect } from "react";
import { BookInfo, Bookshelf } from "@/components/types/BookResponseTypes";
import { createContext, useContext, useState, ReactNode } from "react";

interface BookShelfContextType {
    bookshelf: Bookshelf[];
    bookInfo: BookInfo[];

}

const BookshelfContext = createContext<BookShelfContextType | null>(null)

export const BookshelfProvider = ({ children }: { children: ReactNode}) => {
    const [bookshelf, setBookshelf] = useState<Bookshelf[]>()
    const [bookInfo, setBookInfo] = useState<BookInfo[]>()


    useEffect(() => {
        (async ()=> {
            try {
                const token = sessionStorage.getItem("accessToken");
                const res = await fetch(`http://localhost:8000/my-bookshelf`, {
                method: "GET", headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            })
            const shelf: Bookshelf[] = await res.json()
            setBookshelf(shelf)
            const books = shelf.map((book)=> book.books)
            setBookInfo(books)
            } catch (error) {
            console.error(error)
            } 
        })()
    }, []) 


    return (
        <BookshelfContext.Provider value={{ bookshelf, bookInfo }} >
            { children }
        </BookshelfContext.Provider>
    )
}

export const useBookshelf = () => {
    const ctx = useContext(BookshelfContext)
    return ctx

}