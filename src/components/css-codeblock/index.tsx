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

enum CSS_Preprocessors {
  Plain = 'plain',
  Sass = 'sass',
  Scss = 'scss',
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
        colorSchema='ghost'
      >
        <Settings size={20} color='#3a4a5a' />
      </Button>
      <Modal
        title='CSS settings'
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
              Pick the preprocessor
            </span>
          </label>
          <select
            class='select select-bordered w-full max-w-xs'
            data-css-preprocessor={values().preprocessor}
            onChange={(e) =>
              setValues((pre) => ({
                ...pre,
                preprocessor: e.target.value as CSS_Preprocessors,
              }))
            }
          >
            {/* <option disabled selected>Pick the preprocessor you want</option> */}
            <option value={CSS_Preprocessors.Plain} selected={values().preprocessor === CSS_Preprocessors.Plain}>
              None (use plain CSS)
            </option>
            <option value={CSS_Preprocessors.Sass} selected={values().preprocessor === CSS_Preprocessors.Sass}>SASS</option>
            <option value={CSS_Preprocessors.Scss} selected={values().preprocessor === CSS_Preprocessors.Scss}>SCSS</option>
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


  interface CompilerError {
    column: number
    line: number
    file: string
    formatted: string
    message: string
    status: 1 // 1 for err, 0 for ok
  }

  interface CompilerResult {
    status: 0 // 1 for err, 0 for ok
    text: string
  }

  const transformPreprocessor = (
    source: string,
    onSuccess: (result: string) => void,
    onError?: (err: CompilerError) => void
  ) => {
    if (
      settings().preprocessor === CSS_Preprocessors.Sass ||
      settings().preprocessor === CSS_Preprocessors.Scss
    ) {
      sass.compile(source, function (result: CompilerResult | CompilerError) {
        if (result.status === 0) {
          onSuccess(result.text)
        } else {
          onError && onError(result)
        }
      })
    } else {
      onSuccess(source)
    }
  }

  return (
    <div class='flex flex-col'>
      <div class='flex flex-row items-center'>
        <span class="uppercase">
          {cssLanguages[settings().preprocessor ?? CSS_Preprocessors.Plain]}
        </span>
        <SettingsModal settings={settings()} onSubmit={setSettings} />
      </div>
      <Codeblock
        initialValue={''}
        onChange={(value: string) =>
          transformPreprocessor(value, props.onChange, (errMsg) => console.error(errMsg))
        }
        language={
          cssLanguages[settings().preprocessor ?? CSS_Preprocessors.Plain]
        }
      />
    </div>
  )
}
