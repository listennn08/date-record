import { Dispatch, SetStateAction, ReactNode } from 'react'
import dayjs, { Dayjs, UnitType } from 'dayjs'
import IconChevronRight from '~icons/mdi/chevron-right'
import IconChevronLeft from '~icons/mdi/chevron-left'
import { formatDate } from '../../utils'

const monthEnum = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const weekdayEnum = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const countMapping: {
  [key: string]: {
    type: UnitType,
    count: number
  } 
} = {
  date: {
    type: "month",
    count: 1,
  },
  month: {
    type: "year",
    count: 1,
  },
  year: {
    type: "year",
    count: 16,
  }
}

interface IProps {
  value: Date,
  onChange: (v: Date) => void
  show: boolean
  setShow: Dispatch<SetStateAction<boolean>>
}

const Calendar = ({ value, onChange, show, setShow }: IProps) => {
  const [calendarType, setCalendarType] = useState('date')
  const today = dayjs()
  const [selected, setSelected] = useState(dayjs(value))
  const [point, setPoint] = useState(dayjs(value))
  const startOfDate = point.startOf('month').day()
  const totalDay = point.daysInMonth()
  
  const isToday = (date: Dayjs) => formatDate(today) === formatDate(date)
  const weekLength = Math.ceil((startOfDate + totalDay) / 7)
  const handleClick = (d: number) => {
    const value = formatDate(point.set("date", d))
    onChange(new Date(value))
    setShow(false)
  }

  const days = Array.from({ length: weekLength * 7 }).map((_, i) => {
    if (i < startOfDate || (i - startOfDate + 1) > totalDay) return <div key={i}></div>
    const d = i - startOfDate + 1
    const key = dayjs(`${point.year()}-${point.month() + 1}-${d}`)
    return (
      <button
        type="button"
        bg="hover:primary"
        border="1 rounded"
        className={`${isToday(key) ? 'border-primary' : 'border-transparent'} ${
          formatDate(selected) === formatDate(key) && 'bg-primary hover:bg-primary-light'
        }`}
        key={formatDate(key)}
        onClick={() => handleClick(d)}
      >{d}</button>
    )
  })
  
  const next = () => {
    const { type, count } = countMapping[calendarType]
    let c = 0
    if (type === 'month') {
      c = point.month() + count
    } else if (type === 'year') {
      c = point.year() + count
    }
    setPoint(point.set(type, c))
  }
  const prev = () => {
    const { type, count } = countMapping[calendarType]
    let c = 0
    if (type === 'month') {
      c = point.month() - count
    } else if (type === 'year') {
      c = point.year() - count
    }
    setPoint(point.set(type, c))
  }
  const toType = (type: UnitType, num: number) => {
    setPoint(point.set(type, num))
    if (type === 'year') {
      setCalendarType('month')
    } else if (type === 'month') {
      setCalendarType('date')
    }
  }
  const changeCalendarType = () => {
    if (calendarType === 'date') {
      setCalendarType('month')
    } else if (calendarType === 'month') {
      setCalendarType('year')
    } else if (calendarType === 'year') {
      setCalendarType('date')
    }
  }

  const body: { [key: string]: ReactNode } = {
    date: (
      <>
        {weekdayEnum.map((el) => <div p="1" cursor="default" key={el}>{el}</div>)}
        {days}
      </>
    ),
    month: monthEnum.map((el, i) => {
      return (
        <button
          type="button"
          bg="hover:primary"
          border="1 rounded"
          className={`${i === point.month() ? 'border-primary' : 'border-transparent'}`}
          onClick={() => toType('month', i)}
        >
          {el}
        </button>
      )
    }),
    year: [
      ...Array.from({ length: 6 }).map((_, i) => {
        const yy = point.year() - 5 + i
        return (
          <button
            type="button"
            bg="hover:primary"
            border="1 rounded"
            className={`${yy === point.year() ? 'border-primary' : 'border-transparent'}`}
            onClick={() => toType('year', yy)}
          >
            {yy}
          </button>
        )
      }),
      ...Array.from({ length: 10 }).map((_, i) => {
        const yy = point.year() + i + 1
        return (
          <button
            type="button"
            bg="hover:primary"
            border="1 rounded transparent"
            onClick={() => toType('year', yy)}
          >
            {yy}
          </button>
        )
      })
    ],
  }
  const bodyStyle: { [key: string]: string } = {
    date: 'grid-cols-7',
    month: 'grid-cols-3',
    year: 'grid-cols-4',
  }
  return (
    <div
      pos="absolute right-0" w="full" min-w="250px" bg="white" m="t-1" p="1"
      z="99" grid="~ cols-7" text="center" border="rounded-md" shadow="~"
    >
      <div grid="~ cols-7 col-span-7">
        <button type="button" flex="~" items="center" justify="center" onClick={prev}>
          <IconChevronLeft />
        </button>
        <button
          type="button"
          onClick={changeCalendarType}
          grid="col-span-5"
          flex="~"
          items="center"
          justify="center"
        >
          {monthEnum[point.month()]} {point.year()}
        </button>
        <button type="button" flex="~" items="center" justify="center" onClick={next}>
          <IconChevronRight />
        </button>
      </div>
      <div
        grid="~ col-span-7"
        className={bodyStyle[calendarType]}
      >
        {body[calendarType]}
      </div>
    </div>
  )
}

export default Calendar