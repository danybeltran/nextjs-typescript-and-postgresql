import { GeistSans } from 'geist/font/sans'
import type { Metadata } from 'next'
import './globals.css'
import 'bs-icon/icons.css'
import { AuthProvider, Navbar, ThemeProvider } from '@/components/layout'

import { AtomicState } from 'atomic-utils'
import { FetchConfig } from 'atomic-utils'
import { getServerSession } from 'next-auth'
import { getUserPreferences } from '@/lib/server/preferences'
import { cookies } from 'next/headers'
import { Toaster } from '@/components/ui/sonner'

export const metadata: Metadata = {
  title: 'Home',
  description: 'Home page '
}

export default async function MainLayout({ children }: LayoutProps<'/'>) {
  const session = await getServerSession()

  const preferences = await getUserPreferences()

  const serverTheme = (await cookies()).get('theme')?.value ?? 'system'

  return (
    <html suppressHydrationWarning>
      <head>
        <title>Next.js starter</title>
        <meta name='description' content='A Starter with Next.js' />
      </head>

      <body className={GeistSans.className}>
        <ThemeProvider attribute='class'>
          <main className='min-h-screen'>
            <AuthProvider>
              <AtomicState
                value={{
                  'server-theme': serverTheme
                }}
              >
                <FetchConfig
                  baseUrl='/api'
                  value={{
                    Session: session ?? {},
                    Preferences: preferences ?? {}
                  }}
                >
                  <Navbar />
                  <div className='max-w-(--breakpoint-2xl) mx-auto py-8 px-6 md:px-8 overflow-x-auto'>
                    {children}
                  </div>
                  <Toaster />
                </FetchConfig>
              </AtomicState>
            </AuthProvider>
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
