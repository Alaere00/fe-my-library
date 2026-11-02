import { useBookshelf } from "@/contexts/BookShelfContext";

export function useShelfBooks() {
    const { bookshelf, bookInfo} = useBookshelf()

    return (statusId: string) => 
        (bookshelf ?? []).filter((row) => row.status === statusId)
    .map((row) => bookInfo?.find((b) => String(b.id) === row.book_id))
    .filter(Boolean)
}