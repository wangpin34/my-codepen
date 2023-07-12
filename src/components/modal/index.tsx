import classnames from 'classnames'
import type { JSXElement } from 'solid-js'

export interface Props {
  show?: boolean
  children: JSXElement
  title: string
  actionButtons: JSXElement
  onClose: () => void
}

export default function Modal(props: Props) {
  return (
    <dialog
      class={classnames('modal', { 'modal-open': props.show })}
      data-show={props.show}
    >
      <form method='dialog' class='modal-box'>
        <h3 class='font-bold text-lg'>{props.title}</h3>
        <button
          class='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'
          onClick={props.onClose}
        >
          ✕
        </button>
        <div class='py-4'>{props.children}</div>
        <div class='modal-action'>{props.actionButtons}</div>
      </form>
    </dialog>
  )
}
