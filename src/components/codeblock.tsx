interface Props {
  value: string
  onChange: (value: string) => void
  language: string
}

export default function Codeblock({ language, value, onChange }: Props) {
  return (
    <div>
      <h1>{language}</h1>
      <textarea onChange={(e) => onChange(e.target.value)}>{value}</textarea>
    </div>
  )
}
