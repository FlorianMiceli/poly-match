<script setup lang="ts">
import { getProfile, updateProfile } from '@/helpers/userQueriesHelpers';
import { SpotifyTrack } from '@/types/global_types';
import { CircleX, Loader2, ArrowUpRight } from 'lucide-vue-next';
import { DrawerTrigger } from "vaul-vue";



const props = defineProps<{
    song: SpotifyTrack
    removeable: boolean
    user_id: string
}>()

const updateProfileMutation = updateProfile()
const { data: profile } = getProfile(props.user_id)

const removeSong = (song: SpotifyTrack) => {
    updateProfileMutation.mutate({
        ...profile.value,
        fav_songs: profile?.value?.fav_songs.filter((s: SpotifyTrack) => s.id !== song.id)
    })
}

const openSpotify = () => {
    window.open(props.song.external_urls.spotify, '_blank')
}
</script>
<template>
    <Drawer>
        <!-- Badge -->
        <DrawerTrigger as-child> 
            <Badge class="flex items-center space-x-2 p-1 cursor-pointer" variant="outline">
                <!-- Song Cover -->
                <Avatar class="w-8 h-8 ml-1">
                    <AvatarImage :src="song.album.images[0].url || ''" alt="Song Cover" />
                    <AvatarFallback>
                        <Loader2 class="w-4 h-4 animate-spin" />
                    </AvatarFallback>
                </Avatar>

                <!-- Song Title and Artist -->
                <div class="flex flex-col">
                    <span class="text-sm" :class="{ 'pr-2': !removeable }">{{ song.name }}</span>
                    <span class="text-xs text-gray-500">{{ song.artists[0].name }}</span>
                </div>

                <!-- Button to remove the song from the list -->
                <Button v-if="removeable" size="icon" variant="ghost" @click="removeSong(song)">
                    <CircleX class="w-6 h-6" />
                </Button>
            </Badge>
        </DrawerTrigger>

        <!-- Drawer -->
        <DrawerContent>
            <!-- Track Title and Artist -->
            <DrawerHeader>
                <DrawerTitle>
                    <span class="font-bold text-xl">{{ song.name }}</span>
                    <span class="text-gray-400 text-lg block">{{ song.artists[0].name }}</span>
                </DrawerTitle>
            </DrawerHeader>

            <!-- Album preview + audio + spotify link -->
            <div class="px-4 flex flex-col items-center">
                <img :src="song.album.images[0].url" :alt="song.album.name" class="rounded-lg">
                <audio
                    autoplay
                    ref="audio"
                    :src="song.preview_url"
                    class="hidden"
                />
                <Button class="my-4" @click="openSpotify()">
                    <ArrowUpRight />
                    Ecouter sur Spotify
                </Button>
            </div>
        </DrawerContent>
    </Drawer>
</template>