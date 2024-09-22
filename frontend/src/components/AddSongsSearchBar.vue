<script setup lang='ts'>
import { searchSong } from '@/helpers/musicQueriesHelper';
import { debounce } from 'lodash-es';
import { Loader2 } from 'lucide-vue-next'

const inputSongName = ref('')
const debouncedInputSongName = ref('')

// Use debouncedInputSongName for the API call
const debouncedUpdate = debounce((value) => debouncedInputSongName.value = value, 300)
watch(inputSongName, (newValue) => debouncedUpdate(newValue));

const { data: songData, isLoading: songIsLoading } = searchSong(debouncedInputSongName)

defineEmits(['addSong'])
</script>
<template>
    <div class="flex flex-col gap-2">
        <Input
            v-model="inputSongName"
            type="text"
            placeholder="Recherche un son..."
        />
    </div>
    <div class="flex flex-col gap-2">
        <template v-if="songIsLoading">
            <div class="flex justify-center items-center h-full">
                <Loader2 class="w-4 h-4 mr-2 animate-spin" />
            </div>
        </template>
        <template v-else>
            <ul v-if="songData && songData.length > 0" class="w-full mt-4 bg-white border rounded-md shadow-lg">
                <li v-for="item in songData" :key="item.id" class="flex justify-between items-center px-4 py-2 hover:bg-gray-100">
                    <div class="flex justify-between items-center w-full">
                        <div class="flex flex-col">
                            <span class="text-lg font-semibold text-gray-800">{{ item.title }}</span>
                            <span class="text-sm text-gray-600">{{ item['artist-credit'][0].name }}</span>
                        </div>
                        <AsyncButton
                            @click="$emit('addSong', item)"
                            :loading="false"
                            label="Ajouter"
                        />
                    </div>
                </li>
            </ul>
            <div v-if="inputSongName.length > 0 && songData && songData.length === 0">
                <p class="text-gray-500 text-center pt-4">Aucun résultat trouvé</p>
            </div>
        </template>
    </div>
</template>