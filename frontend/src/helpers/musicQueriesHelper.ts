import { queries } from "@/queries"
import { useQuery } from "@tanstack/vue-query"
import { error } from "./display"

export const searchSong = (songName: Ref<string>) => {
    return useQuery({
        ...queries.music.search_song(songName),
        throwOnError: () => {
            error("Erreur","Erreur lors de la recherche de la chanson")
            return true
        },
        enabled: () => songName.value.length > 0
    })
}