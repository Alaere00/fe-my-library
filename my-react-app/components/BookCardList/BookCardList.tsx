import { useState } from "react"
import {
    Button,
    Card,
    CardHeader,
    ListItem, 

} from "@fluentui/react-components"
import type { TitleResponse } from "../types/BookResponseTypes"
import { Star28Regular, Star28Filled  } from "@fluentui/react-icons"
import "./BookCard.css"

interface BookListProps {
    results: TitleResponse
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
        {results?.items?.map((info, index) => {
        const description = info.volumeInfo.description?.substring(0, maxLength) ?? "No description available.";
        return (
        <Card className="book-card" key={index}> 
        <div className="card-header">

        <CardHeader 
            key={index} 
            header={<div><h4>{info.volumeInfo.title}
            </h4>
            { info?.volumeInfo?.authors &&
            <p key={index}>By: {info.volumeInfo?.authors?.join(', ')}</p>
        }
            </div>}  
            image={<img
                className="image-styles"
                src={info.volumeInfo.imageLinks?.thumbnail ?? "..../src/assets/no-image.png"}
            />}
            description={description}    

        />
        <Button style={{ border: "none"}} key={info.id} onClick={() => handleFavoriteClick(info.id)} icon={isFavorite.has(info.id)? <Star28Filled /> : <Star28Regular/>} />
   
        </div>           
   
        <Button style={{ width: 16, height: 16}} shape="circular">Read More</Button>
        </Card>)})
}
           
        </ListItem>
    </>
    

    )
}

export default BookResultListComponent;