import type { OrderResponse } from "@/Calendar/calendarApi";

export const columnsConfig = [
    {
        title: 'Mã Đơn',
        key: 'id',
        sorter: (a: OrderResponse, b: OrderResponse) => a.id - b.id,
    },
    {
        title: 'Khách',
        key: 'fullname',
    },
    {
        title: 'Hình ảnh',
        key: 'image',
    },
    {
        title: 'Thanh toán',
        key: 'total',
    },
    // {
    //     title: 'Deadline',
    //     key: 'deadline_at',
    // },
    {
        title: 'Note',
        key: 'note',
        responsive: ['md'],
    },
    {
        title: 'Địa chỉ',
        key: 'address',
        responsive: ['md'],
    },
].map(item => ({...item, dataIndex: item.key }))
