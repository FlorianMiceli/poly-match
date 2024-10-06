<script setup lang='ts'>
defineProps<{
    title: string
}>()
</script>
<template>
    <Card class="flex-grow basis-[calc(33.333%-1rem)] min-w-[300px] shadow-2xl flex flex-col">
        <CardHeader>
            <CardTitle>
                {{ title }}
            </CardTitle>
        </CardHeader>
        <CardContent class="flex-grow">
            <slot />
        </CardContent>
    </Card>
</template>