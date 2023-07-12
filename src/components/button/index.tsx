import classnames from 'classnames'
import type { JSX, JSXElement } from 'solid-js'

export interface Props {
  children: JSXElement
  active?: boolean
  outline?: boolean
  colorSchema?:
    | 'neutral'
    | 'primary'
    | 'secondary'
    | 'accent'
    | 'ghost'
    | 'link'
    | 'info'
    | 'success'
    | 'warning'
    | 'error'
  size?: 'lg' | 'sm' | 'xs'
  wide?: boolean
}

export type ButtonProps = Props & JSX.IntrinsicElements['button']

export default function Button(props: ButtonProps) {
  return (
    <button
      class={classnames(
        'btn',
        { 'btn-outline': props.outline },
        { 'btn-wide': props.wide },
        props.size ? `btn-${props.size}` : '',
        props.colorSchema ? `btn-${props.colorSchema}` : ''
      )}
      {...props}
    >
      {props.children}
    </button>
  )
}
