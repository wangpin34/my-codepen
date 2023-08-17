import { useContext } from 'solid-js'
import SettingsContext from '../settings-context'

export default function useSettings() {
  return useContext(SettingsContext)
}