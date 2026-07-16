import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { prisma } from '@/lib/server/prisma'
import { BackButton } from '@/components/layout/back-button'
import PostDetails from '@/components/post/post-details'
import PostDeleteButton from '@/components/post/post-delete-button'

const getPost = createServerFn({ method: 'GET' })
  .validator((id: number) => id)
  .handler(async ({ data: id }) => {
    try {
      return await prisma.post.findUnique({
        where: { id }
      })
    } catch {
      return null
    }
  })

export const Route = createFileRoute('/posts/$id')({
  loader: async ({ params }) => {
    const id = parseInt(params.id)
    const post = Number.isNaN(id) ? null : await getPost({ data: id })
    return { post }
  },
  component: PostDetailsPage,
})

function PostDetailsPage() {
  const { post } = Route.useLoaderData()
  const params = Route.useParams()

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
