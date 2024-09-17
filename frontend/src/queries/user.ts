import { apiPost } from '@/api'
import { useUserStore } from '@/stores/user'
import { UserCreationForm } from '@/types/global_types'
import { createQueryKeys } from '@lukemorales/query-key-factory'

export const user = createQueryKeys('user', {
  create_account: (data: UserCreationForm) => ({
    queryKey: [unref(data)],
    queryFn: async () => {
      const userStore = useUserStore()
      const response = await apiPost("user/create", unref(data))
      userStore.user = response.data[0]
      if (response.status) return true
      return false
    }
  })
})
