import { useEffect } from "react";
import { BookInfo } from "@/components/types/BookResponseTypes";
import { createContext, useContext, useState, ReactNode } from "react";

interface BookShelfContextType {
    results: BookInfo[]

}

const BookshelfContext = createContext<BookShelfContextType | null>(null)

export const BookshelfProvider = ({ children }: { children: ReactNode}) => {
    const [results, setResults] = useState<BookInfo[]>()


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
            const shelf = await res.json()
            setResults(shelf)
            } catch (error) {
            console.error(error)
            } 
        })()
    }, []) 


    return (
        <BookshelfContext.Provider value={{ results }} >
            { children }
        </BookshelfContext.Provider>
    )
}

export const useBookshelf = () => {
    const ctx = useContext(BookshelfContext)
    // if (!ctx) throw new Error("useAuth must be within AuthProvider");
    return ctx

}