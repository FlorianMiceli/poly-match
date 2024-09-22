import { apiGet } from '@/api'
import { Song } from '@/types/global_types'
import { createQueryKeys } from '@lukemorales/query-key-factory'

export const music = createQueryKeys('music', {
    search_song: (songName: Ref<string>) => ({
        queryKey: [songName],
        queryFn: async () => {
            const response = await apiGet('music/song', {song_name: unref(songName)})
            return response.data.recordings as Song[]
        }
    })
})