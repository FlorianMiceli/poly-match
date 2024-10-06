<script setup lang="ts">
import * as z from 'zod'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { DependencyType } from '../shadcn-components/ui/auto-form/interface';
import { createAccount } from '../helpers/userQueriesHelpers';
import { UserCreationForm } from '../types/global_types';
import { useRouter } from 'vue-router';
const router = useRouter()

const school_years = ['PEIP1', 'PEIP2', 'PEIPC', 'ET3', 'ET4', 'ET5', 'APP3', 'APP4', 'APP5', 'FC'] as const
const school_majors = ['INFO', 'MTX', 'PSO', 'EIE'] as const

const formData = ref<UserCreationForm | null>(null)
const { data: createAccountData, isLoading: createAccountIsLoading } = createAccount(formData)

const formSchema = z.object({
  first_name: z.string().min(2).max(50),
  last_name: z.string().min(2).max(50),
  instagram_username: z.string().min(2).max(50),
  school_year: z.enum(school_years),
  school_major: z.enum(school_majors).optional(),
  email: z.string().email(),
  password: z.string().min(8).max(50),
})

const form = useForm({
  validationSchema: toTypedSchema(formSchema)
})

watch(createAccountData, (data) => {if (data) router.push('/user')})
</script>
<template>
  <div class="m-8 mb-12">
      <div class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-8">
        <h1>Créer un compte</h1>
      </div>
      <AutoForm
        class="space-y-4"
        :form="form"
        :schema="formSchema"
        @submit="formData = ($event as UserCreationForm)"
        :field-config="{
            first_name: {
                label: 'Prénom'
            },
            last_name: {
                label: 'Nom'
            },
            instagram_username: {
                label: '@ Instagram'
            },
            school_major: {
                label: 'Spé'
            },
            school_year: {
                label: 'Année'
            },
            password: {
                inputProps: {
                    type: 'password',
                },
            }
        }"
        :dependencies="[{
            sourceField: 'school_year',
            type: DependencyType.HIDES,
            targetField: 'school_major',
            when: (school_year: string) => ['PEIP1', 'PEIP2', 'PEIPC'].includes(school_year)
        }]"
      >
        <AsyncButton type="submit" class="mt-4" label="Créer mon compte" :loading="createAccountIsLoading" />
      </AutoForm>
  </div>
</template>
