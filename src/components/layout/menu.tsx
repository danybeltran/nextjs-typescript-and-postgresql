import { Link, useLocation } from '@tanstack/react-router'
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger
} from '@/components/ui'
import { cn, RenderList } from 'atomic-utils'
import { Menu as HamburgerIcon } from 'lucide-react'
import { Fragment, useState } from 'react'
import AuthAndTheme from './auth-and-theme'
import { LINKS } from './links'

const useGetLinksStyle = () => {
  const { pathname } = useLocation()
  return function getLinkStyles(to?: string) {
    if (!to) return 'text-sm text-foreground/70 hover:text-foreground'
    return cn('text-sm text-foreground/70 hover:text-foreground', {
      'text-blue-700 dark:text-blue-400 hover:text-blue-700':
        pathname.startsWith(to)
    })
  }
}

export default function Menu() {
  const getLinkStyle = useGetLinksStyle()
  const [isOpen, setIsOpen] = useState(false)

  const hideMenu = () => setIsOpen(false)

  return (
    <>
      <Fragment key='Mobile menu'>
        <div className='md:hidden'>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button variant='ghost' size='icon' className='rounded-full'>
                <HamburgerIcon className='text-lg' />
              </Button>
            </DialogTrigger>
            <DialogContent className='h-dvh max-w-full w-screen dark:bg-background/95 dark:backdrop-blur dark:supports-[backdrop-filter]:bg-background/60 rounded-none border-none'>
              <DialogTitle className='h-0 hidden'></DialogTitle>
              <DialogDescription className='h-0 hidden'></DialogDescription>
              <div className='flex flex-col items-center pt-16 gap-y-6'>
                <Link
                  className='font-bold h-auto text-xl'
                  to='/'
                  onClick={hideMenu}
                >
                  TANSTACK START
                </Link>

                <RenderList
                  data={LINKS}
                  render={link => (
                    <Link
                      key={'mobile' + (link.to || link.href)}
                      onClick={hideMenu}
                      className={cn(getLinkStyle(link.to), 'text-lg')}
                      to={link.to}
                      href={link.href}
                      target={link.target}
                      rel={link.rel}
                    >
                      {link.children}
                    </Link>
                  )}
                />
                <AuthAndTheme />
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </Fragment>

      <Fragment key='Desktop menu'>
        <div className='space-x-3 hidden md:inline-block'>
          <Link className='font-bold w-32 h-auto text-left mr-4' to='/'>
            TANSTACK START
          </Link>
          <RenderList
            data={LINKS}
            render={link => (
              <Link
                key={'desktop' + (link.to || link.href)}
                className={getLinkStyle(link.to)}
                to={link.to}
                href={link.href}
                target={link.target}
                rel={link.rel}
              >
                {link.children}
              </Link>
            )}
          />
        </div>
        <AuthAndTheme />
      </Fragment>
    </>
  )
}
