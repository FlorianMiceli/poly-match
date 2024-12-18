<script setup lang="ts">
import { getProfile, getProfilePicture } from "@/helpers/userQueriesHelpers";
import type { User } from "@/types/global_types";
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

const { data: profile, isLoading: profileLoading, isError: profileError } = getProfile(props.user.id);
const { isLoading: profilePictureLoading } = getProfilePicture(props.user.id);

const logout = () => {
    userStore.user = null
    queryClient.invalidateQueries()
    router.push('/login')
}
</script>
<template>
    <!-- Loader -->
    <template v-if="profileLoading || profilePictureLoading">
        <div class="pl-2">
            <ProfileLoader />
            <CardsLoader :cardsCount="3" />
        </div>
    </template>
    <template v-else-if="profileError || !profile">
        <ErrorAlert title="Erreur" description="Impossible de récupérer les infos, tu peux essayer de recharger la page" />
    </template>
    <template v-else>
        <!-- User infos -->
        <UserInfos 
            :user="user"
            :isUserProfile="isUserProfile"
        />

        <!-- Flex container for the three main sections -->
        <div class="flex flex-wrap gap-4">
            <!-- Top Artistes -->
            <CustomCard title="👤 Top Artistes">
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
                <template v-slot:footer v-if="isUserProfile" class="mt-auto">
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
                </template>
            </CustomCard>

            <!-- Top Titres -->
            <CustomCard title="🎶 Top Titres">
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
                <template v-slot:footer>
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
                </template>
            </CustomCard>

            <!-- Next Events -->
            <CustomCard title="Prochains concerts">
                Work in progress
            </CustomCard>
        </div>

        <!-- Disconnect button -->
        <div class="flex justify-center mt-12">
            <Button variant="destructive" @click="logout()">Se déconnecter</Button>
        </div>
    </template>
</template>
