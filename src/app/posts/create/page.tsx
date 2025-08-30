import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

import PostForm from '@/components/post/create-post-form'
import { Button } from '@/components/ui'
import { BackButton } from '@/components/layout/back-button'

export default function Create() {
  return (
    <section>
      <BackButton href='/posts' />
      <div className='max-w-3xl mx-auto'>
        <header className='my-4 md:my-8'>
          <h1 className='font-bold text-2xl'>Add Post</h1>
        </header>
        <PostForm />
      </div>
    </section>
  )
}
