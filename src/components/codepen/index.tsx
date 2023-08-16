import Codeblock from 'components/codeblock'
import CSSCodeblock from 'components/css-codeblock'
import { createEffect } from 'solid-js'

interface Props {
  html?: string
  css?: string
  js?: string
  setHTML: (html: string) => void
  setCSS: (css: string) => void
  setJS: (js: string) => void
}

function CodePen(props: Props) {
  const html = () => props.html
  const css = () => props.css
  const js = () => props.js
  const {setHTML, setCSS, setJS} = props
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
          <Codeblock initialValue={''} onChange={setHTML} language='html' />
        </div>
        <CSSCodeblock onChange={setCSS} />
        <div class='flex flex-col'>
          <div class='flex flex-row items-center min-h-[48px]'>
            <span>JavaScript</span>
          </div>
          <Codeblock initialValue={''} onChange={setJS} language='javascript' />
        </div>
      </div>
      <iframe srcdoc={inframeSrcDoc()} class='w-full h-1.5/6' />
      <div id="shadowHost" class='w-full h-1.5/6'>
        {/* Declarative Shadow DOM https://developer.chrome.com/articles/declarative-shadow-dom/ , shadow dom for SSR */}
        <template shadowrootmode="open">
          {shadowHTML()}
        </template>
      </div>
    </div>
  )
}

export default CodePen
