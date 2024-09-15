<script setup lang="ts">
import * as z from 'zod'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'

const school_years = ['PEIP1', 'PEIP2', 'PEIPC', 'ET3', 'ET4', 'ET5', 'APP3', 'APP4', 'APP5', 'FC']
const school_majors = ['INFO', 'MTX', 'PSO', 'EIE']

const formSchema = z.object({
  first_name: z.string().min(2).max(50),
  last_name: z.string().min(2).max(50),
  instagram_username: z.string().min(2).max(50),
  school_year: z.enum(school_years),
  school_major: z.enum(school_majors),
  email: z.string().email(),
  password: z.string().min(8).max(50),
})

const form = useForm({
  validationSchema: toTypedSchema(formSchema)
})

const onSubmit = () => {
    console.log('submit')
}
</script>
<template>
  <div class="flex flex-col items-center justify-center h-screen">
      <div class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-8">
        <h1>Create Account</h1>
      </div>
      <AutoForm
        :form="form"
        :schema="formSchema"
        @submit="onSubmit"
      />
  </div>
</template>
