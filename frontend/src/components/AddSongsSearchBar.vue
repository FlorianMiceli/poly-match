<script setup lang='ts'>
import { getAccessToken, searchSong } from '@/helpers/spotifyQueriesHelpers';
import { updateProfile, getProfile } from '@/helpers/userQueriesHelpers';
import { debounce } from 'lodash-es';
import { Loader2 } from 'lucide-vue-next'
import { useUserStore } from '@/stores/user'
import { Song, SpotifyTrack } from '@/types/global_types';
import { error } from '@/helpers/display';
import { DrawerClose } from "vaul-vue";


const userStore = useUserStore()

const inputSongName = ref('')
const debouncedInputSongName = ref('')

// Use debouncedInputSongName for the API call
const debouncedUpdate = debounce((value) => debouncedInputSongName.value = value, 300)
watch(inputSongName, (newValue) => debouncedUpdate(newValue));

const { data: token } = getAccessToken()    
const { data: songData, isLoading: songIsLoading } = searchSong(debouncedInputSongName, token)
const { data: profile, isLoading: profileIsLoading } = getProfile(userStore.user?.id as string)
const profileMutation = updateProfile()

const addSong = (spotifyTrack: SpotifyApi.TrackObjectFull) => {
    // get only props that we need 
    const track: SpotifyTrack = {
        id: spotifyTrack.id,
        name: spotifyTrack.name,
        artists: spotifyTrack.artists,
        album: spotifyTrack.album,
        external_urls: spotifyTrack.external_urls,
        preview_url: spotifyTrack.preview_url || ''
    }

    // Check if the profile exists and initialize it if not
    if (!profile.value) {
        profileMutation.mutate({ fav_songs: [track] })
        return
    }

    // Check if the song is already in the profile
    if (profile.value.fav_songs && profile.value.fav_songs.some((s: SpotifyTrack) => s.id === track.id)) {
        error("Erreur", "Le titre est déjà dans tes favoris")
        return
    }

    profileMutation.mutate({
        ...profile.value,
        fav_songs: [...(profile.value.fav_songs || []), track]
    })
}
</script>
<template>
    <!-- Search Bar -->
    <div class="flex flex-col gap-2">
        <Input
            v-model="inputSongName"
            type="text"
            placeholder="Recherche un son..."
            :disabled="profileIsLoading"
        />
    </div>
    <div class="flex flex-col gap-2">
        
        <!-- Loader -->
        <template v-if="songIsLoading">
            <div class="flex justify-center items-center h-full py-4">
                <Loader2 class="w-4 h-4 mr-2 animate-spin" />
            </div>
        </template>
        
        <!-- Results -->
        <template v-else>
            <div v-if="songData && songData.tracks.items.length > 0" class="w-full mt-4 bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto py-2">
                <ul>
                    <li v-for="item in songData.tracks.items" :key="item.id" class="flex justify-between items-center px-4 py-2 hover:bg-gray-100">
                        <div class="flex items-center w-full">
                            <img :src="item.album.images[0]?.url" alt="Album cover" class="w-12 h-12 mr-4 rounded-sm flex-shrink-0">
                            <div class="flex flex-col flex-grow min-w-0">
                                <span class="text-lg font-semibold text-gray-800 truncate">{{ item.name }}</span>
                                <span class="text-sm text-gray-600 truncate">{{ item.artists[0].name }}</span>
                            </div>
                            <DrawerClose as-child>
                                <AsyncButton
                                    @click="addSong(item)"
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
            <div v-if="inputSongName.length > 0 && songData && songData.tracks.items.length === 0">
                <p class="text-gray-500 text-center pt-4">Aucun résultat trouvé</p>
            </div>
        </template>
    </div>
</template>