<script setup lang="ts">
import { CircleX, Loader2 } from "lucide-vue-next";
import { SpotifyArtist } from "../types/global_types";
import { getProfile, updateProfile } from '../helpers/userQueriesHelpers';


const props = defineProps<{
    artist: SpotifyArtist;
    removeable: boolean;
    user_id: string;
}>();

const updateProfileMutation = updateProfile()
const { data: profile } = getProfile(props.user_id)
const removeArtist = (artist: SpotifyArtist) => {
    updateProfileMutation.mutate({
        ...profile.value,
        fav_artists: profile?.value?.fav_artists.filter((a: SpotifyArtist) => a.id !== artist.id)
    })
};
</script>

<template>
    <Badge class="flex items-center space-x-2 p-1" variant="outline">
        <!-- Artist Image -->
        <Avatar class="w-8 h-8 ml-1">
            <AvatarImage :src="artist.images[artist.images.length - 1]?.url || ''" alt="Artist Image" />
            <AvatarFallback>
                <Loader2 class="w-4 h-4 animate-spin" />
            </AvatarFallback>
        </Avatar>

        <!-- Artist Name and Genres -->
        <div class="flex flex-col">
            <span class="text-sm" :class="{ 'pr-2': !removeable }">{{ artist.name }}</span>
            <span class="text-xs text-gray-500">{{ artist.genres.join(', ') || "Pas de genre" }}</span>
        </div>

        <!-- Button to remove the artist from the list -->
        <Button v-if="removeable" size="icon" variant="ghost" @click="removeArtist(artist)">
            <CircleX class="w-6 h-6" />
        </Button>
    </Badge>
</template>
