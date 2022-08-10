interface IProps {
  value: 0 | 1
  onChange: (v: 0 | 1) => void
}

const Toggle = ({ value, onChange }: IProps) => {
  const handleClick = () => onChange(!!value ? 0 : 1)
  return (
    <>
      <input type="checkbox" value={value} display="hidden" />
      <div
        w="16"
        h="8"
        p="1"
        bg="opacity-50"
        border="rounded-full"
        pos="relative"
        before="content-DEFAULT w-6 h-6 rounded-full bg-stone-50 absolute transform transition-transform"
        className={`${!!value && 'before:(translate-x-[calc(100%+0.4rem)])'} ${!!value ? 'bg-green-600' : 'bg-gray-400'}`}
        onClick={handleClick}
      />
    </>
  )
}

export default memo(Toggle)
