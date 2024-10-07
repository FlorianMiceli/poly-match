<script setup lang='ts'>
defineProps<{
    title: string
    description?: string
}>()
</script>
<template>
    <Card class="flex-grow basis-[calc(33.333%-1rem)] min-w-[300px] shadow-2xl flex flex-col">
        <CardHeader>
            <CardTitle>
                {{ title }}
            </CardTitle>
            <CardDescription>
                {{ description }}
            </CardDescription>
        </CardHeader>
        <CardContent class="flex-grow">
            <slot />
        </CardContent>
        <CardFooter v-if="$slots.footer">
            <slot name="footer" />
        </CardFooter>
    </Card>
</template>