import type { Dayjs } from 'dayjs'

export const toArray = <T>(data: T) => {
  return Array.isArray(data) ? data : [data]
} 

export const formatDate = (d: Dayjs) => d.format('YYYY-MM-DD')