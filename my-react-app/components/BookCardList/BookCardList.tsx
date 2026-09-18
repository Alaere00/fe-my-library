import React from "react"
import {
    Button,
    Card,
    CardHeader,
    ListItem, 

} from "@fluentui/react-components"
import type { TitleResponse } from "../types/BookResponseTypes"
import "./BookCard.css"

interface BookListProps {
    results: TitleResponse
}

const BookResultListComponent = ({ results }: BookListProps  ) => {
    const maxLength: number = 200;

    return (
        <>
    <ListItem>
        {results?.items?.map((info, index) => {
        const description = info.volumeInfo.description?.substring(0, maxLength) ?? "No description available.";
        return (
        <Card className="book-card" key={index}>            
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

        <Button style={{ width: 16, height: 16}} shape="circular">Read More</Button>
        </Card>)})}

           
        </ListItem>
    </>
    

    )
}

export default BookResultListComponent;