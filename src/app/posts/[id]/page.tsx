import { cache } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

import PostDeleteButton from '@/components/post/post-delete-button'
import PostDetails from '@/components/post/post-details'

import { prisma } from '@/lib/server/prisma'
import { Button } from '@/components/ui'
import { BackButton } from '@/components/layout/back-button'

export async function generateMetadata(props: PostPageProps) {
  const params = await props.params
  const post = await getPost(params)

  return {
    title: 'Post: ' + post?.title,
    description: 'Details for post ' + post?.id
  }
}

export default async function PostDetailsPage(props: PostPageProps) {
  const params = await props.params

  const post = await getPost(params)

  return (
    <section>
      <BackButton fallbackLocation='/posts' />
      {post ? (
        <div className='max-w-4xl gap-2 mt-4 mx-auto flex flex-col lg:flex-row'>
          <div className='flex-10'>
            <PostDetails post={post} />
          </div>
          <div className='flex-2 flex justify-center'>
            <PostDeleteButton postId={params.id} />
          </div>
        </div>
      ) : (
        <div className='flex items-center justify-center h-72'>
          Post not found
        </div>
      )}
    </section>
  )
}

const getPost = cache(async (params: { id: string }) => {
  try {
    return prisma.post.findFirst({
      where: {
        id: parseInt(params.id)
      }
    })
  } catch (err) {
    return null
  }
})

interface PostPageProps {
  params: Promise<{ id: string }>
}
