<script setup lang='ts'>
import { getAccessToken, searchArtist } from '@/helpers/spotifyQueriesHelpers';
import { updateProfile, getProfile } from '@/helpers/userQueriesHelpers';
import { debounce } from 'lodash-es';
import { Loader2 } from 'lucide-vue-next'
import { useUserStore } from '@/stores/user'
import { SpotifyArtist } from '@/types/global_types';
import { error } from '@/helpers/display';
import { DrawerClose } from "vaul-vue";
import { ref, watch } from 'vue'

const userStore = useUserStore()

const inputArtistName = ref('')
const debouncedInputArtistName = ref('')

// Use debouncedInputArtistName for the API call
const debouncedUpdate = debounce((value) => debouncedInputArtistName.value = value, 300)
watch(inputArtistName, (newValue) => debouncedUpdate(newValue));

const { data: token } = getAccessToken()    
const { data: artistData, isLoading: artistIsLoading } = searchArtist(debouncedInputArtistName, token)
const { data: profile, isLoading: profileIsLoading } = getProfile(userStore.user?.id as string)
const profileMutation = updateProfile()

const addArtist = (spotifyArtist: SpotifyApi.ArtistObjectFull) => {
    // get only props that we need
    const artist: SpotifyArtist = {
        id: spotifyArtist.id,
        name: spotifyArtist.name,
        followers: {
            total: spotifyArtist.followers.total
        },
        images: spotifyArtist.images,
        genres: spotifyArtist.genres,
        external_urls: spotifyArtist.external_urls,
    }

    // Check if the profile exists and initialize it if not
    if (!profile.value) {
        profileMutation.mutate({ fav_artists: [artist] })
        return
    }

    // Check if the artist is already in the profile
    if (profile.value.fav_artists && profile.value.fav_artists.some((a: SpotifyArtist) => a.id === artist.id)) {
        error("Erreur", "L'artiste est déjà dans tes favoris")
        return
    }

    profileMutation.mutate({
        ...profile.value,
        fav_artists: [...(profile.value.fav_artists || []), artist]
    })
}
</script>

<template>
    <!-- Search Bar -->
    <div class="flex flex-col gap-2">
        <Input
            v-model="inputArtistName"
            type="text"
            placeholder="Recherche un artiste..."
            :disabled="profileIsLoading"
        />
    </div>
    <div class="flex flex-col gap-2">
        
        <!-- Loader -->
        <template v-if="artistIsLoading">
            <div class="flex justify-center items-center h-full py-4">
                <Loader2 class="w-4 h-4 mr-2 animate-spin" />
            </div>
        </template>
        
        <!-- Results -->
        <template v-else>
            <div v-if="artistData && artistData.artists.items.length > 0" class="w-full mt-4 bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto py-2">
                <ul>
                    <li v-for="item in artistData.artists.items" :key="item.id" class="flex justify-between items-center px-4 py-2 hover:bg-gray-100">
                        <div class="flex items-center w-full">
                            <img :src="item.images[0]?.url" alt="Artist image" class="w-12 h-12 mr-4 rounded-full flex-shrink-0">
                            <div class="flex flex-col flex-grow min-w-0">
                                <span class="text-lg font-semibold text-gray-800 truncate">{{ item.name }}</span>
                                <span class="text-sm text-gray-600 truncate">{{ item.genres.slice(0, 2).join(', ') }}</span>
                            </div>
                            <DrawerClose as-child>
                                <AsyncButton
                                    @click="addArtist(item)"
                                    :loading="false"
                                    label="Ajouter"
                                    class="flex-shrink-0 ml-2"
                                />
                            </DrawerClose>
                        </div>
                    </li>
                </ul>
            </div>

            <!-- No results -->
            <div v-if="inputArtistName.length > 0 && artistData && artistData.artists.items.length === 0">
                <p class="text-gray-500 text-center pt-4">Aucun résultat trouvé</p>
            </div>
        </template>
    </div>
</template>