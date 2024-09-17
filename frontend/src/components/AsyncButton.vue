<script setup lang='ts'>
import { Loader2 } from 'lucide-vue-next'

defineProps<{
    loading: boolean
    label: string
}>()

const emit = defineEmits(['click'])

const click = () => emit('click')
</script>
<template>
    <Button :disabled="loading" @click="click">
        <Loader2 v-if="loading" class="w-4 h-4 mr-2 animate-spin" />
        {{ label }}
    </Button>
</template>