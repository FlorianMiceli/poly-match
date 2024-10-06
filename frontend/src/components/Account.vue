<script setup lang="ts">
import { getProfile } from "@/helpers/userQueriesHelpers";
import { User } from "@/types/global_types";
import { Plus } from "lucide-vue-next";
import { DrawerTrigger } from "vaul-vue";
import { useUserStore } from "@/stores/user";
import { useQueryClient } from "@tanstack/vue-query";

const queryClient = useQueryClient()
const router = useRouter()
const userStore = useUserStore()

const props = defineProps<{
    user: User;
    isUserProfile: boolean;
}>();


const { data: profile, isLoading: profileLoading } = getProfile(props.user.id);

const logout = () => {
    userStore.user = null
    queryClient.invalidateQueries()
    router.push('/login')
}
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
        <UserInfos 
            :first_name="user.first_name"
            :last_name="user.last_name"
            :school_year="user.school_year"
            :school_major="user.school_major"
        />

        <!-- Flex container for the three main sections -->
        <div class="flex flex-wrap gap-4">
            <!-- Top Artistes -->
            <Card class="flex-grow basis-[calc(33.333%-1rem)] min-w-[300px] shadow-2xl flex flex-col">
                <!-- Header -->
                <CardHeader>
                    <CardTitle>👤 Top Artistes</CardTitle>
                </CardHeader>

                <!-- List of artists -->
                <CardContent class="flex-grow">
                    <div v-if="profile?.fav_artists && profile.fav_artists.length > 0" class="flex flex-wrap gap-2 ">
                        <Artist 
                            v-for="artist in profile.fav_artists" 
                            :key="artist.id" 
                            :artist="artist" 
                            :removeable="isUserProfile"
                            :user_id="user.id"
                        />
                    </div>
                    <p v-else class="text-gray-500">Aucun artiste favori ajouté</p>
                </CardContent>

                <!-- Add artist if user own profile -->
                <CardFooter v-if="isUserProfile" class="mt-auto">
                    <Drawer>
                        <DrawerTrigger as-child>
                            <Button class="w-full"> 
                                <Plus class="mr-2 h-4 w-4" /> 
                                Ajouter un artiste 
                            </Button>
                        </DrawerTrigger>
                        <DrawerContent>
                            <DrawerHeader>
                                <DrawerTitle>Ajouter un artiste</DrawerTitle>
                            </DrawerHeader>
                            <div class="p-4">
                                <AddArtistSearchBar />
                            </div>
                        </DrawerContent>
                    </Drawer>
                </CardFooter>
            </Card>

            <!-- Top Titres -->
            <Card class="flex-grow basis-[calc(33.333%-1rem)] min-w-[300px] shadow-2xl flex flex-col">
                <!-- Header -->
                <CardHeader>
                    <CardTitle>🎶 Top Titres</CardTitle>
                </CardHeader>

                <!-- List of songs -->
                <CardContent class="flex-grow">
                    <div v-if="profile?.fav_songs && profile.fav_songs.length > 0" class="flex flex-wrap gap-2 ">
                        <!-- TODO -->
                        <Song 
                            v-for="song in profile.fav_songs" 
                            :key="song.id" 
                            :song="song" 
                            :removeable="isUserProfile" 
                            :user_id="user.id"
                        />
                    </div>
                    <p v-else class="text-gray-500">Aucun titre favori ajouté</p>
                </CardContent>

                <!-- Add song if user own profile -->
                <CardFooter v-if="isUserProfile" class="mt-auto">
                    <Drawer>
                        <DrawerTrigger as-child>
                            <Button class="w-full"> <Plus class="mr-2 h-4 w-4" /> Ajouter un titre </Button>
                        </DrawerTrigger>
                        <DrawerContent>
                            <DrawerHeader>
                                <DrawerTitle>Ajouter une musique</DrawerTitle>
                            </DrawerHeader>
                            <div class="p-4">
                                <AddSongSearchBar />
                            </div>
                        </DrawerContent>
                    </Drawer>
                </CardFooter>
            </Card>

            <!-- Next Events -->
            <Card class="flex-grow basis-[calc(33.333%-1rem)] min-w-[300px] shadow-2xl flex flex-col">
                <CardHeader>
                    <CardTitle>Prochains concerts</CardTitle>
                    <!-- <CardDescription>Deploy your new project in one-click.</CardDescription> -->
                </CardHeader>
                <CardContent class="flex-grow">
                    Work in progress
                </CardContent>
            </Card>
        </div>

        <!-- Disconnect button -->
        <div class="flex justify-center mt-12">
            <Button variant="destructive" @click="logout()">Se déconnecter</Button>
        </div>
    </template>
</template>
