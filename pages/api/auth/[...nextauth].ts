import type { NextApiRequest, NextApiResponse } from 'next'
import NextAuth from 'next-auth/next'
import type { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import Auth0Provider from 'next-auth/providers/auth0'
import prisma from '@lib/prisma'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import CredentialsProvider from 'next-auth/providers/credentials'

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, AuthOptions)
}

export const AuthOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          username: profile.name.toLowerCase().replace(/ /g, ''),
        }
      },
    }),
    // Auth0Provider({
    //   clientId: process.env.AUTH0_CLIENT_ID,
    //   clientSecret: process.env.AUTH0_CLIENT_SECRET,
    //   issuer: process.env.AUTH0_DOMAIN,
    // }),
    // CredentialsProvider({
    //   name: 'Sign in with email',
    //   credentials: {
    //     username: {
    //       label: 'Email',
    //       type: 'email',
    //       placeholder: 'your email',
    //     },

    //     password: {
    //       label: 'Password',
    //       type: 'password',
    //     },
    //   },
    //   async authorize(credential, req) {
    //     const res = await fetch('/api/user', {
    //       method: 'POST',
    //       headers: { 'Content-Type': 'application/json' },
    //       body: JSON.stringify(credential),
    //     })
    //     const user = await res.json()

    //     if (res.ok && user) {
    //       return user
    //     }

    //     return null
    //   },
    // }),
  ],
  callbacks: {
    async session({ session, user }) {
      session.username = user.username
      return session
    },
  },

  pages: {
    signIn: '/auth',
    // verifyRequest: '/auth/verify',
    // newUser: '/auth/new-user',
  },
}
