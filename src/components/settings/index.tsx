import Button from 'components/button'
import SettingsIcon from 'components/icons/settings'
import Modal from 'components/modal'
import { CSS_Preprocessors, SettingsValue, Theme } from "contexts/settings-context"
import useSettings from 'hooks/useSettings'
import { createEffect, createSignal } from "solid-js"

function SettingsModal() {
  const [settings, setter] = useSettings()
  const [show, setShow] = createSignal(false)
  const [values, setValues] = createSignal(settings)
  createEffect(() => {
    setValues(settings)
  })
  const handleSubmit = () => {
    setter.setCSSPreprocessor(values().cssPreprocessor)
    setter.setContentAs(values().contentAs)
    setter.setLayout(values().layout)
    setter.setTheme(values().theme)
    setShow(false)
  }
  const handleCancel = () => {
    setValues(settings)
    setShow(false)
  }
  return (
    <>
      <Button
        onClick={() => setShow((pre) => !pre)}
        colorSchema='ghost'
      >
        <SettingsIcon size={20} color='#3a4a5a' />
      </Button>
      <Modal
        title='Settings'
        show={show()}
        onClose={handleCancel}
        actionButtons={
          <>
            <Button colorSchema='primary' onClick={handleSubmit}>
              Apply
            </Button>
            <Button colorSchema='secondary' onClick={handleCancel}>
              Close
            </Button>
          </>
        }
      >
        <div class='form-control w-full max-w-xs'>
          <label class='label'>
            <span class='label-text'>
              CSS preprocessor
            </span>
          </label>
          <select
            class='select select-bordered w-full max-w-xs'
            onChange={(e) =>
              setValues((pre) => ({
                ...pre,
                cssPreprocessor: e.target.value as CSS_Preprocessors,
              }))
            }
          >
            <option disabled selected>Pick the preprocessor you want</option>
            <option value={CSS_Preprocessors.Plain} selected={values().cssPreprocessor === CSS_Preprocessors.Plain}>
              None (use plain CSS)
            </option>
            <option value={CSS_Preprocessors.Sass} selected={values().cssPreprocessor === CSS_Preprocessors.Sass}>SASS</option>
            <option value={CSS_Preprocessors.Scss} selected={values().cssPreprocessor === CSS_Preprocessors.Scss}>SCSS</option>
          </select>

          <label class='label'>
            <span class='label-text'>
              Theme
            </span>
          </label>
          <select
            class='select select-bordered w-full max-w-xs'
            onChange={(e) =>
              setValues((pre) => ({
                ...pre,
                theme: e.target.value as Theme,
              }))
            }
          >
            <option disabled selected>Pick the theme you want</option>
            <option value={'dark'} selected={values().theme === 'dark'}>
              Dark
            </option>
            <option value={'light'} selected={values().theme === 'light'}>
              Light
            </option>
          </select>

          <label class='label'>
            <span class='label-text'>
              Renderer(Render output inside)
            </span>
          </label>
          <select
            class='select select-bordered w-full max-w-xs'
            onChange={(e) =>
              setValues((pre) => ({
                ...pre,
                contentAs: e.target.value as SettingsValue['contentAs'],
              }))
            }
          >
            <option disabled selected>Pick the renderer you want</option>
            <option value={'iframe'} selected={values().contentAs === 'iframe'}>
              iframe
            </option>
            <option value={'shadow-dom'} selected={values().contentAs === 'shadow-dom'}>
              Shadow DOM
            </option>
          </select>
        </div>
      </Modal>
    </>
  )
}

export default SettingsModal