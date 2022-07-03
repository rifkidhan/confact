import { FC, CSSProperties, ReactNode } from 'react'
import cn from 'clsx'
import s from './Skeleton.module.css'

interface ISkeleton {
  show?: boolean
  className?: string
  style?: CSSProperties
  block?: boolean
  boxHeight?: string | number
  height?: string | number
  width?: string | number
  children?: ReactNode
}

const pX = (value: string | number) => {
  if (typeof value === 'number') {
    return `${value}px`
  }

  return value
}

const Skeleton: FC<ISkeleton> = ({
  className,
  show,
  style,
  height,
  boxHeight,
  width,
  children,
}) => {
  const autoSize = !!children && !(width || height)

  width = width || 28
  height = height || 28
  boxHeight = boxHeight || height
  return (
    <span
      className={cn(s.skeleton, className, {
        [s.show]: show,
        [s.wrapper]: autoSize,
        [s.loaded]: !autoSize && !!children,
      })}
      style={
        autoSize
          ? {}
          : {
              minWidth: pX(width),
              minHeight: pX(height),
              marginBottom: `calc(${pX(boxHeight)} - ${pX(height)})`,
              ...style,
            }
      }
    >
      {children}
    </span>
  )
}

export default Skeleton
