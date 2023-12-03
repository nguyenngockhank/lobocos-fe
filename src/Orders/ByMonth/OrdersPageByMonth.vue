
<script lang="ts" setup>
import OrderList from "../OrderList.vue"
import OrderListHeader from "../OrderListHeader.vue"
import dayjs from 'dayjs';
import { useOrdersStore } from '../OrdersStore'
import {  onBeforeMount, ref, watch } from 'vue';


const chosenMonth = ref(dayjs())
const orderStore = useOrdersStore()


onBeforeMount(() => {
    const dayjsObj = chosenMonth.value;
    orderStore.fetchOrdersByMonth({
        year: dayjsObj.year(),
        month: dayjsObj.month(),
    })
})

watch(chosenMonth, async (newMonth) => {
  if (newMonth) {
    orderStore.fetchOrdersByMonth({
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

<template>
<a-row type="flex" >
    <a-col  style="margin-bottom: 20px" :sm="12" :md="8" :lg="6" >
        Khoảng thời gian
        <a-date-picker 
            v-model:value="chosenMonth" 
            picker="month" 
        />
    </a-col>
    <OrderListHeader />
</a-row>   

<OrderList />
</template>
