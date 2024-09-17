import { mergeQueryKeys } from '@lukemorales/query-key-factory'
import { user } from './user'

export const queries = mergeQueryKeys(user)
