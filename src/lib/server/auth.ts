import { AuthConfig } from '@auth/core'
import GoogleProvider from '@auth/core/providers/google'
import { decode } from '@auth/core/jwt'
import { getRequest } from '@tanstack/react-start/server'

export const authConfig: AuthConfig = {
  secret: process.env.NEXTAUTH_SECRET,
  basePath: '/api/auth',
  trustHost: true,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_APP_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_APP_CLIENT_SECRET as string
    })
  ]
}

export async function getServerSession() {
  try {
    const request = getRequest()
    if (!request) {
      console.log('getServerSession: No web request found in context')
      return null
    }

    const cookieHeader = request.headers.get('cookie') ?? ''
    const cookies = Object.fromEntries(
      cookieHeader.split(';').map(c => {
        const [k, ...v] = c.trim().split('=')
        return [k, decodeURIComponent(v.join('='))]
      })
    )

    const tokenName = cookies['__Secure-authjs.session-token']
      ? '__Secure-authjs.session-token'
      : cookies['authjs.session-token']
        ? 'authjs.session-token'
        : cookies['__Secure-next-auth.session-token']
          ? '__Secure-next-auth.session-token'
          : 'next-auth.session-token'
    const token = cookies[tokenName]
    
    console.log('getServerSession: token name =', tokenName, 'token present =', !!token)
    if (!token) return null

    const decoded = await decode({
      token,
      secret: process.env.NEXTAUTH_SECRET as string,
      salt: tokenName
    })

    console.log('getServerSession: decoded token =', decoded)
    if (!decoded) return null

    return {
      user: {
        name: decoded.name,
        email: decoded.email,
        image: decoded.picture
      },
      expires: decoded.exp ? new Date(decoded.exp * 1000).toISOString() : ''
    }
  } catch (e) {
    console.error('getServerSession error:', e)
    return null
  }
}
