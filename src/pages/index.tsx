import { TDateRecord, useIDB } from '../hooks'
import IconPlus from '~icons/mdi/plus'
import IconClose from '~icons/mdi/close'
import { NavItem } from '../components/nav';
import DayCount from '../components/day-count';

export default function Index() {
  const [obj, setObj] = useState<any>()
  const [events, setEvents] = useState<TDateRecord[]>([]);
  const [edit, setEdit] = useState(false);
  const initDb = async () => {
    const idb = await useIDB()
    setObj(idb)
  }
  const getData = async () => {
    setEvents((await obj.get())
      .sort((a: TDateRecord, b: TDateRecord) => a.isEnd - b.isEnd))
  }
  const deleteData = async (id: string) => {
    await obj.delete(id)
    await getData()
  }

  useEffect(() => {
    if (!obj) {
      initDb()
    }
  }, [])

  useEffect(() => {
    if (obj) getData()
  }, [obj])

  return (
    <>
      <header p="2">
        <ul flex="~" align="center" justify="end">
          <NavItem>
            <Link to="/new" flex="~" items="center" font="bold" text="secondary">
              <IconPlus />
            </Link>
          </NavItem>
          <NavItem>
            <button outline="focus:none" onClick={() => setEdit(!edit)}>EDIT</button>
          </NavItem>
        </ul>
      </header>
      <ul list="none" p="2">
        {events.map((el) => (
          <li key={el.id} m="2" text="xl" flex="~" bg="white" p="y-2 x-4" border="rounded-md">
            <Link
              to={`/${el.id}`}
              text="secondary no-underline"
              flex="~"
              items="center"
              justify="between"
              transition="all"
              className={`${edit ? 'w-11/12' : 'w-full'}`}
            >
              <span>{el.name}</span>
              <DayCount {...el} />
            </Link>
            {edit && (
              <button
                onClick={() => deleteData(el.id)}
                m="l-2"
                flex="~"
                items="center"
                text="red-600"
              >
                <IconClose />
              </button>
            )}
          </li>
        ))}
      </ul>
    </>
  )
}
