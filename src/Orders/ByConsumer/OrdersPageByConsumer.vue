
<script lang="ts" setup>
import OrderListHeader from '../OrderListHeader.vue'
import OrderList from '../OrderList.vue'
import { useOrdersStore } from '../OrdersStore'
import { onBeforeMount, ref, computed } from 'vue'
import { useConsumersStore } from '@/Consumers/ConsumersStore';
import { storeToRefs } from 'pinia'

const consumersStore = useConsumersStore()

onBeforeMount(async () => {
    await consumersStore.fetchConsumers()
});
const { consumers } = storeToRefs(consumersStore);

const consumerOptions = computed(() => {
    return consumers.value.map((c: any) => {
        return {
            label: `#${c.id} ${c.fullname}`,
            value: c.id,
        }
    })
})

const statusInput = ref('unknown');
const orderStore = useOrdersStore()


onBeforeMount(() => {
    // orderStore.fetchOrdersByStatus({
    //     status: statusInput.value
    // })
})

const handleChange = (value: string) => {
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
            v-model:value="statusInput"
            style="width: 250px"
            @change="handleChange"
            :options="consumerOptions"
        />
    </a-col>
    <OrderListHeader />
</a-row>   

<OrderList />
</template>
