<template>
<a-table :columns="columns" :row-key="(record: any) => record.id" :data-source="consumers" 
    :pagination="{ defaultPageSize: 50, position: ['topRight', 'bottomRight']}"
>
    <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'name'">
            <ConsumerName :consumer="record" />
        </template>
        <template v-if="column.key === 'total_spent'">
            <ConsumerTotalSpent :consumer="record" />
        </template>
        <template v-if="column.key === 'action'">
            <a-popconfirm
                title="Sure to delete?"
                @confirm="() => {  return true; }"
                >
                <a>Delete</a>
            </a-popconfirm>
        </template>
    </template>
    <template #expandedRowRender="{ record }">
        <a-descriptions
            title="Thông tin chi tiết"
            bordered
           
            :column="{  sm: 2, xs: 1 }"
        >
            <a-descriptions-item label="Số đo"><p v-html="record.measure"></p></a-descriptions-item>
        
            <a-descriptions-item label="Ngày thêm"><p>{{ record.created_at }}</p></a-descriptions-item>
            <a-descriptions-item label="Ghi chú">
                <p>{{ record.note }}</p>
            </a-descriptions-item>
           
        </a-descriptions>

        <a-row type="flex">
            <a-col :span="24" :md="0" >
            <a-descriptions
                bordered
                :column="{ sm: 2, xs: 1 }"
                >
                <a-descriptions-item label="Tổng chi">
                    <ConsumerTotalSpent :consumer="record" />
                </a-descriptions-item>
                <a-descriptions-item label="Địa chỉ">
                    <p>{{ record.address }}</p>
                </a-descriptions-item>
            </a-descriptions>
            </a-col>
        </a-row>    
    </template>
</a-table>
</template>

<script lang="ts" setup>
import { onBeforeMount } from 'vue'
import { storeToRefs } from 'pinia'
import { useConsumersStore } from './ConsumersStore'
import ConsumerName from './ConsumerName.vue'
import ConsumerTotalSpent from './ConsumerTotalSpent.vue'
import type { ConsumerResponse } from './consumerApi'

const consumersStore = useConsumersStore()

onBeforeMount(() => {
    consumersStore.fetchConsumers();
})

const { consumers } = storeToRefs(consumersStore);
const columns = [
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
        // sortDirections: ['descend'],
    },
    {
        title: 'Địa chỉ',
        key: 'address',
        responsive: ['md'],
    },
    {
        title: 'Action',
        key: 'action',
    }
].map(item => ({...item, dataIndex: item.key }))
</script>

<style>
.ant-descriptions-view {
    border-radius: 0!important;
}
</style>