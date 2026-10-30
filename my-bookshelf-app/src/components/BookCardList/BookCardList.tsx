import React from "react"
import { ListItem } from "@fluentui/react-components"
import type { BookSearchResult } from "../types/BookResponseTypes"
import "./BookCard.css"
import { BookCardComponent } from "../CardComponent/BookCardComponent"

interface BookListProps {
    results: BookSearchResult
}

const BookResultListComponent = ({ results }: BookListProps  ) => {
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
        />
        ))}
        </ListItem>
    </>
    

    )
}

export default BookResultListComponent;