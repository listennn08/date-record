import dayjs from 'dayjs'
import Input from '../components/input'
import DatePicker from '../components/date-picker';
import FormField from '../components/form-field';
import Toggle from '../components/toggle';
import { NavItem } from '../components/nav';
import { EventContext } from '../App';

import type { ChangeEvent } from 'react';
import type { TDateRecordValue } from '../types';

export default function id() {
  const { id } = useParams()
  const navigator = useNavigate()
  const { db } = useContext(EventContext)
  const [validate, setValidate] = useState({
    name: false,
    endDate: false
  })
  const [event, setEvent] = useState<TDateRecordValue>({
    name: '',
    startDate: new Date(),
    isEnd: 0,
    endDate: new Date(),
  })

  const handleChange = (e?: ChangeEvent) => {
    const target = e!.target as HTMLInputElement
    setEvent({ ...event, [target.id]: target.value})
  }
  const handleDateChange = (n: string, v: Date) => setEvent({ ...event, [n]: v })
  const handleToggle = (v: 0 | 1) => setEvent({ ...event, isEnd: v })
  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!event.name) {
      setValidate({ ...validate, name: true })
      return
    }
    if (event.isEnd && dayjs(event.startDate).isAfter(dayjs(event.endDate))) {
      setValidate({ ...validate, endDate: true })
      return
    }
    db?.set(event)
    navigator('/')
  }

  useEffect(() => {
    async function fetchData() {
      setEvent(await db!.get(id) as TDateRecordValue)
    }
    if (db && id !== 'new') {
      fetchData()
    }
  }, [db])

  useEffect(() => {
    if (event.name) setValidate({ ...validate, name: false })
    if (!event.isEnd) setValidate({ ...validate, endDate: false }) 
    if (dayjs(event.startDate).isBefore(dayjs(event.endDate)))
      setValidate({ ...validate, endDate: false }) 
  }, [event])

  return (
    <form onSubmit={handleSubmit}>
      <header p="2">
        <ul flex="~" align="center" justify="between">
          <NavItem>
            <Link to="/" text="no-underline secondary">Cancel</Link>
          </NavItem>
          <NavItem>
            <button type="submit">Done</button>
          </NavItem>
        </ul>
      </header>

      <FormField>
        <label m="r-8">事件名稱</label>
        <Input
          id="name"
          value={event.name}
          onChange={handleChange}
          error={validate.name}
          errorMessage="事件名稱為必填！"
        />
      </FormField>
      <FormField>
        <label m="r-8">開始日期</label>
        <DatePicker id="startDate" value={event.startDate} onChange={handleDateChange} />
      </FormField>
      <FormField>
        <label m="r-8">已結束</label>
        <Toggle value={event.isEnd} onChange={handleToggle} />
      </FormField>
      {!!event.isEnd && (
        <FormField>
          <label m="r-8">結束日期</label>
          <DatePicker
            id="endDate"
            value={event.endDate!}
            onChange={handleDateChange}
            error={validate.endDate}
            errorMessage="結束日期必須大於開始日期！"
          />
        </FormField>
      )}
    </form>
  )
}
