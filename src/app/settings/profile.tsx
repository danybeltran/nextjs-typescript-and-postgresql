'use client'

import { Button } from '@/components/ui/button'
import SigninDialog from '@/components/layout/signin-dialog'
import UpdateProfile from './update-profile-form'
import { toast } from 'sonner'
import { BackButton } from '@/components/layout/back-button'
import { useClientSession } from '@/hooks/use-client-session'
import { usePreferences } from '@/hooks/use-preferences'
import { LogInIcon, RefreshCw } from 'lucide-react'
import { cn, revalidate } from 'atomic-utils'

let previousRefreshToast: string | number = ''

export default function Profile() {
  const { data: session, revalidating: refreshingSession } = useClientSession()
  const { data: preferences } = usePreferences()

  if (!session) {
    return (
      <div className='space-y-6'>
        <BackButton fallbackLocation='/' />
        <section className='rounded-2xl border p-6 shadow-sm space-y-4 text-center'>
          <h2 className='text-xl font-semibold'>You haven't signed in yet</h2>
          <SigninDialog>
            <Button className='gap-2'>
              <LogInIcon className='w-4 h-4' />
              Sign in
            </Button>
          </SigninDialog>
        </section>
      </div>
    )
  }

  return (
    <div className='space-y-8'>
      <BackButton fallbackLocation='/' />

      <header className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold'>Profile</h1>

        <div className='flex items-center gap-x-2'>
          <UpdateProfile />
          <Button
            variant='outline'
            onClick={() => {
              revalidate(['Session', 'Preferences'])
              toast.dismiss(previousRefreshToast)
              previousRefreshToast = toast('Session was refreshed', {
                description: 'Updated successfully'
              })
            }}
          >
            <RefreshCw
              className={cn('w-4 h-4', {
                'animate-spin': refreshingSession
              })}
            />
            Refresh
          </Button>
        </div>
      </header>

      <section className='rounded-2xl border p-6 shadow-sm space-y-4'>
        <div className='flex items-center gap-4'>
          <img
            src={preferences.user_profile_picture}
            alt='Profile picture'
            className='w-20 h-20 rounded-full border object-cover'
          />
          <div>
            <p className='text-lg font-semibold'>{preferences.user_fullname}</p>
            <p className='text-sm text-neutral-400'>@{preferences.username}</p>
            <p className='text-sm text-muted-foreground'>
              {preferences.user_email}
            </p>
          </div>
        </div>

        {preferences.user_description && (
          <div>
            <p className='font-semibold'>Bio</p>
            <p className='whitespace-pre-line text-sm text-muted-foreground'>
              {preferences.user_description}
            </p>
          </div>
        )}
      </section>
    </div>
  )
}
