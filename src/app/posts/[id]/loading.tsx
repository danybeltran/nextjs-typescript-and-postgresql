import { Skeleton } from '@/components/ui'
import { BackButton } from '@/components/layout/back-button'

export default function PostIdLoading() {
  return (
    <section>
      <BackButton href='/' />
      <div className='max-w-4xl gap-2 mt-4 mx-auto flex flex-col lg:flex-row'>
        <section className='flex-10'>
          <header>
            <div>
              <Skeleton className='w-full h-6' />
              <Skeleton className='w-3/4 h-6 mt-1' />
            </div>
            <Skeleton className='w-72 h-5 mt-2' />
          </header>

          <article className='my-8 sm:text-lg flex flex-col gap-1'>
            <Skeleton className='w-full h-6' />
            <Skeleton className='w-full h-6' />
            <Skeleton className='w-full h-6' />
            <Skeleton className='w-full h-6' />
            <Skeleton className='w-full h-6' />
            <Skeleton className='w-full h-6' />
            <Skeleton className='w-full h-6' />
            <Skeleton className='w-full h-6' />
            <Skeleton className='w-full h-6' />
            <Skeleton className='w-full h-6' />
            <Skeleton className='w-full h-6' />
            <Skeleton className='w-3/4 h-6' />
          </article>
        </section>
        <div className='flex-2 flex justify-center h-fit'>
          <Skeleton className='w-80 h-10 lg:w-full rounded-md' />
        </div>
      </div>
    </section>
  )
}
