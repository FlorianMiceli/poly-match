import { queries } from "@/queries"
import { useQuery } from "@tanstack/vue-query"
import { error } from "./display"
import { Song } from "@/types/global_types"

export const getReleaseCover = (song: Song) => {
    return useQuery({
        ...queries.music.release_cover(song),
        throwOnError: () => {
            error("Erreur","Erreur lors de la récupération de la couverture de la release")
            return true
        }
    })
}


