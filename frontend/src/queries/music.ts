import { apiGet } from "@/api";
import { Song } from "@/types/global_types";
import { createQueryKeys } from "@lukemorales/query-key-factory";

export const music = createQueryKeys("music", {
    search_song: (songName: Ref<string>) => ({
        queryKey: [songName],
        queryFn: async () => {
            const response = await apiGet("music/song", { song_name: unref(songName) });
            return response.data.recordings as Song[];
        },
    }),
    release_cover: (song: Song) => ({
        queryKey: [song],
        queryFn: async () => {
            const res = await apiGet("music/releaseCover", { release_id: song.releases[0].id });
            const empty_res = Object.keys(res.data).length === 0
            if (empty_res) return null
            const song_url = res.data.images[0].thumbnails[250];
            return song_url;
        },
    })
});
