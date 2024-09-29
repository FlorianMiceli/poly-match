<script setup lang="ts">
import { getProfile, updateProfile } from '@/helpers/userQueriesHelpers';
import { SpotifyTrack } from '@/types/global_types';
import { CircleX } from 'lucide-vue-next';
import { Loader2 } from 'lucide-vue-next'


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


</script>
<template>
    <Badge class="flex items-center space-x-2 p-1" variant="outline">

        <!-- Song Cover -->
        <Avatar class="w-8 h-8 ml-1">
            <AvatarImage :src="song.album.images[song.album.images.length - 1].url || ''" alt="Song Cover" />
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
        <Button v-if="removeable" size="icon" variant="ghost" @click="removeSong(song)" >
            <CircleX class="w-6 h-6" />
        </Button>
    </Badge>
</template>
