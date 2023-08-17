import { createContext } from "solid-js";

export type Source = [{
  html: string
  css: string
  js: string
}, {
  setHTML: (html: string) => void
  setCSS: (css: string) => void
  setJS: (js: string) => void
}]

const SourceContext = createContext<Source>([{html: '', css: '', js: ''}, {setHTML: (html: string) => {}, setCSS: (css: string) => {}, setJS: (js: string) => {}}])

export default SourceContext