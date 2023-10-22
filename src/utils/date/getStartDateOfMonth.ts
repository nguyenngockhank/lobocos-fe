export function getStartDateOfMonth(myDate: Date) : Date {
    const date = new Date(myDate.getUTCFullYear(), myDate.getUTCMonth(), 1);
    date.setUTCHours(0);
    return date;
}
