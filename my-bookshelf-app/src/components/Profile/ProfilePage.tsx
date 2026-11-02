import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export function ProfilePage() {
    const { logout, updateTokens } = useAuth();
    const navigate = useNavigate();
    const [profile, setProfile] = useState<unknown>();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string>();

    useEffect(() => {
        const controller = new AbortController();

        async function loadProfile() {
            const accessToken = sessionStorage.getItem("accessToken");
            const refreshToken = sessionStorage.getItem("refreshToken");

            if (!accessToken || !refreshToken) {
                setError("Your session is missing its tokens. Please sign in again.");
                setIsLoading(false);
                return;
            }

            try {
                const response = await fetch("http://localhost:8000/my-bookshelf/profile", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "X-Refresh-Token": refreshToken,
                    },
                    signal: controller.signal,
                });

                if (response.status === 401) {
                    logout();
                    navigate("/sign-in", {
                        replace: true,
                        state: { message: "Your session expired. Please sign in again." },
                    });
                    return;
                }

                if (!response.ok) {
                    throw new Error(`Profile request failed (${response.status}).`);
                }

                const nextAccessToken = response.headers.get("X-New-Access-Token");
                const nextRefreshToken = response.headers.get("X-New-Refresh-Token");
                if (nextAccessToken && nextRefreshToken) {
                    updateTokens(nextAccessToken, nextRefreshToken);
                }

                setProfile(await response.json());
            } catch (requestError) {
                if (!controller.signal.aborted) {
                    setError(requestError instanceof Error ? requestError.message : "Unable to load your profile.");
                }
            } finally {
                if (!controller.signal.aborted) setIsLoading(false);
            }
        }

        void loadProfile();
        return () => controller.abort();
    }, [logout, navigate, updateTokens]);

    return (
        <main className="mx-auto w-full max-w-3xl px-4 py-8">
            <h1 className="mb-6 text-display-sm font-semibold text-primary">Profile</h1>
            {isLoading && <p role="status">Loading profile...</p>}
            {error && <p role="alert" className="text-error-primary">{error}</p>}
            {profile !== undefined && (
                <pre className="overflow-x-auto whitespace-pre-wrap break-words rounded-lg bg-secondary p-4 text-sm text-primary">
                    {JSON.stringify(profile, null, 2)}
                </pre>
            )}
        </main>
    );
}