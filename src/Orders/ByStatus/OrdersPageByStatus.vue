
<script lang="ts" setup>
import OrderListHeader from '../OrderListHeader.vue'
import OrderList from '../OrderList.vue'
import { useOrdersStore } from '../OrdersStore'
import {  watch, onBeforeMount, ref,  } from 'vue';
import { ORDER_STATUS_OPTIONS, DEFAULT_INPUT_WIDTH } from '@/constants';

const statusInput = ref('unknown');
const orderStore = useOrdersStore()

onBeforeMount(() => {
    orderStore.fetchOrdersByStatus({
        status: statusInput.value
    })
})

const handleChange = (value: string) => {
    orderStore.fetchOrdersByStatus({
        status: value
    })
};
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
            :options="ORDER_STATUS_OPTIONS"
            v-model:value="statusInput"
            @change="handleChange"
            :style="`width: ${DEFAULT_INPUT_WIDTH}`"
        />
    </a-col>
    <OrderListHeader />
</a-row>   

<OrderList />
</template>
