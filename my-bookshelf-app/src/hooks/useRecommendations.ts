import { BookSearchResult } from "@/components/types/BookResponseTypes";
import { useState, useEffect } from "react";

export function useRecommendation(limit: number = 25){
    const [recommendationResult, setRecResult] = useState<BookSearchResult>()
    const [loading, setLoading ] = useState<boolean>(true)
    const [err, setErr] = useState()

    useEffect(() => {
            const token = sessionStorage.getItem("accessToken");
            if (!token) {
                setLoading(false);
                return
            }
            
            const controller = new AbortController()

            async function load() {
                try {
                    const res = await fetch(`http://localhost:8000/my-bookshelf/recommendations?limit=${limit}`, {
                        method: "POST", headers: {
                            "Authorization": `Bearer ${token}`},
                            signal: controller.signal,
                    })
                    if (!res.ok) throw new Error(`Request failed: ${res.status}`)
                    setRecResult(await res.json())
                } catch (error) {
                    if (error.name !== "AbortError") setErr(error)
                } finally {
                    setLoading(false)
                }
            }
        load()
        return () => controller.abort()
    }, [limit])

    return { recommendationResult, loading, err } 

}