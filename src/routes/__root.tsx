import { createRootRoute, Outlet, HeadContent, Scripts } from '@tanstack/react-router'
import * as React from 'react'

import '@/globals.css'

import { AuthProvider, Navbar, ThemeProvider } from '@/components/layout'
import { AtomicState, FetchConfig } from 'atomic-utils'
import { Toaster } from '@/components/ui/toaster'
import { createServerFn } from '@tanstack/react-start'
import { getServerSession } from '@/lib/server/auth'
import { getUserPreferences } from '@/lib/server/preferences'

// Fetch initial session and preferences from the server via a Server Function
const getInitialState = createServerFn({ method: 'GET' }).handler(async () => {
  const session = await getServerSession()
  const preferences = await getUserPreferences()
  return {
    session: session ?? {},
    preferences: preferences ?? {}
  }
})

export const Route = createRootRoute({
  loader: async () => {
    return await getInitialState()
  },
  component: RootComponent,
})

function RootComponent() {
  const { session, preferences } = Route.useLoaderData()

  return (
    <html suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Starter with TanStack Start</title>
        <meta name="description" content="A Starter with TanStack Start + Prisma + PostgreSQL" />
        <HeadContent />
      </head>
      <body className="font-sans">
        <ThemeProvider attribute='class'>
          <main className='min-h-dvh'>
            <AuthProvider>
              <AtomicState>
                <FetchConfig
                  baseUrl='/api'
                  value={{
                    Session: session,
                    Preferences: preferences
                  }}
                >
                  <Navbar />
                  <div className='max-w-(--breakpoint-2xl) mx-auto py-8 px-4 sm:px-6 md:px-8 overflow-x-auto'>
                    <Outlet />
                  </div>
                  <Toaster />
                </FetchConfig>
              </AtomicState>
            </AuthProvider>
          </main>
        </ThemeProvider>
        <Scripts />
      </body>
    </html>
  )
}
