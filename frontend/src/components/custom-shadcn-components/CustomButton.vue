<script setup lang="ts">
import { Loader2 } from "lucide-vue-next"
defineProps<{
    onClick: () => void
    text: string
    variant: 'outline' | 'destructive' | 'default'
    loading: Ref<boolean>
}>()

</script>
<template>
    <Button class="mb-2 w-full" @click="onClick" :variant="variant" :disabled="loading.value">
        <slot v-if="!loading.value"/>
        <Loader2 v-else class="mr-2 h-4 w-4 animate-spin" />
        {{ text }}
    </Button>
</template>
