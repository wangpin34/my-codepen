import type { Component } from 'solid-js'
import { createSignal } from 'solid-js'
import Codeblock from './components/codeblock'
import CSSCodeblock from './components/css-codeblock'

const App: Component = () => {
  const [html, setHtml] = createSignal('')
  const [css, setCSS] = createSignal('')
  const [js, setJS] = createSignal('')
  const result = () =>
    `<html>
    <head>
    <style>
    ${css()}
    </style>
    </head>
    <body>
    ${html()}
    <body>
    <script type="text/javascript">
    ${js()}
    </script>
    <html>`
  return (
    <div class='h-screen flex flex-col'>
      <div class='h-3/6 grid grid-cols-3 gap-x-2'>
        <div class='flex flex-col'>
          <div class='flex flex-row items-center'>
            <span>HTML</span>
          </div>
          <Codeblock initialValue={''} onChange={setHtml} language='html' />
        </div>
        <CSSCodeblock onChange={(css) => setCSS(css)} />
        <div class='flex flex-col'>
          <div class='flex flex-row items-center'>
            <span>JavaScript</span>
          </div>
          <Codeblock initialValue={''} onChange={setJS} language='javascript' />
        </div>
      </div>
      <iframe srcdoc={result()} class='w-full h-3/6' />
    </div>
  )
}

export default App
