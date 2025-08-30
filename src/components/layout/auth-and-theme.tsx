import AuthButton from './auth-button'
import { ThemeToggle } from './theme-toggle'

export default function AuthAndTheme() {
  return (
    <div className='flex items-center gap-x-1'>
      <ThemeToggle />
      <AuthButton />
    </div>
  )
}
