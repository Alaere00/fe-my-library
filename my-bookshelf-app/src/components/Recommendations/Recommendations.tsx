import { useRecommendation } from "@/contexts/RecommendationContext"
import { BookCardComponent } from "../CardComponent/BookCardComponent"
import "./Recommendations.css"


export const Recommendations = () => {
    const context = useRecommendation()
    if (!context) throw new Error("Recommendations must be rendered inside RecommendationProvider.")

    const { recommendationResult, loading, err } = context

    const books = recommendationResult?.hits ?? []
    const hasRecommendations = books.length > 0
    const errorMessage = err instanceof Error ? err.message : "Unable to load recommendations."

    return (
        <div className="recommendations">
            <h1 className="ms-10 mt-7 text-sm" style={{ fontWeight: "bold", fontSize: 20 }}>Recommended For You</h1>

            {loading && (
                <p role="status" aria-live="polite" className="ms-30 mt-4">
                    {hasRecommendations ? "Refreshing recommendations..." : "Loading recommendations..."}
                </p>
            )}
            {err && <p role="alert" className="ms-30 mt-4 text-error-primary">{errorMessage}</p>}
            {!loading && !err && !hasRecommendations && (
                <p className="ms-30 mt-4">No recommendations available yet.</p>
            )}
            {hasRecommendations && (
                <div className="recommendation-grid">
                    {books.map((book) => (
                        <BookCardComponent
                            key={book.id}
                            image={book?.image?.url}
                            genres={book?.genres}
                            authors={book?.author_names}
                            title={book?.title}
                            publishedYear={book?.release_year}
                            numberOfPages={book?.pages}
                            id={book?.id}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}