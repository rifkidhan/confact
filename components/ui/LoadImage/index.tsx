import { useState, useEffect, FC } from 'react'
import Image, { ImageProps } from 'next/future/image'
import cn from 'clsx'

const LoadImage: FC<ImageProps> = (props) => {
  const [loading, setLoading] = useState<boolean>(true)
  const [src, srcSet] = useState(props.src)

  useEffect(() => {
    srcSet(props.src)
  }, [props.src])

  const rootCN = cn(
    props.className,
    'transition-all duration-700 ease-in-out',
    loading ? 'grayscale blur-2xl scale-110' : 'grayscale-0 blur-0 scale-100'
  )

  return (
    <Image
      {...props}
      alt={props.alt}
      className={rootCN}
      onLoadingComplete={async () => {
        setLoading(false)
      }}
    />
  )
}

export default LoadImage
