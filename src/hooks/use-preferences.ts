import { Types } from '@/types'
import { fetchOptions, useFetch } from 'atomic-utils'

const preferencesFetchOptions = fetchOptions<Types.Preferences>({
  key: 'Preferences',
  url: '/preferences',
  maxCacheAge: '15 sec'
})

export function usePreferences() {
  return useFetch(preferencesFetchOptions)
}
