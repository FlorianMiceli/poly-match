<script setup lang='ts'>
import { searchSong } from '@/helpers/musicQueriesHelper';
import { updateProfile, getProfile } from '@/helpers/userQueriesHelpers';
import { debounce } from 'lodash-es';
import { Loader2 } from 'lucide-vue-next'
import { useUserStore } from '@/stores/user'
import { Song } from '@/types/global_types';
import { error } from '@/helpers/display';
import { DrawerClose } from "vaul-vue";


const userStore = useUserStore()

const inputSongName = ref('')
const debouncedInputSongName = ref('')

// Use debouncedInputSongName for the API call
const debouncedUpdate = debounce((value) => debouncedInputSongName.value = value, 300)
watch(inputSongName, (newValue) => debouncedUpdate(newValue));

const { data: songData, isLoading: songIsLoading } = searchSong(debouncedInputSongName)
const { data: profile, isLoading: profileIsLoading } = getProfile(userStore.user?.id as string)
const profileMutation = updateProfile()

const addSong = (song: Song) => {
    // Check if the profile exists and initialize it if not
    if (!profile.value) {
        profileMutation.mutate({ fav_songs: [song] })
        return
    }

    // Check if the song is already in the profile
    if (profile.value.fav_song && profile.value.fav_songs.some((s: Song) => s.id === song.id)) {
        error("Erreur", "Le titre est déjà dans tes favoris")
        return
    }

    profileMutation.mutate({
        ...profile.value,
        fav_songs: [...(profile.value.fav_songs || []), song]
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
            <ul v-if="songData && songData.length > 0" class="w-full mt-4 bg-white border rounded-md shadow-lg">
                <li v-for="item in songData" :key="item.id" class="flex justify-between items-center px-4 py-2 hover:bg-gray-100">
                    <div class="flex justify-between items-center w-full">
                        <div class="flex flex-col">
                            <span class="text-lg font-semibold text-gray-800">{{ item.title }}</span>
                            <span class="text-sm text-gray-600">{{ item['artist-credit'][0].name }}</span>
                        </div>
                        <DrawerClose as-child>
                            <AsyncButton
                                @click="addSong(item)"
                                :loading="false"
                                label="Ajouter"
                            />
                        </DrawerClose>
                    </div>
                </li>
            </ul>

            <!-- No results -->
            <div v-if="inputSongName.length > 0 && songData && songData.length === 0">
                <p class="text-gray-500 text-center pt-4">Aucun résultat trouvé</p>
            </div>
        </template>
    </div>
</template>