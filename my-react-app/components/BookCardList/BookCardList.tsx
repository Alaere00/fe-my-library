import React from "react"
import {
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
    
    return (
        <>
        <ListItem
        >
                  {results?.items?.map((info, index) => (<Card className="book-card" key={index}>
                    <CardHeader 
                        key={index} 
                        title={info.volumeInfo.title}
                        image={
                            <img
                              className="image-styles"
                              src={info.volumeInfo.imageLinks?.thumbnail ?? "..../src/assets/no-image.png"}
                 
                              alt=""
                            />
                          }
                    
                    
                    >

                    </CardHeader>
                  </Card>))}

        </ListItem>
    </>
    )

}

export default BookResultListComponent;