import type { Ref, ChangeEvent, MouseEvent } from 'react'

interface IProps {
  id: string
  value: string
  onChange: (e?: ChangeEvent) => void
  onClick: (e?: MouseEvent) => void
  readOnly: boolean
  error?: boolean
  errorMessage?: string
}

function Input(props: Partial<IProps>, ref: Ref<HTMLInputElement>) {
  const { id, value, onChange, onClick, readOnly, error, errorMessage } = props
  return (
    <div flex="1" pos="relative">
      <div border="1 rounded" className={`${error ? 'border-red-500' : 'border-secondary'}`}>
        <input
          id={id}
          value={value}
          onChange={onChange}
          onClick={onClick && onClick}
          readOnly={readOnly}
          ref={ref}
          w="full"
          border="rounded"
          p="x-2 y-1.5"
          outline="focus:none"
          text="right"
        />
      </div>
      {error && <div  pos="absolute right-0" text="sm right red-500">{errorMessage}</div>}
    </div>
  )
}

export default forwardRef(Input)
