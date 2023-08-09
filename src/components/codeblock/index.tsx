import { css } from '@codemirror/lang-css'
import { html } from '@codemirror/lang-html'
import { javascript } from '@codemirror/lang-javascript'
import { sass } from '@codemirror/lang-sass'
import { EditorState, StateEffect } from '@codemirror/state'
import { oneDark } from '@codemirror/theme-one-dark'
import { EditorView } from '@codemirror/view'
import { basicSetup } from 'codemirror'
import { createEffect, createSignal } from 'solid-js'
import './codeblock.css'

const languages = {
  html: html(),
  css: css(),
  sass: sass({ indented: true }),
  scss: sass(),
  javascript: javascript(),
}

type Language = keyof typeof languages

interface Props {
  initialValue?: string
  onChange: (value: string) => void
  language: Language
}

function useCodemirror(props: {
  node: Element | DocumentFragment
  initialDoc?: string
  language: Language
  onChange: (state: EditorState) => void
}) {
  const [editorView, setEditorView] = createSignal<EditorView>()
  const lgPkg = () => languages[props.language]
  const [state] = createSignal(
    EditorState.create({
      doc: props.initialDoc || '',
      extensions: [
        basicSetup,
        lgPkg(),
        oneDark,
        EditorView.updateListener.of((update: any) => {
          if (update.changes) {
            props.onChange && props.onChange(update.state)
          }
        }),
      ],
    })
  )

  createEffect(() => {
    console.log(`update state`, props.language)
    state().update({
      effects: [StateEffect.reconfigure.of(lgPkg())],
    })
    console.log(props.language, state())
    editorView()?.setState(state())
  })

  createEffect(() => {
    if (!props.node) return
    if (editorView()) return
    const view = new EditorView({
      state: state(),
      parent: props.node,
    })
    setEditorView(view)
  })

  return [editorView()]
}

export default function Codeblock(props: Props) {
  let node = <div class={`codeeditor h-full box`}></div>
  const handleChange = (state: EditorState) =>
    props.onChange(state.doc.toString())
  //@ts-ignore
  const [editView] = useCodemirror({
    //@ts-ignore
    node,
    initialDoc: props.initialValue,
    language: props.language,
    onChange: handleChange,
  })
  return <>{node}</>
}
