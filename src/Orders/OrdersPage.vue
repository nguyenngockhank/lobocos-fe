<template>
<a-row type="flex" >
    <a-col  style="margin-bottom: 20px" :sm="12" :md="8" :lg="6" >
        Đơn tháng 
        <a-date-picker 
            v-model:value="chosenMonth" 
            picker="month" 
        />
    </a-col>
    <a-col style="margin-bottom: 20px"  :sm="12" :md="16" :lg="18" >
        <a-tag color="default">{{ orders.length }} đơn</a-tag>
        <a-tag color="blue">{{ formatMoney(sumTotal) }}</a-tag> - 
        <a-tag color="success">{{ formatMoney(sumTotalPaid) }}</a-tag> =
        <a-tag color="red">{{ formatMoney(sumTotal - sumTotalPaid) }}</a-tag>
    </a-col>
</a-row>   

<a-table :columns="columns" :row-key="(record: any) => record.id" :data-source="orders" 
    :pagination="false"
>
    <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'id'">
            <OrderId :value="record.id" />
            <Deadline :value="record.deadline_at" />

            #{{ record.type }}
            #{{ record.status }}
        </template>
        <template v-if="column.key === 'fullname'">
            <ConsumerId :value="record.consumer_id" />
            <ConsumerName :consumer="record" />
        </template>
        <template v-if="column.key === 'image'">
            <a-image :width="150" :src="record.image" />
        </template>
        <template v-if="column.key === 'note'">
            <p v-html="record.note"></p>
        </template>
        <template v-if="column.key === 'total'">
            <a-tag color="blue">{{ formatMoney(record.total) }}</a-tag>
            <a-tag color="success">{{ formatMoney(record.total_paid) }}</a-tag>
            <a-tag color="red" v-if="record.total === record.total_paid">
                Đã nhận 100%
            </a-tag>
        </template>
    </template>


    <template #expandedRowRender="{ record }">
        <OrderDetail :order="record" />
    </template>
</a-table>
</template>

<script lang="ts" setup>
import ConsumerId from "@/Consumers/ConsumerId.vue"
import ConsumerName from "@/Consumers/ConsumerName.vue"
import OrderId from './OrderId.vue'
import OrderDetail from './OrderDetail.vue'
import Deadline from './OrderDeadline.vue'
import dayjs from 'dayjs';
import { storeToRefs } from 'pinia'
import { useOrdersStore } from './OrdersStore'
import { computed, onBeforeMount, ref, watch } from 'vue';
import { formatMoney } from "@/utils/formatMoney"

import { columnsConfig as columns } from './columnsConfig'
import sumBy from 'lodash/sumBy'

const chosenMonth = ref(dayjs())
const orderStore = useOrdersStore()
const { orders } = storeToRefs(orderStore);

const sumTotal = computed(() => {
    return sumBy(orders.value, 'total');
})

const sumTotalPaid = computed(() => {
    return sumBy(orders.value, 'total_paid');
})

onBeforeMount(() => {
    const dayjsObj = chosenMonth.value;
    orderStore.fetchOrders({
        year: dayjsObj.year(),
        month: dayjsObj.month(),
    })
})

watch(chosenMonth, async (newMonth) => {
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