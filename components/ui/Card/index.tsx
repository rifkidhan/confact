import { FC } from 'react'
import cn from 'clsx'
import s from './Card.module.css'
import { LoadImage } from '@components/ui'
import { RightArrow } from '@components/icons'

interface Person {
  name: string
  job: string
}

interface CardInterface extends Person {
  title: string
  date: string
  message: string
}

interface ICard extends Partial<CardInterface> {
  className?: string
  image: string
  type?: 'event' | 'testimonial'
  title?: string
  date?: string
}

const Card: FC<ICard> = (props) => {
  const {
    className,
    image = '',
    type = 'event',
    title,
    date,
    message,
    name,
    job,
  } = props
  const rootCN = cn(s.root, className, {
    [s.event]: type === 'event',
    [s.testimonial]: type === 'testimonial',
  })
  return (
    <div className={rootCN}>
      {type === 'event' && (
        <>
          <div className={s.eventTop}>
            <p className={s.eventTopTitle}>{title}</p>
            <p className={s.eventTopDate}>{date}</p>
          </div>
          <div className={s.eventBottom}>
            <div>
              <div className={s.eventImage}>
                <LoadImage
                  src={image}
                  className="aspect-square w-full object-cover object-center"
                  width={1000}
                  height={1000}
                  alt={name + ' photo'}
                />
              </div>
              <div>
                <p className={s.eventBottomTextName}>{name}</p>
                <p className={s.eventBottomTextJob}>{job}</p>
              </div>
            </div>
            <RightArrow className={s.eventBottomArrow} />
          </div>
        </>
      )}
      {type === 'testimonial' && (
        <>
          <div className={s.testimonialTop}>
            <p className={s.testimonialTopTitle}>
              <span>&quot;</span>
              {title}
              <span>&quot;</span>
            </p>
            <p className={s.testimonialTopMessage}>{message}</p>
          </div>
          <div className={s.testimonialBottom}>
            <div className={s.testimonialImage}>
              <LoadImage
                src={image}
                className="aspect-square w-full object-cover object-center"
                width={1000}
                height={1000}
              />
            </div>
            <div>
              <p className={s.eventBottomTextName}>{name}</p>
              <p className={s.eventBottomTextJob}>{job}</p>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Card
