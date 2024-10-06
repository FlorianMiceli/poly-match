<script setup lang="ts">
import * as z from 'zod'
import { useForm } from 'vee-validate'
import { useRouter } from 'vue-router';
import { toTypedSchema } from '@vee-validate/zod'
import { useMutation, useIsMutating } from '@tanstack/vue-query';
import { useUserStore } from '../stores/user';
import { error, info } from '../helpers/display';
import { apiPost } from '../api';

const router = useRouter()
const userStore = useUserStore()

if(userStore.user && Object.keys(userStore.user).length > 0){
    info("Info","Vous êtes déjà connecté")
    router.push('/user')
}

const loginMutation = useMutation({
    mutationFn: async (creds: { email: string; password: string }) => {
        const { email, password } = creds;
        const res = await apiPost("user/login", { email, password });
        return res;
    },
    onSuccess: (data) => {
        userStore.user = data.data
        router.push('/user')
    },
    onError: () => {
        error("Erreur","Mauvais identifiants")
    }
})

const isMutating = useIsMutating()

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(50),
})

const form = useForm({
  validationSchema: toTypedSchema(formSchema)
})


</script>

<template>
    <div class="flex justify-center items-center mx-4 min-h-[calc(100vh-48*2px)]">
        <Card class="w-full max-w-sm shadow-2xl">
            <CardHeader>
                <CardTitle class="text-4xl font-extrabold lg:text-5xl">
                Se connecter
                </CardTitle>
            </CardHeader>
            <CardContent class="grid gap-4">
                <AutoForm
                    class="space-y-4"
                    :form="form"
                    :schema="formSchema"
                    @submit="loginMutation.mutate($event)"
                    :field-config="{
                        email: {
                            label: 'Email'
                        },
                        password: {
                            label: 'Mot de passe',
                            inputProps: {
                                type: 'password',
                            },
                        },
                    }"
                >
                    <AsyncButton type="submit" class="mt-4 w-full" label="Se connecter" :loading="isMutating > 0" />
                </AutoForm>
                <div class="text-center text-sm">
                    Pas de compte ?
                    <a href="/signup" class="underline">
                        S'inscrire
                    </a>
                </div>
            </CardContent>
        </Card>
    </div>
</template>

