import { apiGet, apiPost } from '@/api'
import { useUserStore } from '@/stores/user'
import { UserCreationForm } from '@/types/global_types'
import { createQueryKeys } from '@lukemorales/query-key-factory'

export const user = createQueryKeys('user', {
  create_account: (data: UserCreationForm) => ({
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
  get_profile_picture: (instagramUsername: string) => ({
    queryKey: [instagramUsername],
    queryFn: async () => {
      // wip
      
      
      const response = await apiGet('user/instagram/profile-picture2')
      console.log(response.data)
      // returned a jpeg as a base64 string
      const binary = Buffer.from(response.data.image, 'base64');
      console.log(binary)
      const imgData = new Blob([binary], { type: 'image/jpeg' });
      const link = URL.createObjectURL(imgData);
      return link
      const res = 'data:image/png;base64,' + response.data.image
      console.log(res)
      return res
    }
  }),
  profile: (user_id: string) => ({
    queryKey: [user_id],
    queryFn: async () => {
      const response = await apiGet('user/profile', { user_id })
      return response.data
    }
  })
})
