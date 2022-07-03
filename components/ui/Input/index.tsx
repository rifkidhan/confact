import { FC, InputHTMLAttributes } from 'react'
import cn from 'clsx'
import s from './Input.module.css'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  onChange?: (...args: any[]) => any
}

const Input: FC<InputProps> = (props) => {
  const { className, children, ...rest } = props

  const rootClassName = cn(s.root, {}, className)

  // const handleOnChange = (e: any) => {
  //   if (onChange) {
  //     onChange(e.target.value)
  //   }
  //   return null
  // }
  return (
    <>
      <input
        className={rootClassName}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        {...rest}
      />
    </>
  )
}

export default Input
