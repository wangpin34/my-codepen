import { createContext } from "solid-js";

export type Theme = 'light' | 'dark'
export type Layout = 'classic' | 'content'

export type SettingsValue = {
  
  theme: Theme
  contentAs: 'iframe' | 'shadow-dom'
  layout: Layout
}

export type Settings = [SettingsValue,
  {
  setTheme: (theme: Theme) => void
  setLayout: (layout: Layout) => void
  setContentAs: (contentAs: 'iframe' | 'shadow-dom') => void
}]

const SettingsContext = createContext<Settings>([{
  theme: 'dark',
  layout: 'classic',
  contentAs: 'iframe'},{
  setTheme: (theme: Theme) => null,
  setLayout: (layout: Layout) => null,
  setContentAs: (contentAs: 'iframe' | 'shadow-dom') => null
}])

export default SettingsContext