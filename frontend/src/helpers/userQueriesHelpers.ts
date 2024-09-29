import { queries } from "@/queries"
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query"
import { UserCreationForm, UserProfile } from "@/types/global_types"
import { error } from "./display"
import { apiPost } from "@/api"
import { useUserStore } from "@/stores/user"

export const createAccount = (data: Ref<UserCreationForm | null>) => {
    // @ts-expect-error
    return useQuery({
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

export const getProfile = (user_id: string) => {
    return useQuery({
        ...queries.user.profile(user_id),
        throwOnError: () => {
            error("Erreur","Erreur lors de la récupération du profil, réessayez plus tard")
            return true
        },
        refetchOnMount: false
    })
}

export const updateProfile = () => {
    const queryClient = useQueryClient()
    const userStore = useUserStore()
    return useMutation({
        mutationFn: async (profile: UserProfile) => {
            queryClient.setQueryData(['user', 'profile', userStore.user?.id], profile)
            const res = await apiPost("user/updateProfile", {profile: profile, user_id: userStore.user?.id})
            return res
        },
        onError: () => {
            queryClient.invalidateQueries({ queryKey: ['user', 'profile', userStore.user?.id] })
        }
    })
}