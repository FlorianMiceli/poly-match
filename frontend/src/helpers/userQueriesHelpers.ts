import { queries } from "@/queries"
import { useQuery } from "@tanstack/vue-query"
import { UserCreationForm } from "@/types/global_types"
import { error } from "./display"

export const createAccount = (data: Ref<UserCreationForm | null>) => {
    return useQuery({
        // @ts-expect-error reactivity ts error
        ...queries.user.create_account(data),
        throwOnError: () => {
            error("Erreur","Erreur lors de la création du compte, réessayez plus tard")
            return true
        },
        enabled: () => data.value !== null
    })
}

export const getProfilePicture = (instagramUsername: string) => {
    return useQuery({
        ...queries.user.get_profile_picture(instagramUsername),
        throwOnError: () => {
            error("Erreur","Erreur lors de la récupération de l'image de profil, réessayez plus tard")
            return true
        },
    })
}