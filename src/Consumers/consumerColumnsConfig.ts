// import type { ConsumerResponse } from "./consumerApi";

export type ConsumerDto = {
    id: number
    fullname: string
    amount_spent: number
    amount_incompleted: number
    rank: string
}

const makeNumberSorter = (field: string) => {
    return (a: any, b: any) => {
        return a[field] - b[field]
    }
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
        sorter: (a: ConsumerDto, b: ConsumerDto) =>{
            const nameA = a.fullname.toUpperCase(); // ignore upper and lowercase
            const nameB = b.fullname.toUpperCase(); // ignore upper and lowercase
            return nameA < nameB ? -1 : (nameA > nameB ? 1 : 0)
        },
    },
    {
        title: 'Rank',
        key: 'rank',
        sorter: (a: ConsumerDto, b: ConsumerDto) =>{
            const nameA = a.rank?.toUpperCase(); // ignore upper and lowercase
            const nameB = b.rank?.toUpperCase(); // ignore upper and lowercase
            return nameA < nameB ? -1 : (nameA > nameB ? 1 : 0)
        },
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
        sorter: makeNumberSorter('amount_spent'),
        sortDirections: ['descend'],
    },
    {
        title: 'Đơn hoàn thành',
        key: 'count_completed_orders',
        sorter: makeNumberSorter('count_completed_orders'),
    },
    {
        title: 'Cọc',
        key: 'amount_incompleted',
        responsive: ['md'],
        sorter: makeNumberSorter('amount_incompleted'),
    },
    {
        title: 'Đơn chưa',
        key: 'count_incompleted_orders',
        sorter: makeNumberSorter('count_incompleted_orders'),
    },
    {
        title: 'Địa chỉ',
        key: 'address',
        responsive: ['md'],
    },
    {
        title: 'Action',
        key: 'action',
    },
].map(item => ({...item, dataIndex: item.key }))