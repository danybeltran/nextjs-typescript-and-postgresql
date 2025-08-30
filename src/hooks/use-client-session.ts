import { actionData, fetchOptions, revalidate, useFetch } from 'atomic-utils'
import { getSession } from 'next-auth/react'

const sessionFetchOptions = fetchOptions({
  url: '/auth/session',
  key: 'Session',
  maxCacheAge: '15 sec',
  debounce: 100,
  transform(data) {
    return 'user' in data ? data : null!
  }
})

export function useClientSession() {
  return useFetch(sessionFetchOptions)
}
