import '@styles/main.css'
import { FC } from 'react'
import type { NextPageContext } from 'next'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'

interface DoomProps {
  children: NextPageContext
}

const Doom: FC<DoomProps> = ({ children }) => <>{children}</>

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) => {
  const Layout = (Component as any).Layout || Doom
  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  )
}

export default MyApp
