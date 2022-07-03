import { useEffect, useState } from 'react'
import { Logo } from '@components/ui'
import s from './Header.module.css'
import Link from 'next/link'
import throttle from '@lib/hooks/throttle'
import cn from 'clsx'
import { useSession } from 'next-auth/react'
import { LoadImage } from '@components/ui'

const Header = () => {
  const [visible, setVisible] = useState(true)
  const [prevScroll, setPrevScroll] = useState(0)
  const { data: session } = useSession()

  useEffect(() => {
    const scrollHandler = throttle(() => {
      const currentScroll = window.scrollY

      setVisible(
        (prevScroll > currentScroll && prevScroll - currentScroll > 70) ||
          currentScroll < 10
      )
      setPrevScroll(currentScroll)
    }, 100)

    window.addEventListener('scroll', scrollHandler)
    return () => {
      window.removeEventListener('scroll', scrollHandler)
    }
  }, [visible, prevScroll])

  const rootCN = cn(s.root, visible ? s.navbarActive : s.navbarInactive)

  const navItems = [
    { name: 'Auth', link: '/auth' },
    { name: 'Events', link: '/events' },
  ]

  return (
    <header className={rootCN}>
      <div className={s.wrapper}>
        <div className="flex flex-row items-center justify-between">
          <Link href={'/'}>
            <Logo className={s.logo} />
          </Link>
          <div className="flex flex-row items-center justify-between gap-5">
            <Link href={'/events'}>Events</Link>
            {session ? (
              <Link
                href={`/${session?.username}`}
                className="h-12 w-12 overflow-hidden rounded-xl"
              >
                <LoadImage
                  src={session.user.image ? session.user.image : '/Person1.png'}
                  className="h-full w-full object-cover"
                />
              </Link>
            ) : (
              <Link href={'/auth'}>Auth</Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
