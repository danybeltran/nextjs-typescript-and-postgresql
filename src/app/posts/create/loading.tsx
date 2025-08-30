import { ArrowLeft } from 'lucide-react'

import PostFormSkeleton from '@/components/post/post-form-skeleton'
import { Button } from '@/components/ui'
import { BackButton } from '@/components/layout/back-button'

export default function CreateLoading() {
  return (
    <section>
      <BackButton href='/' />
      <div className='max-w-3xl mx-auto'>
        <header className='my-4 md:my-8'>
          <h1 className='font-bold text-2xl'>Add Post</h1>
        </header>
        <PostFormSkeleton />
      </div>
    </section>
  )
}
