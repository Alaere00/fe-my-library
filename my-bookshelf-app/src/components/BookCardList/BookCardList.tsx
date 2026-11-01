import { useState } from "react";
import { ListItem } from "@fluentui/react-components"
import type { BookInfo, BookSearchResult } from "../types/BookResponseTypes"
import "./BookCard.css"
import { BookCardComponent } from "../CardComponent/BookCardComponent"
import { handleSetRating } from "@/services/BookService";

interface BookListProps {
    results: BookSearchResult
    rating?: number;
    handleRating?: (rating: number) => void;
    readingStatus?: string;
    onStatusChange?: (status: string) => void;
}

const BookResultListComponent = ({ results }: BookListProps ) => {
    const [statuses, setStatus] = useState<Record<number, string>>({})
    const [ratings, setRatings] = useState<Record<number, number>>({})

    const handleSetBookStatus = async(book: BookInfo, status: string) => {
        const previous = statuses[book.id];
        setStatus(s => ({ ...s, [book.id]: status}))

        try {
            const token = sessionStorage.getItem("accessToken");

            const res = await fetch(`http://localhost:8000/my-bookshelf/set-status`, {
                method: "POST", headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                }, body: JSON.stringify({ book, status })


            });
            if (!res.ok) throw new Error(await res.text());
        } catch (err) {
            console.error(err)
            setStatus(s => ({ ...s, [book.id]: previous}))

        }
    }


    async function handleRating(book: BookInfo, rating: number| null) {
        const previous = ratings[book.id]
        setRatings(r => {
            const next = {...r};
            if (rating) next[book.id] = rating
            else delete next[book.id];
            return next
        });
        try {
            await handleSetRating(book.id, rating)
        } catch (err){
            setRatings(r => {
                const next = {...r};
                if (previous) next[book.id] = previous
                else delete next[book.id]
                return next
            }

            );
        }
    }
  
    return (
        <>
    <ListItem>
        {results?.hits?.map((info, index) => (
        <BookCardComponent
            key={index}
            image={info?.image?.url}
            genres={info?.genres}
            authors={info?.author_names}
            title={info?.title}
            publishedYear={info?.release_year}
            numberOfPages={info?.pages}
            id={info?.id}
            readingStatus={statuses[info.id]}
            onStatusChange={(status)=> {
                handleSetBookStatus(info, status)} }
            handleRating={val => handleRating(info, val)}
            rating={ratings[info.id]}
        />
        ))}
        </ListItem>
    </>
    

    )
}

export default BookResultListComponent;