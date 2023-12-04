import type { OrderResponse } from "@/Calendar/calendarApi";

export const orderColumnsConfig = [
    {
        title: 'Mã Đơn',
        key: 'id',
        sorter: (a: OrderResponse, b: OrderResponse) => a.id - b.id,
    },
    {
        title: 'Hạn',
        key: 'deadline_at',
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
        title: 'Tổng đơn',
        key: 'total',
    },
    {
        title: 'Đã nhận',
        key: 'total_paid',
    },
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
    {
        key: 'action',
        title: 'Action',
    }
].map(item => ({...item, dataIndex: item.key }))
