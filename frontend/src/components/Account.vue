<script setup lang='ts'>
import { getProfilePicture } from '@/helpers/userQueriesHelpers';
import { User } from '@/types/global_types';
import { Plus } from 'lucide-vue-next';
import { DrawerTrigger } from 'vaul-vue'

defineProps<{
    user_data: User 
}>()

const capitalizeFirstLetter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
// const { data: profilePicture } = getProfilePicture('f_mcl')


</script>
<template>
    <!-- TODO -->
    <!-- {{ profilePicture }}
    <img v-if="profilePicture" :src="profilePicture" alt="JPEG Image">
    <div>
        <iframe v-if="profilePicture" :src="profilePicture" width="100%" height="500px"></iframe>
    </div> -->

    <!-- User Info -->
    <div class="flex items-center">
        <Avatar class="mr-4 w-16 h-16">
            <AvatarImage src="" alt="@radix-vue" />
            <AvatarFallback>{{ user_data.first_name[0].toUpperCase() }}{{ user_data.last_name[0].toUpperCase() }}</AvatarFallback>
        </Avatar>
        <div class="text-xl font-medium">
            {{ capitalizeFirstLetter(user_data.first_name) }} {{ capitalizeFirstLetter(user_data.last_name) }}
            <div class="text-sm text-gray-500">
                {{ user_data.school_year }}{{ user_data.school_major ? ` - ${user_data.school_major}` : '' }}
            </div>
        </div>
    </div>

    <!-- Top Artistes -->
    <Card class="w-full mt-4">
        <CardHeader>
            <CardTitle>Top Artistes</CardTitle>
            <!-- <CardDescription>Deploy your new project in one-click.</CardDescription> -->
        </CardHeader>
        <CardContent>
            ksjdhfqsdfj
        </CardContent>
    </Card>

    <!-- Top Titres -->
    <Card class="w-full mt-4">
        <CardHeader>
            <CardTitle>Top Titres</CardTitle>
            <!-- <CardDescription>Deploy your new project in one-click.</CardDescription> -->
        </CardHeader>
        <CardContent>
            ksjdhfqsdfj
        </CardContent>

        <!-- TODO -->
        <CardFooter v-if="true">
            <Drawer>
                <DrawerTrigger as-child>
                    <Button class="w-full">
                        <Plus class="mr-2 h-4 w-4" /> Ajouter un artiste
                    </Button>
                </DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>Ajouter une musique</DrawerTitle>
                    </DrawerHeader>
                    <div class="p-4">
                        <AddSongsSearchBar @add-song="console.log($event)" />
                    </div>
                </DrawerContent>
            </Drawer>
        </CardFooter>
    </Card>

    <!-- Next Events -->
    <Card class="w-full mt-4">
        <CardHeader>
            <CardTitle>Prochains concerts</CardTitle>
            <!-- <CardDescription>Deploy your new project in one-click.</CardDescription> -->
        </CardHeader>
        <CardContent>
            ksjdhfqsdfj
        </CardContent>
    </Card>
</template>