import { queries } from "@/queries"
import { useQuery } from "@tanstack/vue-query"
import { error } from "@/helpers/display"

export const getAccessToken = () => {
    return useQuery({
        ...queries.spotify.access_token,
        throwOnError: () => {
            error("Erreur","Erreur lors de l'accès à l'API Spotify")
            return true
        },
    })
}

export const searchSong = (songName: Ref<string>, token: Ref<string | undefined>) => {
    // @ts-expect-error 
    return useQuery({
        ...queries.spotify.search_song(songName, token as Ref<string>),
        throwOnError: () => {
            error("Erreur","Erreur lors de la recherche de la chanson")
            return true
        },
        enabled: () => token.value !== undefined && songName.value.length > 0
    })
}

export const searchArtist = (artistName: Ref<string>, token: Ref<string | undefined>) => {
    // @ts-expect-error 
    return useQuery({
        ...queries.spotify.search_artist(artistName, token as Ref<string>),
        throwOnError: () => {
            error("Erreur","Erreur lors de la recherche de l'artiste")
            return true
        },
        enabled: () => token.value !== undefined && artistName.value.length > 0
    })
}   
