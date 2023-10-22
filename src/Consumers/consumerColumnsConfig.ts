import type { ConsumerResponse } from "./consumerApi";

export const columnsConfig = [
    {
        title: 'Mã KH',
        key: 'id',
        sorter: (a: ConsumerResponse, b: ConsumerResponse) => a.id - b.id,
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
        key: 'total_spent',
        responsive: ['md'],
        defaultSortOrder: 'descend',
        sorter: (a: ConsumerResponse, b: ConsumerResponse) => a.total_spent - b.total_spent,
        sortDirections: ['descend'],
    },
    {
        title: 'Địa chỉ',
        key: 'address',
        responsive: ['md'],
    },
    // {
    //     title: 'Action',
    //     key: 'action',
    // }
].map(item => ({...item, dataIndex: item.key }))