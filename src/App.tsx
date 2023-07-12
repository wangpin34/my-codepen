import type { Component } from 'solid-js'
import { createSignal } from 'solid-js'
import Codeblock from './components/codeblock'

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
    <script type="javascript">
    ${js()}
    </script>
    <html>`
  const blob = () => new Blob([result()], { type: 'text/html' })
  return (
    <div class='h-screen flex flex-col'>
      <div class='h-3/6 grid grid-cols-3 gap-x-2'>
        <Codeblock initialValue={''} onChange={setHtml} language='html' />
        <Codeblock initialValue={''} onChange={setCSS} language='css' />
        <Codeblock initialValue={''} onChange={setJS} language='javascript' />
      </div>
      <iframe src={URL.createObjectURL(blob())} class='w-full h-3/6' />
    </div>
  )
}

export default App
