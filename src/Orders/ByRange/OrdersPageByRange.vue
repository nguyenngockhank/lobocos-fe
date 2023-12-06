
<script lang="ts" setup>
import OrderListHeader from '../OrderListHeader.vue'
import OrderList from '../OrderList/OrderList.vue'
import { useOrdersStore } from '../OrdersStore'
import { watch, onBeforeMount, ref } from 'vue';

import dayjs, { Dayjs } from 'dayjs';
import { DAYJS_FORMAT } from '@/constants';


type RangeValue = [Dayjs, Dayjs];
const rangeInput = ref<RangeValue>([
    dayjs('2022-10-01', DAYJS_FORMAT),
    dayjs('2023-12-31', DAYJS_FORMAT),
]);

const orderStore = useOrdersStore()


onBeforeMount(() => {
    orderStore.fetchOrdersByRange({
        startDate: rangeInput.value[0].format(DAYJS_FORMAT),
        endDate: rangeInput.value[1].format(DAYJS_FORMAT),
    })
})

watch(rangeInput, (newMonth) => {
  if (newMonth) {
    orderStore.fetchOrdersByRange({
        startDate: rangeInput.value[0].format(DAYJS_FORMAT),
        endDate: rangeInput.value[1].format(DAYJS_FORMAT),
    })
  }
})
</script>
<style>
.month-picker__container {
    z-index: 10;
}
</style>

<template>
<a-row type="flex" >
    <a-col  style="margin-bottom: 20px" :sm="12" :md="8" :lg="6" >
        Đơn tháng 
        <a-range-picker v-model:value="rangeInput" />
    </a-col>
    <OrderListHeader />
</a-row>   

<OrderList />
</template>
