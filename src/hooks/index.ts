import { openDB } from 'idb'
import { v4 as uuid } from 'uuid'

import type { DBSchema, IDBPDatabase } from 'idb'

export type TDateRecord = {
  id: string
  name: string
  startDate: Date
  isEnd: 0 | 1
  endDate?: Date
}

export type TDBFunc = {
  get(key?: string): Promise<TDateRecord | TDateRecord[] | undefined>
  set(value: Partial<TDateRecord>): void
  delete(id: string): void
}

interface IRecordDB extends DBSchema {
  dateRecord: {
    value: TDateRecord,
    key: string
    indexes: {
      'by-end': number
      'by-startDate': string
    }
  }
}

export const useIDB = async () => {
  const db = await openDB<IRecordDB>('record', 1, {
    upgrade(db: IDBPDatabase<IRecordDB>) {
      const dateRecordStore = db.createObjectStore('dateRecord', {
        keyPath: 'id',
      })
      dateRecordStore.createIndex('by-end', 'isEnd')
    }
  })

  const dateRecord: TDBFunc = {
    async get(key) {
      if (key) {
        return await db.get('dateRecord', key)
      }
      return await db.getAll('dateRecord')
    },
    set(value) {
      if (value.id) {
        db.delete('dateRecord', value.id)
        return db.add('dateRecord', value as TDateRecord)
      }
      const data = {
        id: uuid(),
        name: value.name!,
        startDate: value.startDate!,
        isEnd: value.isEnd!,
        endDate: value?.endDate,
      }
      return db.add('dateRecord', data)
    },
    async delete(id: string) {
      await db.delete('dateRecord', id)
    },
  }

  return { ...dateRecord }
}
