import { Metadata } from 'next'
import Profile from './profile'

export const metadata: Metadata = {
  title: 'Settings'
}

export default function ProfilePage() {
  return <Profile />
}
