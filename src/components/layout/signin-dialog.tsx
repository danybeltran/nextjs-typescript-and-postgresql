'use client'

import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui'
import Icon from 'bs-icon'
import { signIn } from 'next-auth/react'
import { FcGoogle } from 'react-icons/fc'
import { LuLock } from 'react-icons/lu'

export default function SigninDialog({
  children
}: {
  children?: React.ReactNode
}) {
  const attemptGoogleSignin = () => {
    signIn('google', {
      callbackUrl: window.location.href // Added window for clarity
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild={!!children}>
        {children || <Button variant='default'>Sign in</Button>}
      </DialogTrigger>

      <DialogContent className='sm:max-w-[420px] p-0 overflow-hidden border-none shadow-2xl'>
        {/* Header with Background Accent */}
        <DialogHeader className='pt-8 px-6 pb-6 bg-muted/30'>
          <div className='mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-background shadow-sm border'>
            <LuLock className='size-5' />
          </div>
          <DialogTitle className='text-center text-2xl font-bold tracking-tight'>
            Welcome back
          </DialogTitle>
          <DialogDescription className='text-center text-balance'>
            Choose your preferred sign-in method to continue to your dashboard.
          </DialogDescription>
        </DialogHeader>

        <div className='grid gap-4 p-6'>
          <Button
            onClick={attemptGoogleSignin}
            variant='outline'
            size='lg'
            className='w-full h-12 text-base flex items-center font-medium transition-all hover:bg-muted/50 hover:border-foreground/20'
          >
            <FcGoogle className='size-5' />
            Continue with Google
          </Button>

          <div className='relative my-2'>
            <div className='absolute inset-0 flex items-center'>
              <span className='w-full border-t' />
            </div>
            <div className='relative flex justify-center text-xs uppercase'>
              <span className='bg-background px-2 text-muted-foreground'>
                Secure Login
              </span>
            </div>
          </div>
        </div>

        <DialogFooter className='p-6 pt-0 sm:justify-center'>
          <DialogClose asChild>
            <Button
              variant='ghost'
              className='text-muted-foreground hover:text-foreground'
            >
              Nevermind, take me back
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
