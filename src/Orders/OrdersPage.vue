<template>
<div style="margin: 20px 0">
    Đơn tháng 
    <a-date-picker 
        v-model:value="chosenMonth" 
        picker="month" 
    />
</div>
<a-table :columns="columns" :row-key="(record: any) => record.id" :data-source="orders" 
    :pagination="false"
>
    <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'image'">
            <a-image
                :width="150"
                :src="record.image"
            />
        </template>
    </template>

</a-table>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs';
import { storeToRefs } from 'pinia'
import { useOrdersStore } from './OrdersStore'
import type { OrderResponse } from '@/Calendar/calendarApi';
import { onBeforeMount, ref, watch } from 'vue';

const chosenMonth = ref(dayjs())
const orderStore = useOrdersStore()
const { orders } = storeToRefs(orderStore);

onBeforeMount(() => {
    const dayjsObj = chosenMonth.value;
    orderStore.fetchOrders({
        year: dayjsObj.year(),
        month: dayjsObj.month(),
    })
})

const columns = [
    {
        title: 'Mã Đơn',
        key: 'id',
        sorter: (a: OrderResponse, b: OrderResponse) => a.id - b.id,
    },
    {
        title: 'Tên KH',
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
        title: 'Deadline',
        key: 'deadline_at',
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

watch(chosenMonth, async (newMonth, oldQuestion) => {
  if (newMonth) {
    orderStore.fetchOrders({
        year: newMonth.year(),
        month: newMonth.month(),
    })
  }
})
</script>

<style>
.month-picker__container {
    z-index: 10;
}
</style>