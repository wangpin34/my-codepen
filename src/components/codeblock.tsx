import { css } from '@codemirror/lang-css'
import { html } from '@codemirror/lang-html'
import { javascript } from '@codemirror/lang-javascript'
import { EditorState } from '@codemirror/state'
import { oneDark } from '@codemirror/theme-one-dark'
import { EditorView } from '@codemirror/view'
import { basicSetup } from 'codemirror'
import { createEffect, createSignal } from 'solid-js'
import './codeblock.css'

const languages = {
  html: html,
  css: css,
  javascript: javascript,
}

type Language = keyof typeof languages

interface Props {
  initialValue?: string
  onChange: (value: string) => void
  language: Language
}

function useCodemirror({
  node,
  initialDoc,
  language,
  onChange,
}: {
  node: Element | DocumentFragment
  initialDoc?: string
  language: Language
  onChange: (state: EditorState) => void
}) {
  const [editorView, setEditorView] = createSignal<EditorView>()
  createEffect(() => {
    if (!node) return
    if (editorView()) return

    const startState = EditorState.create({
      doc: initialDoc || '',
      extensions: [
        basicSetup,
        languages[language](),
        oneDark,
        EditorView.updateListener.of((update: any) => {
          if (update.changes) {
            onChange && onChange(update.state)
          }
        }),
      ],
    })
    const view = new EditorView({
      state: startState,
      parent: node,
    })

    setEditorView(view)
  })
  return [editorView()]
}

export default function Codeblock({ language, initialValue, onChange }: Props) {
  let node = <div class={`codeeditor h-full box`}></div>
  const handleChange = (state: EditorState) => onChange(state.doc.toString())
  //@ts-ignore
  const [editView] = useCodemirror({
    //@ts-ignore
    node,
    initialDoc: initialValue,
    language,
    onChange: handleChange,
  })
  return (
    <div class='flex flex-col'>
      <span>{language}</span>
      {node}
    </div>
  )
}
