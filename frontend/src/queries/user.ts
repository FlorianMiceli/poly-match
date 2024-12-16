import { apiGet, apiPost } from '@/api'
import { useUserStore } from '@/stores/user'
import { UserCreationForm, UserProfile } from '@/types/global_types'
import { createQueryKeys } from '@lukemorales/query-key-factory'

export const user = createQueryKeys('user', {
  create_account: (data: Ref<UserCreationForm | null>) => ({
    queryKey: [data],
    queryFn: async () => {
      const userStore = useUserStore()
      const response = await apiPost("user/create", unref(data))
      if (response.status) { 
        userStore.user = response.data[0]
        return true
      }
      return false
    }
  }),
  profile: (user_id: string) => ({
    queryKey: [user_id],
    queryFn: async () => {
      const response = await apiGet('user/profile', { user_id })
      return response.data as UserProfile
    }
  }),
  get_user: (user_id: string) => ({
    queryKey: [user_id],
    queryFn: async () => {
      const response = await apiGet('user/get', { user_id })
      return response.data
    }
  }),
  get_song_matches: (user_id: string) => ({
    queryKey: [user_id],
    queryFn: async () => {
      const response = await apiGet('user/getSongMatches', { user_id })
      return response.data
    }
  }),
  get_profile_picture: (user_id: string) => ({
    queryKey: [user_id],
    queryFn: async () => {
      const response = await apiGet('user/profile-picture', { user_id })
      return response.data
    }
  })
})
