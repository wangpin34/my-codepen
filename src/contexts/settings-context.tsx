import { createContext } from "solid-js";

export type Theme = 'light' | 'dark'
export type Layout = 'classic' | 'content'

export enum CSS_Preprocessors {
  Plain = 'plain',
  Sass = 'sass',
  Scss = 'scss',
}

export type SettingsValue = {
  theme: Theme
  contentAs: 'iframe' | 'shadow-dom'
  cssPreprocessor: CSS_Preprocessors
  layout: Layout
}

export type Settings = [SettingsValue,
  {
  setTheme: (theme: Theme) => void
  setLayout: (layout: Layout) => void
  setContentAs: (contentAs: 'iframe' | 'shadow-dom') => void
  setCSSPreprocessor: (cssPreprocessor: CSS_Preprocessors) => void
}]

const SettingsContext = createContext<Settings>([{
  theme: 'dark',
  layout: 'classic',
  contentAs: 'iframe',
  cssPreprocessor: CSS_Preprocessors.Plain
},{
  setTheme: (theme: Theme) => null,
  setLayout: (layout: Layout) => null,
  setContentAs: (contentAs: 'iframe' | 'shadow-dom') => null,
  setCSSPreprocessor: (cssPreprocessor: CSS_Preprocessors) => null
}])

export default SettingsContext