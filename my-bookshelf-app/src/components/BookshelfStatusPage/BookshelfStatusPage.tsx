import { useShelfBooks } from "@/hooks/useShelfBooks"
import { Link, useNavigate, useParams } from "react-router-dom"
import { BookCardComponent } from "../CardComponent/BookCardComponent"
import { tabs } from "../types/tabs"
import { Tabs } from "@/untitled-components/application/tabs/tabs"

export function BookshelfStatusPage() {
    const { status } = useParams()
    const navigate = useNavigate()
    const getBooks = useShelfBooks()

    const tab = tabs.find((t) => t.id === status)
    if (!tab) return <p className="ms-30 mt-7">No title in this shelf.</p>
    const books = getBooks(tab.id)

    return (
            <div className="ms-30 mt-7 me-8">

            <Link to="/bookshelf" className="text-gray-500">← My Shelf</Link>
            <h1 className="mt-2 font-semibold text-display-sm">
                {tab.label} ({books.length})
            </h1>
             <div className="flex flex-wrap ms-30 mt-4 gap-4">
                {books.map((book) =>    
                <BookCardComponent
                    key={book.id}
                    image={book?.image?.url}
                    genres={book?.genres}
                    authors={book?.authors}
                    title={book?.title}
                    publishedYear={book?.release_year}
                    numberOfPages={book?.pages}
                    id={book?.id}/>)}
                </div>
            </div>
        )
}