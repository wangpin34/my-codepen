import { createEffect } from 'solid-js'
//@ts-ignore
import { CSS_Preprocessors } from 'contexts/settings-context'
import useSettings from 'hooks/useSettings'
import sass from 'sass.js/dist/sass.sync.js'
import Codeblock from '../codeblock'

sass.options(
  {
    // default as scss
    indentedSyntax: false,
  },
  function callback() {
    // invoked without arguments when operation completed
  }
)

// enum CSS_Preprocessors {
//   Plain = 'plain',
//   Sass = 'sass',
//   Scss = 'scss',
// }

const cssLanguages: Record<CSS_Preprocessors, 'css' | 'sass' | 'scss'> = {
  [CSS_Preprocessors.Plain]: 'css',
  [CSS_Preprocessors.Sass]: 'sass',
  [CSS_Preprocessors.Scss]: 'scss',
}





interface Props {
  initialValue?: string
  onChange: (v: string) => void
}

export default function CSSCodeblock(props: Props) {
  const [settings] = useSettings()

  createEffect(() => {
    if (settings.cssPreprocessor === CSS_Preprocessors.Sass) {
      console.debug(`load sass preprocessor`)
      sass.options(
        {
          // default as scss
          indentedSyntax: true,
        },
        function callback() {
          // invoked without arguments when operation completed
        }
      )
    } else if (settings.cssPreprocessor === CSS_Preprocessors.Scss) {
      console.debug(`load scss preprocessor`)
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
      console.debug('use none preprocessor')
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
      settings.cssPreprocessor === CSS_Preprocessors.Sass ||
      settings.cssPreprocessor === CSS_Preprocessors.Scss
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
     <Codeblock
        initialValue={props.initialValue}
        onChange={(value: string) =>
          transformPreprocessor(value, props.onChange, (errMsg) => console.error(errMsg))
        }
        language={
          cssLanguages[settings.cssPreprocessor ?? CSS_Preprocessors.Plain]
        }
      />
  )
}
