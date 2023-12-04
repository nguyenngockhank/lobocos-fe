
import  { Dayjs }  from 'dayjs';

export function dayjsToMonthDb(value: Dayjs) {
    const year = value.year()
    const month = value.month()
    const monthStr = (month + 1).toString().padStart(2, '0')
    return `${year}-${monthStr}`;
}