<script setup lang="ts">
import { getReleaseCover } from '@/helpers/musicQueriesHelper';
import { Song } from '@/types/global_types';
import { CircleX } from 'lucide-vue-next';
import { Loader2 } from 'lucide-vue-next'

const props = defineProps<{
    song: Song
    removeable: boolean
}>()

const { data: releaseCoverUrl } = getReleaseCover(props.song)

const removeSong = (song: Song) => {
    console.log(song)
}
</script>
<template>
    <Badge class="flex items-center space-x-2 p-1" variant="outline">

        <!-- Song Cover -->
        <Avatar class="w-8 h-8 ml-1">
            <AvatarImage :src="releaseCoverUrl || ''" alt="Song Cover" />
            <AvatarFallback>
                <Loader2 class="w-4 h-4 animate-spin" />
            </AvatarFallback>
        </Avatar>

        <!-- Song Title and Artist -->
        <div class="flex flex-col">
            <!-- TODO -->
            <span class="text-sm" :class="{ 'pr-2': !removeable }">{{ song.title }}</span>
            <span class="text-xs text-gray-500">{{ song["artist-credit"][0].name }}</span>
        </div>

        <!-- Button to remove the song from the list -->
        <Button v-if="removeable" size="icon" variant="ghost" @click="removeSong(song)" >
            <CircleX class="w-6 h-6" />
        </Button>
    </Badge>
</template>
