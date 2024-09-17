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