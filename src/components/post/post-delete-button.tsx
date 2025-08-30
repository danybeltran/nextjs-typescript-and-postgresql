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
    onResolve: () => router.replace('/posts')
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
