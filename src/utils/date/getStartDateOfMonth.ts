export function getStartDateOfMonth(myDate: Date) : Date {
    const date = new Date();
    date.setUTCFullYear(myDate.getUTCFullYear());
    date.setUTCMonth(myDate.getUTCMonth());
    date.setUTCDate(1);
    date.setUTCHours(0);
    date.setUTCMinutes(0);
    return date;
}
