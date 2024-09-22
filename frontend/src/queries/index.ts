import { mergeQueryKeys } from '@lukemorales/query-key-factory'
import { user } from './user'
import { music } from './music'

export const queries = mergeQueryKeys(user, music)
