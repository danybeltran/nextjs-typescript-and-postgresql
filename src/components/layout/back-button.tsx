'use client'

import { ArrowLeft } from 'lucide-react'
import { Button } from '../ui' // Assuming 'Button' is a custom component
import { useRouter } from '@tanstack/react-router'

export function BackButton({
  fallbackLocation = '/',
  children
}: React.PropsWithChildren<{ fallbackLocation?: string }>) {
  const router = useRouter()

  const handleBack = () => {
    if (window.history.length > 1) {
      router.history.back()
    } else {
      router.navigate({ to: fallbackLocation })
    }
  }

  return (
    <Button
      onClick={handleBack}
      variant='ghost'
      size='sm'
      className='cursor-pointer'
    >
      <ArrowLeft size={18} />
      {children ?? 'Back'}
    </Button>
  )
}
