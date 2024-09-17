<script setup lang='ts'>
import { User } from '@/types/global_types';

defineProps<{
    user_data: User 
}>()

const capitalizeFirstLetter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
</script>
<template>
    <div class="flex items-center">
        <Avatar class="mr-4 w-16 h-16">
            <AvatarImage src="https://scontent-cdg4-1.cdninstagram.com/v/t51.2885-19/448021750_2038560433206788_1640816194731066395_n.jpg?stp=dst-jpg_s150x150&_nc_ht=scontent-cdg4-1.cdninstagram.com&_nc_cat=108&_nc_ohc=XFnKR_1xuKYQ7kNvgHscTAc&_nc_gid=92eff89855104a70b46fdc617f03b52b&edm=AIhb9MIBAAAA&ccb=7-5&oh=00_AYAD2UP9PBE9-4h7XuxGMEtLOGs0-wqNJZjMKXHCxHYPZg&oe=66EFAC45&_nc_sid=8aafe2" alt="@radix-vue" />
            <AvatarFallback>{{ user_data.first_name[0].toUpperCase() }}{{ user_data.last_name[0].toUpperCase() }}</AvatarFallback>
        </Avatar>
        <div class="text-xl font-medium">
            {{ capitalizeFirstLetter(user_data.first_name) }} {{ capitalizeFirstLetter(user_data.last_name) }}
            <div class="text-sm text-gray-500">
                {{ user_data.school_year }}{{ user_data.school_major ? ` - ${user_data.school_major}` : '' }}
            </div>
        </div>
    </div>
</template>