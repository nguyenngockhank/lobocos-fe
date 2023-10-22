export function getEndDateOfMonth(myDate: string | Date) : Date {
    const date = new Date(myDate);

    date.setUTCDate(1); // Avoids edge cases on the 31st day of some months
    date.setUTCMonth(date.getUTCMonth() + 1);
    date.setUTCDate(0);

    date.setUTCHours(23);
    date.setMinutes(59);
    date.setSeconds(59);
    return date;
}
