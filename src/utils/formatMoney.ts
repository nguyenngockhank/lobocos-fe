const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});

export function formatMoney(value: number) {
    return formatter.format(value);
}