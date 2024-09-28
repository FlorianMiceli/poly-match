import { createQueryKeys } from "@lukemorales/query-key-factory";
import { refreshAccessToken, spotifyApiGet } from "@/spotifyApi";

export const spotify = createQueryKeys("spotify", {
    access_token: {
        queryKey: null,
        queryFn: async () => {
            return await refreshAccessToken();
        },
    },
    search_song: (songName: Ref<string>, token: Ref<string>) => ({
        queryKey: [songName],
        queryFn: async () => {
            const response = await spotifyApiGet(
                `/search`,
                unref(token), 
                {
                    q: unref(songName), 
                    type: "track", 
                    limit: 5
                } as SpotifyApi.SearchForItemParameterObject 
            ) as SpotifyApi.TrackSearchResponse
            return response
        }
    }),
});