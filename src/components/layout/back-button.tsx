'use client'

import { ArrowLeft } from 'lucide-react'
import { Button } from '../ui' // Assuming 'Button' is a custom component
import { useRouter } from 'next/navigation'

export function BackButton({
  fallbackLocation = '/',
  children
}: React.PropsWithChildren<{ fallbackLocation?: string }>) {
  const router = useRouter()

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back()
    } else {
      router.push(fallbackLocation)
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
