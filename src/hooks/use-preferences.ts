import { Types } from '@/types'
import { fetchOptions, revalidate, useFetch } from 'atomic-utils'

const preferencesFetchOptions = fetchOptions<Types.Preferences>({
  key: 'Preferences',
  url: '/preferences',
  maxCacheAge: '15 sec',
  onMutate() {
    revalidate('Preferences')
  }
})

export function usePreferences() {
  return useFetch(preferencesFetchOptions)
}
