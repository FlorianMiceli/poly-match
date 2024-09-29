import { mergeQueryKeys } from '@lukemorales/query-key-factory'
import { user } from './user'
import { spotify } from './spotify'

export const queries = mergeQueryKeys(user, spotify)
