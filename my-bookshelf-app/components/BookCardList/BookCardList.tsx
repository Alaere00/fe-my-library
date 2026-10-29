import { useState } from "react"
import {
    ListItem, 

} from "@fluentui/react-components"
import type { BookSearchResult } from "../types/BookResponseTypes"
import { Star28Regular, Star28Filled  } from "@fluentui/react-icons"
import "./BookCard.css"
import { BookCardComponent } from "../CardComponent/BookCardComponent"

interface BookListProps {
    results: BookSearchResult
}

const BookResultListComponent = ({ results }: BookListProps  ) => {
    const [isFavorite, setIsFavorite] = useState<Set<string>>(new Set());
    const maxLength: number = 200;


    const handleFavoriteClick = (id: string) => {
        // Implement your logic to handle the favorite click event here
        setIsFavorite(prev => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
        console.log(`Favorite clicked for book at index: ${id}`);
        console.log(isFavorite)
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
        />
        ))}


        {/* <Button style={{ border: "none"}} key={info.id} onClick={() => handleFavoriteClick(info.id)} icon={isFavorite.has(info.id)? <Star28Filled /> : <Star28Regular/>} /> */}
     
   
    
           
        </ListItem>
    </>
    

    )
}

export default BookResultListComponent;