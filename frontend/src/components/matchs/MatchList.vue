<script setup lang='ts'>
import { type SongMatch } from '@/types/global_types';
import { getProfile, getSongMatches } from '@/helpers/userQueriesHelpers'
import { useUserStore } from '@/stores/user';
const userStore = useUserStore()

const { data: profile, isLoading: isProfileLoading } = getProfile(userStore.user?.id as string)
const { data: songMatches, isLoading: isSongMatchesLoading } = getSongMatches(userStore.user?.id as string, profile)

const sortedSongMatches = computed(() => 
    songMatches.value 
        ? [...songMatches.value].sort((a, b) => b.matching_songs.length - a.matching_songs.length) as SongMatch[]
        : []
);
</script>
<template>
    <template v-if="isSongMatchesLoading || isProfileLoading">
        <CardsLoader :cardsCount="1"/>
    </template>
    <template v-else>
        <div 
            class="text-center text-gray-500" 
            v-if="sortedSongMatches.length === 0"
        >
            Aucun match trouvé
        </div>
        <CustomCard v-else title="Matchs par titres">
            <div class="flex flex-wrap gap-2">
                <SongMatch 
                    v-for="match in sortedSongMatches" 
                    :key="match.user_id" 
                    :match="match" 
                />
            </div>
        </CustomCard>
    </template>
</template>