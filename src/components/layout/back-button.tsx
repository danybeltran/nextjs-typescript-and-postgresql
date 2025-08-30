import { ArrowLeft } from 'lucide-react'
import { Button } from '../ui'
import Link from 'next/link'

export function BackButton({
  href,
  children
}: React.PropsWithChildren<{ href: string }>) {
  return (
    <Link href={href} className='max-w-min'>
      <Button variant='ghost' size='sm' className='cursor-pointer'>
        <ArrowLeft size={18} />
        {children ?? 'Back'}
      </Button>
    </Link>
  )
}
