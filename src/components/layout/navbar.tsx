'use client'

import Menu from './menu'

export default function Navbar() {
  return (
    // Changed h-14 to a min-height or kept it consistent with the inner flex
    <header className='sticky top-0 z-50 h-14 border-b border-neutral-100 bg-background/95 backdrop-blur dark:border-inherit supports-backdrop-filter:bg-background/60'>
      <div className='mx-auto flex h-full max-w-(--breakpoint-2xl) items-center justify-between px-4 md:px-8'>
        <Menu />
      </div>
    </header>
  )
}
