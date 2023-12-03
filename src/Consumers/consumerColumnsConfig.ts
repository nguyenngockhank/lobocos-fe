// import type { ConsumerResponse } from "./consumerApi";

export type ConsumerDto = {
    id: number
    amount_spent: number
    amount_incompleted: number
}

export const columnsConfig = [
    {
        title: 'Mã KH',
        key: 'id',
        sorter: (a: ConsumerDto, b: ConsumerDto) => a.id - b.id,
    },
    {
        title: 'Tên',
        key: 'name',
        // filterMode: 'menu',
        // filterSearch: true,
        // onFilter: (value, record: any) => record.name.startsWith(value),
    },
    {
        title: 'Điện thoại',
        key: 'phone',
    },
    {
        title: 'Tổng chi',
        key: 'amount_spent',
        responsive: ['md'],
        defaultSortOrder: 'descend',
        sorter: (a: ConsumerDto, b: ConsumerDto) => a.amount_spent - b.amount_spent,
        sortDirections: ['descend'],
    },
    {
        title: 'Đơn hoàn thành',
        key: 'count_completed_orders',
    },
    {
        title: 'Cọc',
        key: 'amount_incompleted',
        responsive: ['md'],
        sorter: (a: ConsumerDto, b: ConsumerDto) => a.amount_incompleted - b.amount_incompleted,
    },
    {
        title: 'Đơn chưa',
        key: 'count_incompleted_orders',
    },
    {
        title: 'Địa chỉ',
        key: 'address',
        responsive: ['md'],
    },
].map(item => ({...item, dataIndex: item.key }))