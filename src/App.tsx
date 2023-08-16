import CodePen from 'components/codepen'
import type { Component } from 'solid-js'
import { createSignal } from 'solid-js'

const App: Component = () => {
  const [html, setHtml] = createSignal('')
  const [css, setCSS] = createSignal('')
  const [js, setJS] = createSignal('')
  
  return <div>
    <CodePen html={html()} css={css()} js={js()} setHTML={setHtml} setCSS={setCSS} setJS={setJS}/>
  </div>
}

export default App
