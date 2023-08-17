import CodePen from 'components/codepen'
import SettingsCenter from 'components/settings'
import type { Settings, SettingsValue } from 'contexts/settings-context'
import SettingsContext, { CSS_Preprocessors } from 'contexts/settings-context'
import type { Source } from 'contexts/source-context'
import SourceContext from 'contexts/source-context'
import type { Component } from 'solid-js'
import { createEffect } from 'solid-js'
import { createStore } from 'solid-js/store'

const App: Component = () => {

  const [settingsState, setSettings] = createStore({
    theme: 'dark' as SettingsValue['theme'],
    contentAs: 'iframe' as SettingsValue['contentAs'],
    layout: 'classic' as SettingsValue['layout'],
    cssPreprocessor: CSS_Preprocessors.Plain,
  })

  const settings: Settings = [
    settingsState,
    {
      setTheme: (theme: SettingsValue['theme']) => setSettings('theme', theme),
      setContentAs: (contentAs: SettingsValue['contentAs']) => setSettings('contentAs', contentAs),
      setLayout: (layout: SettingsValue['layout']) => setSettings('layout', layout),
      setCSSPreprocessor: (cssPreprocessor: CSS_Preprocessors) => setSettings('cssPreprocessor', cssPreprocessor)
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

  createEffect(() => {
    const element = document.querySelector('html')
    element?.setAttribute('data-theme', settingsState.theme)
  })
  
  return <SettingsContext.Provider value={settings}>
    <SourceContext.Provider value={source}>
          <SettingsCenter />
          <div style={`
            height: calc(100vh - 48px);
          `} class="p-2">
          <CodePen />
          </div>
    </SourceContext.Provider>
  
    </SettingsContext.Provider>
}

export default App
