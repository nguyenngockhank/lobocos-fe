
<script lang="ts" setup>
import { useOrdersStore } from './OrdersStore'
import { computed } from 'vue';
import { formatMoney } from "@/utils/formatMoney"
import sumBy from 'lodash/sumBy'
import { storeToRefs } from 'pinia'

const orderStore = useOrdersStore()
const { orders } = storeToRefs(orderStore);

const sumTotal = computed(() => {
    return sumBy(orders.value, 'total');
})

const sumTotalPaid = computed(() => {
    return sumBy(orders.value, 'total_paid');
})

</script>
<style>
.month-picker__container {
    z-index: 10;
}
</style>

<template>
<a-col style="margin-bottom: 20px"  :sm="12" :md="16" :lg="18" >
    <a-tag color="default">{{ orders.length }} đơn</a-tag>
    <a-tag color="blue">{{ formatMoney(sumTotal) }}</a-tag> - 
    <a-tag color="success">{{ formatMoney(sumTotalPaid) }}</a-tag> =
    <a-tag color="red">{{ formatMoney(sumTotal - sumTotalPaid) }}</a-tag>
</a-col>
</template>
