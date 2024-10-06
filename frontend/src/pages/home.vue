<script setup lang='ts'>
import { getProfile, getSongMatches } from '@/helpers/userQueriesHelpers'
import { useUserStore } from '@/stores/user';
const userStore = useUserStore()

const { data: profile, isLoading: isProfileLoading } = getProfile(userStore.user?.id as string)
const { data: songMatches, isLoading: isSongMatchesLoading } = getSongMatches(userStore.user?.id as string, profile)
</script>
<template>
    <div class="m-4 mb-12">
        <div class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-4 p-2">
            <h1>Matchs Musicaux</h1>
        </div>
        <template v-if="isSongMatchesLoading || songMatches === undefined">
            Loading...
        </template>
        <template v-else>
            <MatchList :songMatches="songMatches" />
        </template>
    </div>
</template>