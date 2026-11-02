import { useEffect, createContext, useContext, useState, ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { BookInfo, Bookshelf } from "@/components/types/BookResponseTypes";
import { useAuth } from "./AuthContext";


interface BookShelfContextType {
    bookshelf: Bookshelf[];
    bookInfo: BookInfo[];

}

const BookshelfContext = createContext<BookShelfContextType | null>(null)

export const BookshelfProvider = ({ children }: { children: ReactNode}) => {
    const { isAuthenticated }  = useAuth()
    const [bookshelf, setBookshelf] = useState<Bookshelf[]>()
    const [bookInfo, setBookInfo] = useState<BookInfo[]>()
    const location = useLocation()


    useEffect(() => {
        const onBookshlfRoute = location.pathname.startsWith("/bookshelf") || location.pathname.startsWith("/recommendations")
        if (!isAuthenticated || !onBookshlfRoute) return;

        const controller = new AbortController();
        (async ()=> {
            try {
                const token = sessionStorage.getItem("accessToken");
                if (!token) return;
                const res = await fetch(`http://localhost:8000/my-bookshelf`, {
                method: "GET", headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                signal: controller.signal
            })
            if (!res.ok) {
                throw new Error(`Bookshelf request failed: ${res.status}`);
            }

            const shelf: Bookshelf[] = await res.json()
            const books = shelf.map((book)=> book.books)

            if (controller.signal.aborted) return;
            setBookshelf(shelf)
            setBookInfo(books)
            } catch (error) {
                console.error(error)
            } 
        })()
    }, [isAuthenticated, location.pathname]) 


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