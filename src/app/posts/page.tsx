import Link from 'next/link'
import { headers } from 'next/headers'

import { Button } from '@/components/ui'
import PostCard from '@/components/post/post-card'

import { prisma } from '@/lib/server/prisma'
import { RenderList } from 'atomic-utils'
import { BackButton } from '@/components/layout/back-button'
import { Metadata } from 'next'
import CreatePostForm from './create-post-form'

export const metadata: Metadata = {
  title: 'Posts'
}

export const revalidate = 0

export default async function Posts() {
  headers()

  const posts = (await prisma.post.findMany({})).reverse()

  return (
    <section>
      <BackButton fallbackLocation='/' />
      <header className='flex items-center justify-between my-4 md:my-8'>
        <h1 className='font-bold text-2xl'>All Posts</h1>
        <CreatePostForm />
      </header>

      {posts.length === 0 ? (
        <div className='h-72 flex items-center justify-center'>
          <p>No posts to show</p>
        </div>
      ) : (
        <div className='py-4 grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 items-stretch gap-2 rounded-md'>
          <RenderList
            data={posts}
            render={post => <PostCard post={post} key={post.id} />}
          />
        </div>
      )}
    </section>
  )
}
