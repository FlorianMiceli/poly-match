<script setup lang="ts">
import { info } from '@/helpers/display';
import { ArrowUpRight } from 'lucide-vue-next';

const props = defineProps<{
    first_name: string;
    last_name: string;
    school_year: string;
    school_major: string | null;
    instagram_username: string;
}>()

const capitalizeFirstLetter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
const openInstagram = () => {
    if(props.instagram_username) 
        window.open(`https://www.instagram.com/${props.instagram_username}`, '_blank')
    else info("Info", "Aucun compte Instagram trouvé")
}
</script>
<template>
    <div class="flex flex-row items-center justify-between mb-4">
        <div class="flex flex-row items-center">
            <Avatar class="mr-4 w-16 h-16 ml-2 my-1">
                <AvatarImage src="" alt="@radix-vue" />
                <AvatarFallback>{{ first_name[0].toUpperCase() }}{{ last_name[0].toUpperCase() }}</AvatarFallback>
            </Avatar>
            <div class="text-xl font-medium">
                {{ capitalizeFirstLetter(first_name) }} {{ capitalizeFirstLetter(last_name) }}
                <div class="text-sm text-gray-500">{{ school_year }}{{ school_major ? ` - ${school_major}` : "" }}</div>
            </div>
        </div>
        <Button @click="openInstagram" variant="outline" class="mr-4">
            <Instagram />
            <ArrowUpRight class="ml-2" />
        </Button>
    </div>
</template>
