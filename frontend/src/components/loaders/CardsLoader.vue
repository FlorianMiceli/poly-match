<script setup lang='ts'>
defineProps<{
    cardsCount: number
}>()
</script>
<template>
    <div class="flex flex-col space-y-6">
        <Skeleton
            v-for="index in cardsCount"
            :key="index"
            class="h-[125px] rounded-xl"
        />
    </div>
</template>