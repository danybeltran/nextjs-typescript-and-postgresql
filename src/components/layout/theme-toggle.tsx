'use client'
import { IconType } from 'react-icons'
import { LuMoon, LuSun, LuMonitor } from 'react-icons/lu'

import { Button } from '@/components/ui/button'
import { useTheme } from '@/hooks/use-theme'
import { useEffect, useState } from 'react'
import { useSecondRender } from 'atomic-utils'

export function ThemeToggle() {
  const mounted = useSecondRender()
  const { theme, setTheme } = useTheme()

  if (!mounted) {
    return null
  }

  const nextTheme: any = {
    light: 'dark',
    dark: 'system',
    system: 'light'
  }

  const ThemeIcon = {
    undefined: LuSun,
    light: LuSun,
    dark: LuMoon,
    system: LuMonitor
  }[theme as string] as IconType

  return (
    <Button
      variant='ghost'
      className='rounded-full'
      size='icon'
      suppressHydrationWarning
      onClick={() => {
        const newTheme = nextTheme[theme as string]
        setTheme(newTheme)
      }}
    >
      <ThemeIcon className='text-xl' />
      <span className='sr-only'>Toggle theme</span>
    </Button>
  )
}
