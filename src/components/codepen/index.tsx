import Codeblock from 'components/codeblock';
import CSSCodeblock from 'components/css-codeblock';
import useSettings from 'hooks/useSettings';
import useSource from 'hooks/useSource';
import { createEffect } from 'solid-js';

interface ContentProps {
  source: {
    html: string
  css: string
  js: string
  }
  
}

function IframeContentRenderer({source}: ContentProps) {
 const iframeSrcDoc = () =>
    `<html>
    <head>
    <style>
    ${source.css}
    </style>
    </head>
    <body>
    ${source.html}
    <body>
    <script type="text/javascript">
    ${source.js}
    </script>
    <html>`

    return  <iframe title="srcdoc" id="srcdoc" name="srcdoc" srcdoc={iframeSrcDoc()} class='w-full h-1.5/6' />
}


function ShadowDOMContentRenderer({source}: ContentProps) {
 const shadowHTML = () => `
    <style>
    ${source.css}
    </style>
    <script type="text/javascript">
    ${source.js}
    </script>
    ${source.html}
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
  return <div id="shadowHost" class='w-full h-1.5/6'>
        {/* Declarative Shadow DOM https://developer.chrome.com/articles/declarative-shadow-dom/ , shadow dom for SSR */}
        <template shadowrootmode="open">
          {shadowHTML()}
        </template>
      </div>
}



function CodePen() {
  const [source, setter] = useSource()
  const [settings] = useSettings()
  return (
    <div class='h-screen flex flex-col'>
      <div class='h-3/6 grid grid-cols-3 gap-x-2'>
        <div class='flex flex-col'>
          <div class='flex flex-row items-center min-h-[48px]'>
            <span>HTML</span>
          </div>
          <Codeblock initialValue={source.html} onChange={setter.setHTML} language='html' />
        </div>
        <CSSCodeblock onChange={setter.setCSS} initialValue={source.css}/>
        <div class='flex flex-col'>
          <div class='flex flex-row items-center min-h-[48px]'>
            <span>JavaScript</span>
          </div>
          <Codeblock initialValue={source.js} onChange={setter.setJS} language='javascript' />
        </div>
      </div>
      
      {settings.contentAs === 'shadow-dom' ? <ShadowDOMContentRenderer source={source} /> : <IframeContentRenderer source={source} />}
    </div>
  )
}

export default CodePen
