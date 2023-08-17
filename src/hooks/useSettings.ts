import SettingsContext from 'contexts/settings-context'
import { useContext } from 'solid-js'

export default function useSettings() {
  return useContext(SettingsContext)
}