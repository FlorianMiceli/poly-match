<script setup lang='ts'>
import { AlertCircle } from 'lucide-vue-next'
defineProps<{
    title: string
    description: string
}>()
</script>
<template>
    <Alert variant="destructive">
        <AlertCircle class="w-4 h-4" />
        <AlertTitle>Erreur</AlertTitle>
        <AlertDescription>
            {{ description }}
        </AlertDescription>
    </Alert>
</template>