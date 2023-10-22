export function maxDate(date1: Date, date2: Date) : Date {
    return date1.getTime() > date2.getTime() ? date1 : date2;
}