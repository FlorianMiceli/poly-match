

type SpotifyTokenResponse = {
    access_token: string;
    token_type: string;
    expires_in: number;
};


export async function refreshAccessToken() {
    try {
        const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
        const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

        const response = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`,
        });

        if (!response.ok) {
            throw new Error("Failed to refresh access token");
        }

        const tokenData: SpotifyTokenResponse = await response.json();
        return tokenData.access_token;
    } catch (error) {
        console.error("Error refreshing Spotify access token:", error);
        throw error;
    }
}

export async function spotifyApiGet(endpoint: string, token: string, params?: any): Promise<any> {
    const url = new URL(`https://api.spotify.com/v1${endpoint}`);

    if (params) {
        Object.keys(params).forEach((key) => {
            if (typeof params[key as keyof typeof params] === "string") {
                url.searchParams.append(key, params[key as keyof typeof params] as string);
            }
        });
    }

    const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        switch (response.status) {
            case 401:
                // Unauthorized: Invalid Spotify access token
                throw new Error("Problème avec l'API Spotify, rechargez l'app");
            case 403:
                // Forbidden: Insufficient scope
                throw new Error("Problème avec l'API Spotify, rechargez l'app");
            case 429:
                // Too many requests: Rate limit exceeded   
                throw new Error("Limite de requêtes Spotify atteinte, attendez 30 secondes");
            default:
                throw new Error(`Spotify API error: ${response.statusText}`);
        }
    }

    return response.json();
}
