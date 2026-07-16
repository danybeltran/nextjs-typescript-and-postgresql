export const LINKS: {
  children: string
  to?: string
  href?: string
  target?: string
  rel?: string
}[] = [
  {
    children: 'Posts',
    to: '/posts'
  },
  {
    children: 'Settings',
    to: '/settings'
  },
  {
    children: 'Github',
    to: 'https://github.com/danybeltran/nextjs-typescript-and-postgresql',
    target: '_blank',
    rel: 'noreferrer'
  }
]
