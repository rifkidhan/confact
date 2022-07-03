import NextAuth, { DefaultSession } from 'next-auth/next'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name: string
      image: string
    }
  }
}
