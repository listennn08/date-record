import dayjs from 'dayjs'
import { createContext, Dispatch, SetStateAction } from 'react'
import { formatDate } from '../../utils'
import Input from '../input'
import Calendar from './Calendar'

interface IProps {
  id?: string
  value?: Date
  onChange?: (n: string, v: Date) => void
  error?: boolean
  errorMessage?: string
}

const DatePicker = ({ id, value, onChange, error, errorMessage }: IProps) => {
  const displayValue = formatDate(dayjs(value))
  const calendarRef = useRef<HTMLDivElement>(null)
  const [show, setShow] = useState(false)
  
  const handleChange = (v: Date) => {
    onChange && onChange(id!, v)
  }
  useEffect(() => {
    function clickOutside(e: MouseEvent) {
      if (!calendarRef.current!.contains(e.target as HTMLElement)) {
        setShow(false)
      }
    }

    document.removeEventListener('click', clickOutside)
    document.addEventListener('click', clickOutside)
    return () => {
      document.removeEventListener('click', clickOutside)
    }
  }, [])
  
  return (
    <div pos="relative" flex="1" ref={calendarRef}>
      <Input
        value={displayValue}
        readOnly
        onClick={() => setShow(true)}
        error={error}
        errorMessage={errorMessage}
      />
      {show && <Calendar value={value!} onChange={handleChange} show={show} setShow={setShow} />}
    </div>
  )
}

export default DatePicker
