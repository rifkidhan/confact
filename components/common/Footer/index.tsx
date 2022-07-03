import { FC } from 'react'
import { Logo } from '@components/ui'
import cn from 'clsx'
import s from './Footer.module.css'

const TopFooter: FC = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.top}>
        <div className={s.topFirst}>
          <Logo className={s.logo} />
          <p>
            Virtual meetings, and conferences, anyone can share, join or host
            (virtual events).
          </p>
        </div>
        <div className={s.topSecond}>
          <div className={s.topSecondWrap}>
            <h6>Menu</h6>
            <div>
              <p>Menu 1</p>
              <p>Menu 2</p>
              <p>Menu 3</p>
              <p>Menu 4</p>
            </div>
          </div>
          <div className={s.topSecondWrap}>
            <h6>About us</h6>
            <div>
              <p>About us 1</p>
              <p>About us 2</p>
              <p>About us 3</p>
              <p>About us 4</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const BottomFooter: FC = () => {
  return (
    <div className={s.bottom}>
      <div className={s.wrapper}>
        <div className={`${s.bottomWrap} p-small`}>
          <p>© 2022 Confab. All rights reserved.</p>
          <div className={s.bottomPolicy}>
            <p>Privacy and Policy</p>
            <p>Terms and Condition</p>
          </div>
        </div>
      </div>
    </div>
  )
}

const Footer: FC = () => {
  return (
    <footer className={s.root}>
      <TopFooter />
      <BottomFooter />
    </footer>
  )
}

export default Footer
