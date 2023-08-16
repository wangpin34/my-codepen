import type { Component } from 'solid-js'
import { createEffect, createSignal } from 'solid-js'
import Codeblock from './components/codeblock'
import CSSCodeblock from './components/css-codeblock'

const App: Component = () => {
  const [html, setHtml] = createSignal('')
  const [css, setCSS] = createSignal('')
  const [js, setJS] = createSignal('')
  const inframeSrcDoc = () =>
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
  const shadowHTML = () => `
    <style>
    ${css()}
    </style>
    <script type="text/javascript">
    ${js()}
    </script>
    ${html()}
  `
  createEffect(() => {
    console.log(shadowHTML())
    const shadowHost = document.getElementById('shadowHost')
    if (shadowHost) {
      let shadowRoot = shadowHost.shadowRoot
      if (!shadowRoot) {
        shadowRoot = shadowHost.attachShadow({ mode: "open" })
      }
      
      shadowRoot.innerHTML = shadowHTML()
    }
  })

  return (
    <div class='h-screen flex flex-col'>
      <div class='h-3/6 grid grid-cols-3 gap-x-2'>
        <div class='flex flex-col'>
          <div class='flex flex-row items-center min-h-[48px]'>
            <span>HTML</span>
          </div>
          <Codeblock initialValue={''} onChange={setHtml} language='html' />
        </div>
        <CSSCodeblock onChange={(css) => setCSS(css)} />
        <div class='flex flex-col'>
          <div class='flex flex-row items-center min-h-[48px]'>
            <span>JavaScript</span>
          </div>
          <Codeblock initialValue={''} onChange={setJS} language='javascript' />
        </div>
      </div>
      <iframe srcdoc={inframeSrcDoc()} class='w-full h-1.5/6' />
      <div id="shadowHost" class='w-full h-1.5/6'></div>
    </div>
  )
}

export default App
