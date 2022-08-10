import dayjs, { Dayjs } from 'dayjs'
import { TDateRecord } from '../hooks'

const DayCount = ({ isEnd, startDate, endDate}: TDateRecord) => {
  const getDurationDay = (s: Dayjs, e: Dayjs) => dayjs(e).diff(s, 'day')
  const countDay = isEnd
    ? getDurationDay(dayjs(startDate), dayjs(endDate))
    : getDurationDay(dayjs(startDate), dayjs(new Date()))
  return (
    <>
    {isEnd ? '總共' : '過了'}&nbsp;
    {countDay} 天
    </>
  )
}

export default memo(DayCount)