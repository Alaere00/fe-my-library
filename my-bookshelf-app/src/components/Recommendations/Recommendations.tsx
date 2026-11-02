import { useRecommendation } from "@/hooks/useRecommendations"
import { BookCardComponent } from "../CardComponent/BookCardComponent"


export const Recommendations = () => {
    const {recommendationResult }  = useRecommendation()

    const books = recommendationResult?.hits ?? []
    if (books.length === 0) return null

    return (
        <div className="recommendations">
            <h1 className="ms-30 text-sm">Recommended For You</h1>

            {books?.map((book) => (
                <div className="flex flex-wrap ms-30 mt-4">
                    {/* <p>Found: {book?.found}</p>    */}
                <BookCardComponent
                    key={book?.id}
                    image={book?.image?.url}
                    genres={book?.genres}
                    authors={book?.authors}
                    title={book?.title}
                    publishedYear={book?.release_year}
                    numberOfPages={book?.pages}
                    id={book?.id}/>
                </div>))}
            </div>
    
    )
}