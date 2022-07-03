import {
  FC,
  forwardRef,
  useRef,
  ButtonHTMLAttributes,
  JSXElementConstructor,
} from 'react'
import cn from 'clsx'
import { mergeRefs } from 'react-merge-refs'
import { Loading } from '@components/ui'
import s from './Button.module.css'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string
  className?: string
  variant?: 'primary' | 'naked' | 'ghost' | 'mango' | 'crayola'
  active?: boolean
  type?: 'submit' | 'reset' | 'button'
  Component?: string | JSXElementConstructor<any>
  loading?: boolean
  disabled?: boolean
}

/*eslint-disable-next-line react/display-name */
const Button: FC<ButtonProps> = forwardRef((props, buttonRef) => {
  const {
    className,
    variant = 'primary',
    children,
    active,
    loading = false,
    disabled = false,
    style = {},
    Component = 'button',
    ...rest
  } = props

  const ref = useRef<typeof Component>(null)

  const rootClassName = cn(
    s.root,
    [s[`${variant}`]],
    {
      [s.loading]: loading,
      [s.disabled]: disabled,
    },
    className
  )

  return (
    <Component
      ref={mergeRefs([ref, buttonRef])}
      data-variant={variant}
      aria-pressed={active}
      className={rootClassName}
      disabled={disabled}
      style={{ ...style }}
      {...rest}
    >
      {loading ? (
        <i className={s.dot}>
          <Loading />
        </i>
      ) : (
        children
      )}
    </Component>
  )
})

export default Button
