import { createEffect, createSignal } from 'solid-js'
//@ts-ignore
import sass from 'sass.js/dist/sass.sync.js'
import Button from '../button'
import Codeblock from '../codeblock'
import Settings from '../icons/settings'
import Modal from '../modal'

sass.options(
  {
    // default as scss
    indentedSyntax: false,
  },
  function callback() {
    // invoked without arguments when operation completed
  }
)

var scss = '$someVar: 123px; .some-selector { width: $someVar; }'
sass.compile(scss, function (result: any) {
  console.log(result)
})

enum CSS_Preprocessors {
  Plain,
  Sass,
  Scss,
}

const cssLanguages: Record<CSS_Preprocessors, 'css' | 'sass' | 'scss'> = {
  [CSS_Preprocessors.Plain]: 'css',
  [CSS_Preprocessors.Sass]: 'sass',
  [CSS_Preprocessors.Scss]: 'scss',
}

interface Props {
  onChange: (v: string) => void
}

interface SettingsProps {
  settings: {
    preprocessor?: CSS_Preprocessors
  }
  onSubmit: (v: { preprocessor?: CSS_Preprocessors }) => void
}

function SettingsModal(props: SettingsProps) {
  const [show, setShow] = createSignal(false)
  const [values, setValues] = createSignal(props.settings)
  createEffect(() => {
    setValues(props.settings)
  })
  const handleSubmit = () => {
    props.onSubmit(values())
    setShow(false)
  }
  const handleCancel = () => {
    setValues(props.settings)
    setShow(false)
  }
  return (
    <>
      <Button
        onClick={() => setShow((pre) => !pre)}
        size='xs'
        colorSchema='ghost'
      >
        <Settings size={16} color='#cccccc' />
      </Button>
      <Modal
        title='HTML settings'
        show={show()}
        onClose={handleCancel}
        actionButtons={
          <>
            <Button colorSchema='primary' onClick={handleSubmit}>
              Apply
            </Button>
            <Button colorSchema='secondary' onClick={handleCancel}>
              CLOSE
            </Button>
          </>
        }
      >
        <div class='form-control w-full max-w-xs'>
          <label class='label'>
            <span class='label-text'>
              Pick the preprocessor - {values().preprocessor}
            </span>
          </label>
          <select
            class='select select-bordered'
            value={values().preprocessor}
            onChange={(e) =>
              setValues((pre) => ({
                ...pre,
                preprocessor: parseInt(e.target.value),
              }))
            }
          >
            <option disabled selected value={CSS_Preprocessors.Plain}>
              No preprocessor
            </option>
            <option value={CSS_Preprocessors.Sass}>SASS</option>
            <option value={CSS_Preprocessors.Scss}>SCSS</option>
          </select>
        </div>
      </Modal>
    </>
  )
}

export default function CSSCodeblock(props: Props) {
  const [settings, setSettings] = createSignal<{
    preprocessor?: CSS_Preprocessors
  }>({
    preprocessor: CSS_Preprocessors.Plain,
  })

  createEffect(() => {
    if (settings().preprocessor === CSS_Preprocessors.Sass) {
      sass.options(
        {
          // default as scss
          indentedSyntax: true,
        },
        function callback() {
          // invoked without arguments when operation completed
        }
      )
    } else if (settings().preprocessor === CSS_Preprocessors.Scss) {
      sass.options(
        {
          // default as scss
          indentedSyntax: false,
        },
        function callback() {
          // invoked without arguments when operation completed
        }
      )
    } else {
      // do nothing for now
    }
  })

  const transformPreprocessor = (
    source: string,
    onSuccess: (result: string) => void,
    onError?: (error: string) => void
  ) => {
    if (
      settings().preprocessor === CSS_Preprocessors.Sass ||
      settings().preprocessor === CSS_Preprocessors.Scss
    ) {
      sass.compile(source, function (result: { status: 0 | 1; text: string }) {
        if (result.status === 0) {
          onSuccess(result.text)
        } else {
          onError && onError(result.text)
        }
      })
    } else {
      onSuccess(source)
    }
  }

  return (
    <div class='flex flex-col'>
      <div class='flex flex-row items-center'>
        <span>CSS</span>
        <SettingsModal settings={settings()} onSubmit={setSettings} />
      </div>
      <Codeblock
        initialValue={''}
        onChange={(value: string) =>
          transformPreprocessor(value, props.onChange)
        }
        language={
          cssLanguages[settings().preprocessor ?? CSS_Preprocessors.Plain]
        }
      />
    </div>
  )
}
