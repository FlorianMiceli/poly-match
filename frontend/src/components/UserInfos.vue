<script setup lang="ts">

defineProps<{
    first_name: string;
    last_name: string;
    school_year: string;
    school_major: string | null;
}>()

const capitalizeFirstLetter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
</script>
<template>
    <div class="flex items-center mb-4">
        <Avatar class="mr-4 w-16 h-16 ml-2 my-1">
            <AvatarImage src="" alt="@radix-vue" />
            <AvatarFallback>{{ first_name[0].toUpperCase() }}{{ last_name[0].toUpperCase() }}</AvatarFallback>
        </Avatar>
        <div class="text-xl font-medium">
            {{ capitalizeFirstLetter(first_name) }} {{ capitalizeFirstLetter(last_name) }}
            <div class="text-sm text-gray-500">{{ school_year }}{{ school_major ? ` - ${school_major}` : "" }}</div>
        </div>
    </div>
</template>
