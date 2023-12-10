
<script lang="ts" setup>
import SelectConsumer from '@/Consumers/components/SelectConsumer.vue';
import { useRouter, useRoute } from 'vue-router'
import OrderListHeader from '../OrderListHeader.vue'
import OrderList from '../OrderList/OrderList.vue'
import { useOrdersStore } from '../OrdersStore'
import { onBeforeMount, ref,  } from 'vue'
import { useConsumersStore } from '@/Consumers/ConsumersStore';

const router = useRouter()
const route = useRoute()

const consumersStore = useConsumersStore()
const consumerSelected = ref('unknown');
const orderStore = useOrdersStore()


onBeforeMount(async () => {
    await consumersStore.fetchConsumers()
})

onBeforeMount(async () => {
    const consumerId = route.params.consumerId
    if (!consumerId) {
        return
    }
    if (typeof consumerId !== 'string') {
        return
    }


    consumerSelected.value = consumerId
    await orderStore.fetchOrdersByConsumerId({
        consumerId 
    })
})

const handleChange = (value: string) => {
    consumerSelected.value = value
    router.push({ path: `/orders-by-consumer/${value}` })
    orderStore.fetchOrdersByConsumerId({
        consumerId: value
    })
}
</script>

<template>
<a-row type="flex" >
    <a-col style="margin-bottom: 20px" :sm="12" :md="8" :lg="6" >
        Khách hàng
        <SelectConsumer width="100%" @change="handleChange" :value="consumerSelected" />
    </a-col>
    <OrderListHeader />
</a-row>   

<OrderList />
</template>

<style>
.month-picker__container {
    z-index: 10;
}
</style>