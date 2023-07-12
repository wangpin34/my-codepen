import type { Component } from 'solid-js'
import { createSignal } from 'solid-js'
import styles from './App.module.css'
import Codeblock from './components/codeblock'

const App: Component = () => {
  const [html, setHtml] = createSignal('')
  const [css, setCSS] = createSignal('')
  const [js, setJS] = createSignal('')
  const result = () =>
    `<html><head><style>${css()}</style></head><body>${html()}<body><script type="javascript">${js()}</script><html>`
  const blob = () => new Blob([result()], { type: 'text/html' })
  return (
    <div class={styles.App}>
      <Codeblock value={html()} onChange={setHtml} language='html' />
      <Codeblock value={css()} onChange={setCSS} language='css' />
      <Codeblock value={js()} onChange={setJS} language='js' />
      <iframe src={URL.createObjectURL(blob())} />
    </div>
  )
}

export default App
