import { createContext, Suspense } from 'react'
import routes from '~react-pages'
import './App.css'
import { useIDB } from './hooks'

import type { TDBFunc } from './hooks'

export const EventContext = createContext<{
  db?: TDBFunc,
}>({
  db: undefined,
})

function App() {
  const [db, setDB] = useState<TDBFunc>()

  useEffect(() => {
    async function fetchData() {
      const ret = await useIDB()
      setDB(ret)
    }
    fetchData()
  }, [])

  return (
    <div max-w="screen-xs" m="x-auto" w="full" h="full">
      <EventContext.Provider value={{ db }}>
        <div w="full" p="2">
          <Suspense fallback="loading...">
            {useRoutes(routes)}
          </Suspense>
        </div>
      </EventContext.Provider>
    </div>
  )
}

export default App
