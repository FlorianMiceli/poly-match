import { queries } from "@/queries";
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { UserCreationForm, UserProfile } from "@/types/global_types";
import { error } from "./display";
import { apiPost, apiPostFile } from "@/api";
import { useUserStore } from "@/stores/user";

export const createAccount = (data: Ref<UserCreationForm | null>) => {
    // @ts-expect-error
    return useQuery({
        ...queries.user.create_account(data),
        throwOnError: () => {
            error("Erreur", "Erreur lors de la création du compte, réessayez plus tard");
            return true;
        },
        enabled: () => data.value !== null,
    });
};

export const getProfile = (user_id: string) => {
    return useQuery({
        ...queries.user.profile(user_id),
        throwOnError: () => {
            error("Erreur", "Erreur lors de la récupération du profil, réessayez plus tard");
            return true;
        },
        refetchOnMount: false,
    });
};

export const getUser = (user_id: string) => {
    return useQuery({
        ...queries.user.get_user(user_id),
        throwOnError: () => {
            error("Erreur", "Erreur lors de la récupération du profil, réessayez plus tard");
            return true;
        },
        refetchOnMount: false,
    });
};

export const getSongMatches = (user_id: string, user_profile: Ref<UserProfile | undefined>) => {
    return useQuery({
        ...queries.user.get_song_matches(user_id),
        throwOnError: () => {
            error("Erreur", "Erreur lors de la récupération des matchs musicaux, réessayez plus tard");
            return true;
        },
        enabled: () => user_profile.value !== undefined,
    });
};
export const updateProfile = () => {
    const queryClient = useQueryClient();
    const userStore = useUserStore();
    return useMutation({
        mutationFn: async (profile: UserProfile) => {
            queryClient.setQueryData(["user", "profile", userStore.user?.id], profile);
            const res = await apiPost("user/updateProfile", { profile: profile, user_id: userStore.user?.id });
            return res;
        },
        onError: () => {
            queryClient.invalidateQueries({ queryKey: ["user", "profile", userStore.user?.id] });
        },
    });
};

export const getProfilePicture = (user_id: string) => {
    return useQuery({
        ...queries.user.get_profile_picture(user_id),
        refetchOnMount: false,
    });
};

export const updateProfilePicture = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (profile_picture: File ) => await apiPostFile("user/updateProfilePicture", profile_picture),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["user", "get_profile_picture"] })
    });
};

export const deleteProfilePicture = () => {
    const queryClient = useQueryClient();
    const userStore = useUserStore();
    return useMutation({
        mutationFn: async () => await apiPost("user/deleteProfilePicture", { user_id: userStore.user?.id }),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["user", "get_profile_picture"] })
    });
};

