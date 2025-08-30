'use client'

import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger
} from '@/components/ui'
import { revalidate } from 'atomic-utils'
import Icon from 'bs-icon'
import { signIn } from 'next-auth/react'

export default function SigninDialog({
  children
}: {
  children?: React.ReactNode
}) {
  const attemptGoogleSignin = () => {
    signIn('google', {
      callbackUrl: location.href
    })
      .then(() => {
        // Try to get the new session from API
        revalidate('GET /auth/session')
      })
      .catch(err => {})
  }

  return (
    <Dialog>
      <DialogTrigger asChild={children ? true : false}>
        {children || <Button>Sign in</Button>}
      </DialogTrigger>
      <DialogContent className='max-w-[90%] md:max-w-lg rounded-xl'>
        <DialogTitle>Sign in to your account</DialogTitle>

        <DialogDescription>
          Sign in with one of the available providers
        </DialogDescription>

        <Button onClick={attemptGoogleSignin} variant='outline' size='lg'>
          <Icon name='google' />
          Sign in with Google
        </Button>

        <DialogFooter>
          <DialogClose asChild>
            <Button size='lg'>Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
