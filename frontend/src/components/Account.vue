<script setup lang="ts">
import { getProfile } from "@/helpers/userQueriesHelpers";
import { User } from "@/types/global_types";
import { Plus } from "lucide-vue-next";
import { DrawerTrigger } from "vaul-vue";

const props = defineProps<{
    user: User;
}>();

const capitalizeFirstLetter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

const { data: profile, isLoading: profileLoading } = getProfile(props.user.id);
</script>
<template>

    <!-- TODO -->
    <!-- {{ profilePicture }}
    <img v-if="profilePicture" :src="profilePicture" alt="JPEG Image">
    <div>
        <iframe v-if="profilePicture" :src="profilePicture" width="100%" height="500px"></iframe>
    </div> -->

    <!-- Loader -->
    <template v-if="profileLoading">
        <div class="flex flex-col space-y-6">
            <div class="flex items-center">
                <Skeleton class="h-16 w-16 rounded-full mr-2" />
                <div class="space-y-2">
                    <Skeleton class="h-4 w-[250px]" />
                    <Skeleton class="h-4 w-[200px]" />
                </div>
            </div>
            <Skeleton class="h-[125px] rounded-xl" />
            <Skeleton class="h-[125px] rounded-xl" />
            <Skeleton class="h-[125px] rounded-xl" />
        </div>
    </template>
    <template v-else>
        <!-- User infos -->
        <div class="flex items-center">
            <Avatar class="mr-4 w-16 h-16">
                <AvatarImage src="" alt="@radix-vue" />
                <AvatarFallback>{{ user.first_name[0].toUpperCase() }}{{ user.last_name[0].toUpperCase() }}</AvatarFallback>
            </Avatar>
            <div class="text-xl font-medium">
                {{ capitalizeFirstLetter(user.first_name) }} {{ capitalizeFirstLetter(user.last_name) }}
                <div class="text-sm text-gray-500">{{ user.school_year }}{{ user.school_major ? ` - ${user.school_major}` : "" }}</div>
            </div>
        </div>
    
        <!-- Top Artistes -->
        <Card class="w-full mt-4 shadow-lg">
            <CardHeader>
                <CardTitle>Top Artistes</CardTitle>
                <!-- <CardDescription>Deploy your new project in one-click.</CardDescription> -->
            </CardHeader>
            <CardContent> {{ profile?.fav_artists }} </CardContent>
        </Card>
    
        <!-- Top Titres -->
        <Card class="w-full mt-4 shadow-lg">

            <!-- Header -->
            <CardHeader>
                <CardTitle>Top Titres</CardTitle>
                <!-- <CardDescription>Deploy your new project in one-click.</CardDescription> -->
            </CardHeader>

            <!-- List of songs -->
            <CardContent>
                <div v-if="profile?.fav_songs && profile.fav_songs.length > 0" class="flex flex-wrap gap-2 ">
                    <!-- TODO -->
                    <Song 
                        v-for="song in profile.fav_songs" 
                        :key="song.id" 
                        :song="song" 
                        :removeable="false" 
                    />
                </div>
                <p v-else class="text-gray-500">Aucun titre favori ajouté</p>
            </CardContent>
    
            <!-- TODO -->
            <CardFooter v-if="true">
                <Drawer>
                    <DrawerTrigger as-child>
                        <Button class="w-full"> <Plus class="mr-2 h-4 w-4" /> Ajouter un titre </Button>
                    </DrawerTrigger>
                    <DrawerContent>
                        <DrawerHeader>
                            <DrawerTitle>Ajouter une musique</DrawerTitle>
                        </DrawerHeader>
                        <!-- TODO -->
                        <div class="p-4" v-if="true">
                            <AddSongsSearchBar />
                        </div>
                    </DrawerContent>
                </Drawer>
            </CardFooter>
        </Card>
    
        <!-- Next Events -->
        <Card class="w-full mt-4 shadow-lg">
            <CardHeader>
                <CardTitle>Prochains concerts</CardTitle>
                <!-- <CardDescription>Deploy your new project in one-click.</CardDescription> -->
            </CardHeader>
            <CardContent> ksjdhfqsdfj </CardContent>
        </Card>
    </template>
</template>
