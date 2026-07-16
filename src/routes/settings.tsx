import { createFileRoute } from '@tanstack/react-router'
import Profile from '@/components/settings/profile'

export const Route = createFileRoute('/settings')({
  component: ProfilePage,
})

function ProfilePage() {
  return <Profile />
}
