import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { prisma } from '@/lib/server/prisma'
import { BackButton } from '@/components/layout/back-button'
import PostCard from '@/components/post/post-card'
import { RenderList } from 'atomic-utils'
import CreatePostDialog from '@/components/post/create-post-dialog'

const getPosts = createServerFn({ method: 'GET' }).handler(async () => {
  return await prisma.post.findMany({
    orderBy: {
      date: 'desc'
    }
  })
})

export const Route = createFileRoute('/posts/')({
  loader: async () => {
    return {
      posts: await getPosts()
    }
  },
  component: PostsList,
})

function PostsList() {
  const { posts } = Route.useLoaderData()

  return (
    <section>
      <BackButton fallbackLocation='/' />
      <header className='flex items-center justify-between my-4 md:my-8'>
        <h1 className='font-bold text-2xl'>All Posts</h1>
        <CreatePostDialog />
      </header>

      {posts.length === 0 ? (
        <div className='h-72 flex items-center justify-center'>
          <p>No posts to show</p>
        </div>
      ) : (
        <div className='py-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-stretch gap-2 rounded-md'>
          <RenderList
            data={posts}
            render={post => <PostCard post={post} key={post.id} />}
          />
        </div>
      )}
    </section>
  )
}
