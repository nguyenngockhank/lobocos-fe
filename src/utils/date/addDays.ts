export function addDays(date: Date, days: number) {
    const dateCopy = new Date(date);
    dateCopy.setDate(dateCopy.getDate() + days);
    return dateCopy;
}
