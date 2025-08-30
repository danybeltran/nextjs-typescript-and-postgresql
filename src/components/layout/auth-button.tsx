'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Avatar,
  AvatarFallback,
  AvatarImage,
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogFooter,
  Button
} from '@/components/ui'

import { useState } from 'react'
import { signOut } from 'next-auth/react'
import SigninDialog from './signin-dialog'
import { useClientSession } from '@/hooks/use-client-session'
import { usePreferences } from '@/hooks/use-preferences'
import { LogInIcon, LogOutIcon, Settings } from 'lucide-react'
import Link from 'next/link'

export default function AuthButton() {
  const { data: session } = useClientSession()
  const { data: preferences } = usePreferences()

  const [showSignoutDialog, setShowSignoutDialog] = useState(false)

  if (!session) {
    return (
      <SigninDialog>
        <Button variant='ghost' size='icon' className='rounded-full'>
          <LogInIcon />
        </Button>
      </SigninDialog>
    )
  }

  return (
    <>
      <AlertDialog open={showSignoutDialog} onOpenChange={setShowSignoutDialog}>
        <AlertDialogContent>
          <AlertDialogTitle>Sign out?</AlertDialogTitle>
          <AlertDialogDescription>
            You will be signed out of your account
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() =>
                signOut({
                  callbackUrl: location.href
                })
              }
            >
              Sign out
              <LogOutIcon />
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar className='w-8 h-8 cursor-pointer'>
            <AvatarImage src={preferences.user_profile_picture} alt='@shadcn' />
            <AvatarFallback>
              <img src={preferences.user_profile_picture} alt='' />
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='mr-4'>
          <DropdownMenuLabel>{preferences.user_fullname}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild className='cursor-pointer'>
            <Link href='/settings'>
              <Settings /> Settings
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            className='cursor-pointer'
            onClick={() => setShowSignoutDialog(true)}
          >
            <LogOutIcon /> Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
