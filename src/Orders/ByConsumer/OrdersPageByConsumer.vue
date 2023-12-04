
<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router'
import OrderListHeader from '../OrderListHeader.vue'
import OrderList from '../OrderList.vue'
import { useOrdersStore } from '../OrdersStore'
import { onBeforeMount, ref, computed } from 'vue'
import { useConsumersStore } from '@/Consumers/ConsumersStore';
import { storeToRefs } from 'pinia'

const router = useRouter()
const route = useRoute()

const consumersStore = useConsumersStore()

const { consumers } = storeToRefs(consumersStore);

const consumerOptions = computed(() => {
    return consumers.value.map((c: any) => {
        return {
            label: `#${c.id} ${c.fullname}`,
            value: `${c.id}`,
        }
    })
})

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

    await orderStore.fetchOrdersByConsumerId({
        consumerId 
    })
    consumerSelected.value = consumerId
})

const handleChange = (value: string) => {
    router.push({ path: `/orders-by-consumer/${value}` })
    orderStore.fetchOrdersByConsumerId({
        consumerId: value
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
    <a-col style="margin-bottom: 20px" :sm="12" :md="8" :lg="6" >
        Khách hàng
        <a-select
            ref="select"
            v-model:value="consumerSelected"
            style="width: 250px"
            @change="handleChange"
            :options="consumerOptions"
        />
    </a-col>
    <OrderListHeader />
</a-row>   

<OrderList />
</template>
