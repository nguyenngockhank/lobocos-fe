
<script lang="ts" setup>
import OrderListHeader from '../OrderListHeader.vue'
import OrderList from '../OrderList.vue'
import { useOrdersStore } from '../OrdersStore'
import {  watch, onBeforeMount, ref,  } from 'vue';

const statusInput = ref('unknown');

const orderStore = useOrdersStore()


onBeforeMount(() => {
    orderStore.fetchOrdersByStatus({
        status: statusInput.value
        // startDate: rangeInput.value[0].format(dateFormat),
        // endDate: rangeInput.value[1].format(dateFormat),
    })
})

watch(statusInput, async (newVal) => {
  if (newVal) {
    orderStore.fetchOrdersByStatus({
        status: newVal
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
        Theo tình trạng 
        <a-select
            ref="select"
            v-model:value="statusInput"
            style="width: 120px"
        >
            <a-select-option value="unknown">Unknown</a-select-option>
            <a-select-option value="pending">Hoãn</a-select-option>
            <a-select-option value="cancel">Huỷ</a-select-option>
            <a-select-option value="completed">Hoàn thành</a-select-option>
        </a-select>
    </a-col>
    <OrderListHeader />
</a-row>   

<OrderList />
</template>
