export function formatDate(value: string) {
    // value format from mysql: 2023-07-15 00:00:00
    const [date] = value.match(/\d+-\d+-\d+/) as any;
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`
}