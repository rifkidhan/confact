import { getProviders, signIn, getCsrfToken } from 'next-auth/react'
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { Layout } from '@components/common'
import { Button, Input } from '@components/ui'

const SignInPage = ({
  providers,
  csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div className="container mx-auto flex flex-auto items-center justify-between">
      {/* <form method="post" action="/api/auth/callback/credentials">
        <Input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <label>
          email
          <Input name="username" type="email" placeholder="your email" />
        </label>
        <label>
          Password
          <Input name="password" type="password" placeholder="your password" />
        </label>
        <Button type="submit">Sign in</Button>
      </form> */}
      <div>
        {Object.values(providers).map((provider: any) => {
          if (provider.id === 'credentials') {
            return null
          }
          return (
            <div key={provider.id}>
              <Button onClick={() => signIn(provider.id)}>
                Sign in with {provider.name}
              </Button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const providers = await getProviders()
  const csrfToken = await getCsrfToken(context)

  return {
    props: {
      providers,
      csrfToken,
    },
  }
}

SignInPage.Layout = Layout

export default SignInPage
