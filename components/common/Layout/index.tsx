import { FC, ReactNode } from 'react'
import { Header, Footer } from '@components/common'
import s from './Layout.module.css'

interface Props {
  children?: ReactNode
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <div className={s.root}>
      <Header />
      <main className={s.main}>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
