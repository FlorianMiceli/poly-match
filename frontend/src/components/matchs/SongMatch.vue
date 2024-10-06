<script setup lang='ts'>
import { SongMatch } from '@/types/global_types';
import { DrawerTrigger } from "vaul-vue";
import { getUser } from '@/helpers/userQueriesHelpers';

const props = defineProps<{
    match: SongMatch
}>();

const { data: user, isLoading: isUserLoading } = getUser(props.match.user_id);
</script>

<template>
    <Drawer>
        <!-- Badge -->
        <DrawerTrigger as-child> 
            <Badge 
                class="flex items-center space-x-2 p-1 cursor-pointer" 
                variant="outline"
                :class="{ 'relative': match.matching_songs.length > 1 }"
            >
                <div 
                    v-if="match.matching_songs.length > 1"
                    class="absolute inset-0 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5),0_0_20px_rgba(236,72,153,0.3),0_0_30px_rgba(234,179,8,0.2)] animate-pulse"
                />
            
                <!-- Match Avatar -->
                <Avatar class="w-8 h-8 ml-1">
                    <!-- TODO -->
                    <AvatarImage :src="''" alt="Match Avatar" />
                    <AvatarFallback>{{ match.first_name[0] }}{{ match.last_name[0] }}</AvatarFallback>
                </Avatar>
            
                <!-- Name & Match Count -->
                <div class="flex flex-col">
                    <span class="text-sm pr-2">{{ match.first_name }} {{ match.last_name }}</span>
                    <span 
                        class="text-xs text-gray-500" 
                        :class="{ 'bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 bg-clip-text text-transparent font-extrabold': match.matching_songs.length > 1 }"
                    >
                        {{ match.matching_songs.length }} {{ 'match' + (match.matching_songs.length > 1 ? 's !' : '') }}
                    </span>
                </div>
            </Badge>
        </DrawerTrigger>

        <!-- Drawer -->
        <DrawerContent>

            <!-- Loader -->
            <ProfileLoader v-if="isUserLoading" class="pl-4" />

            <!-- User Infos -->
            <UserInfos 
                v-else
                :first_name="user.first_name"
                :last_name="user.last_name"
                :school_year="user.school_year"
                :school_major="user.school_major"
                class="mt-4"
            />

            
            <!-- List of matching songs -->
            <div class="flex flex-col gap-2 mx-4 mb-4">
                <h1 class="text-2xl font-bold">{{ 'Titre' + (match.matching_songs.length > 1 ? 's' : '') + ' en commun' }}</h1>
                <div class="flex flex-wrap gap-2">
                    <Song 
                        v-for="song in match.matching_songs" 
                        :key="song.id" 
                        :song="song" 
                        :removeable="false" 
                        :user_id="match.user_id"
                    />
                </div>
            </div>

            <!-- List of matching artists -->
        </DrawerContent>
    </Drawer>
</template>