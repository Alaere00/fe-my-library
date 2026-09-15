import React from "react"
import {
    Card,
    CardHeader,
    ListItem, 

} from "@fluentui/react-components"
import type { TitleResponse } from "../types/BookResponseTypes"

interface BookListProps {
    results: TitleResponse
}

const BookResultListComponent = ({ results }: BookListProps  ) => {
    
    return (
        <>
        <ListItem
        >
                  {results?.items?.volumeInfo?.map((info, index) => (<Card key={index}>
                    <CardHeader key={index} title={info.title}>

                    </CardHeader>



                  </Card>))}

        </ListItem>
    </>
    )

}

export default BookResultListComponent;