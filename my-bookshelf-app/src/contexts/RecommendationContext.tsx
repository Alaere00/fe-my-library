import { useEffect, createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { BookSearchResult } from "@/components/types/BookResponseTypes";
import { useAuth } from "./AuthContext";


interface RecommendationContextType {
    recommendationResult: BookSearchResult | undefined;
    loading: boolean;
    err: unknown;
}

const RecommendationContext = createContext<RecommendationContextType | null>(null)

export const RecommendationProvider = ({ children }: { children: ReactNode}) => {
    const [recommendationResult, setRecResult] = useState<BookSearchResult>()
    const [loading, setLoading ] = useState<boolean>(true)
    const [err, setErr] = useState<unknown>()
    const { isAuthenticated }  = useAuth()



    useEffect(() => {
            if (!isAuthenticated) {
                setRecResult(undefined);
                setErr(undefined);
                setLoading(false);
                return;
            }

            const token = sessionStorage.getItem("accessToken");
            if (!token) {
                setLoading(false);
                return;
            }

            const controller = new AbortController()
            setLoading(true);
            setErr(undefined);

            async function load() {
                try {
                    const res = await fetch(`http://localhost:8000/my-bookshelf/recommendations?limit=25`, {
                        method: "POST", headers: {
                            "Authorization": `Bearer ${token}`},
                            signal: controller.signal,
                    })
                    if (!res.ok) throw new Error(`Request failed: ${res.status}`)
                    setRecResult(await res.json())
                } catch (error) {
                    if (!controller.signal.aborted) setErr(error)
                } finally {
                    if (!controller.signal.aborted) setLoading(false)
                }
            }
        load()
        return () => controller.abort()
    }, [isAuthenticated])


    return (
        <RecommendationContext.Provider value={{ recommendationResult, loading, err }} >
            { children }
        </RecommendationContext.Provider>
    )
}

export const useRecommendation = () => {
    const ctx = useContext(RecommendationContext)
    return ctx

}