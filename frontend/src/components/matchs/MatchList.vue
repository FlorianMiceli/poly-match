<script setup lang='ts'>
import { type SongMatch } from '@/types/global_types';
import { computed } from 'vue';

const props = defineProps<{
    songMatches: SongMatch[]
}>();

const sortedSongMatches = computed(() => 
    [...props.songMatches].sort((a, b) => b.matching_songs.length - a.matching_songs.length)
);
</script>
<template>
    <Card class="flex-grow basis-[calc(33.333%-1rem)] min-w-[300px] shadow-2xl flex flex-col">
        <CardHeader>
            <CardTitle>
                Matchs par titres
            </CardTitle>
        </CardHeader>
        <CardContent class="flex-grow">
            <div class="flex flex-wrap gap-2">
                <SongMatch 
                    v-for="match in sortedSongMatches" 
                    :key="match.user_id" 
                    :match="match" 
                />
            </div>
        </CardContent>
    </Card>
</template>