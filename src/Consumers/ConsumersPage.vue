
<script lang="ts" setup>
import { formatMoney } from "@/utils/formatMoney"
import { onBeforeMount } from 'vue'
import { storeToRefs } from 'pinia'
import { useConsumersStore } from './ConsumersStore'
import ConsumerName from './ConsumerName.vue'
import ConsumerRank from './ConsumerRank.vue'
import ConsumerId from './ConsumerId.vue'
// import ConsumerTotalSpent from './ConsumerTotalSpent.vue'
import ConsumerDetail from './ConsumerDetail.vue'
import { columnsConfig as columns } from './consumerColumnsConfig'

const consumersStore = useConsumersStore()
onBeforeMount(() => {
    consumersStore.fetchConsumers();
})

const { consumers } = storeToRefs(consumersStore);
</script>
<style>
.ant-descriptions-view {
    border-radius: 0!important;
}
</style>

<template>
<a-table :columns="columns" :row-key="(record: any) => record.id" :data-source="consumers" 
    :pagination="{ defaultPageSize: 200, position: ['topRight', 'bottomRight']}"
>
    <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'id'">
            <ConsumerId :value="record.id" />
        </template>
        <template v-if="column.key === 'name'">
            <ConsumerName :consumer="record" />
        </template>
        <template v-if="column.key === 'rank'">
            <ConsumerRank :consumer="record" />
        </template>
        <template v-if="column.key === 'amount_spent'">
            {{ formatMoney(record.amount_spent) }} 
        </template>
        <template v-if="column.key === 'amount_incompleted'">
            {{ formatMoney(record.amount_incompleted) }} 
        </template>
        <template v-if="column.key === 'action'">
            <router-link :to="'/orders-by-consumer/' + record.id">
                <a-button>Xem đơn</a-button>
            </router-link>
        </template>
    </template>
    <template #expandedRowRender="{ record }">
        <ConsumerDetail :consumer="record"/>
    </template>
</a-table>
</template>
