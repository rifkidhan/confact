import { FC } from 'react'
import s from './Hero.module.css'

const Hero: FC = () => {
  return (
    <div className="w-full bg-primary">
      <div className="container mx-auto">
        <h1>
          Virtual <br />
          <span className="text-opal">Conference</span>
        </h1>
        <p>
          Virtual meetings, and conferences, anyone can share, join or host
          (virtual events).
        </p>
      </div>
    </div>
  )
}

export default Hero
