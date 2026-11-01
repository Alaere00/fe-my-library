import { useState, useEffect } from "react";
import { ListItem } from "@fluentui/react-components"
import type { BookInfo, BookSearchResult } from "../types/BookResponseTypes"
import "./BookCard.css"
import { BookCardComponent } from "../CardComponent/BookCardComponent"

interface BookListProps {
    results: BookSearchResult
    rating?: number;
    handleRating?: (rating: number) => void;
    readingStatus?: string;
    onStatusChange?: (status: string) => void;
}

const BookResultListComponent = ({ results }: BookListProps ) => {
    const [statuses, setStatus] = useState<Record<number, string>>({})
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


//     useEffect(() => {

//         (async() => {
//         const token = sessionStorage.getItem("accessToken");
//         const res = await fetch(`http://localhost:8000/my-bookshelf`, {
//         method: "GET", headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${token}`,
//         },
//     })
//     setTemp(await res.json())


// })()

//     }, [])

//     console.log(temp)

    // const res = await fetch(`http://localhost:8000/my-bookshelf/rating`, {
    //     method: "PATCH", headers: {
    //         "Content-Type": "application/json",
    //         "Authorization": `Bearer ${token}`,
    //     }, body: JSON.stringify({ rating })

           
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
        />
        ))}
        </ListItem>
    </>
    

    )
}

export default BookResultListComponent;