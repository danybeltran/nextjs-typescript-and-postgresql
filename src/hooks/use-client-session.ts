import { fetchOptions, useFetch } from 'atomic-utils'

const sessionFetchOptions = fetchOptions({
  key: 'Session',
  url: '/auth/session',
  maxCacheAge: '15 sec',
  debounce: 100,
  transform(data) {
    return 'user' in data ? data : null
  }
})

export function useClientSession() {
  return useFetch(sessionFetchOptions)
}
