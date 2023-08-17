import CodePen from 'components/codepen'
import type { Settings, SettingsValue } from 'settings-context'
import SettingsContext from 'settings-context'
import type { Component } from 'solid-js'
import { createStore } from 'solid-js/store'
import type { Source } from './source-context'
import SourceContext from './source-context'

const App: Component = () => {


  const [settingsState, setSettings] = createStore({
    theme: 'dark' as SettingsValue['theme'],
    contentAs: 'iframe' as SettingsValue['contentAs'],
    layout: 'classic' as SettingsValue['layout']
  })

  const settings: Settings = [
    settingsState,
    {
      setTheme: (theme: SettingsValue['theme']) => setSettings('theme', theme),
      setContentAs: (contentAs: SettingsValue['contentAs']) => setSettings('contentAs', contentAs),
      setLayout: (layout: SettingsValue['layout']) => setSettings('layout', layout)
    }
  ]

  const [sourceState, setSource] = createStore({
    html: '',
    css: '',
    js: ''
  })

  const source: Source = [
    sourceState,
    {
      setHTML: (html: string) => setSource('html', html),
      setCSS: (css: string) => setSource('css', css),
      setJS: (js: string) => setSource('js', js)
    }
  ]
  
  return <SettingsContext.Provider value={settings}>
    <SourceContext.Provider value={source}>

          <CodePen />
    </SourceContext.Provider>
  
    </SettingsContext.Provider>
}

export default App
