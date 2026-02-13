import PostCardSkeleton from '@/components/post/post-card-skeleton'
import { Button } from '@/components/ui'
import { BackButton } from '@/components/layout/back-button'

export default function PostsLoading() {
  return (
    <section>
      <BackButton fallbackLocation='/' />
      <header className='flex items-center justify-between my-4 md:my-8'>
        <h1 className='font-bold text-2xl'>All Posts</h1>
        <Button size='sm'>Create Post</Button>
      </header>
      <div className='py-4 grid  grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-2 rounded-md'>
        <PostCardSkeleton />
        <PostCardSkeleton />
        <PostCardSkeleton />
        <PostCardSkeleton />
        <PostCardSkeleton />
        <PostCardSkeleton />
      </div>
    </section>
  )
}
