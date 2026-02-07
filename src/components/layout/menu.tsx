'use client'
import Link from 'next/link'
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger
} from '@/components/ui'
import { cn, RenderList } from 'atomic-utils'
import Icon from 'bs-icon'
import { Fragment, useState } from 'react'
import AuthAndTheme from './auth-and-theme'
import { LINKS } from './links'
import { usePathname } from 'next/navigation'

const useGetLinksStyle = () => {
  const pathname = usePathname()
  return function getLinkStyles(href: string) {
    return cn('text-sm text-foreground/70 hover:text-foreground', {
      'text-blue-700 dark:text-blue-400 hover:text-blue-700':
        pathname.startsWith(href)
    })
  }
}

export default function Menu() {
  const getLinkStyle = useGetLinksStyle()
  const [isOpen, setIsOpen] = useState(false)

  const hideMenu = () => setIsOpen(false)

  return (
    <>
      <Fragment key='Desktop menu'>
        <div className='md:hidden'>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button variant='ghost' size='icon' className='rounded-full'>
                <Icon name='list' className='text-lg' />
              </Button>
            </DialogTrigger>
            <DialogContent className='h-full max-w-screen w-screen dark:bg-background/95 dark:backdrop-blur dark:supports-[backdrop-filter]:bg-background/60 rounded-none'>
              <DialogTitle className='h-0 hidden'></DialogTitle>
              <DialogDescription className='h-0 hidden'></DialogDescription>
              <div className='flex flex-col items-center pt-16 gap-y-6'>
                <Link
                  className='font-bold h-auto text-xl'
                  href={'/'}
                  onClick={hideMenu}
                >
                  NEXT.JS
                </Link>

                <RenderList
                  data={LINKS}
                  render={link => (
                    <Link
                      key={'mobile' + link.href}
                      onClick={hideMenu}
                      className={cn(getLinkStyle(link.href), 'text-lg')}
                      {...link}
                    />
                  )}
                />
                <AuthAndTheme />
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </Fragment>

      <Fragment key='Mobile menu'>
        <div className='space-x-3 hidden md:inline-block'>
          <Link className='font-bold w-16 h-auto' href={'/'}>
            NEXT.JS
          </Link>
          <RenderList
            data={LINKS}
            render={link => (
              <Link
                key={'desktop' + link.href}
                className={getLinkStyle(link.href)}
                {...link}
              />
            )}
          />
        </div>
        <AuthAndTheme />
      </Fragment>
    </>
  )
}
