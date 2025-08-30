import { Button } from '@/components/ui'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className='text-center space-y-4'>
      <h2 className='text-xl font-semibold'>
        The page you requested was not found
      </h2>
      <Link href='/'>
        <Button variant='link'>Return home</Button>
      </Link>
    </div>
  )
}
