'use client'
import { useAction } from 'atomic-utils'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button
} from '@/components/ui'
import { deletePost } from '@/app/posts/actions'

export default function PostDeleteButton({ postId }: { postId: string }) {
  const router = useRouter()

  const { reFetch, loading } = useAction(deletePost, {
    params: parseInt(postId),
    onResolve: () => {
      // 1. Get the previous URL
      const previousPage = document.referrer

      // 2. Check if the previous page was the posts list
      // We check for /posts specifically to handle the "back" vs "replace" logic
      const cameFromPosts = previousPage.includes('/posts')

      if (cameFromPosts) {
        // Go back to keep the user's scroll position and filters on the list
        router.back()
      } else {
        // If they landed here directly (e.g., from a link), go to the list
        router.replace('/posts')
      }

      // 3. Refresh the data so the deleted post is gone
      // A small delay ensures the router transition has started
      setTimeout(() => router.refresh(), 100)
    }
  })

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          disabled={loading}
          className='w-80 lg:w-full'
          size='sm'
          variant='outline'
        >
          {loading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this post?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={reFetch}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
