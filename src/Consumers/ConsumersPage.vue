<template>
<a-table :columns="columns" :row-key="(record: any) => record.id" :data-source="consumers" 
    :pagination="{ defaultPageSize: 50, position: ['topRight', 'bottomRight']}"
>
    <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'id'">
            <ConsumerId :value="record.id" />
        </template>
        <template v-if="column.key === 'name'">
            <ConsumerName :consumer="record" />
        </template>
        <template v-if="column.key === 'total_spent'">
            <ConsumerTotalSpent :consumer="record" />
        </template>
        <template v-if="column.key === 'action'">
            <!-- <a-popconfirm
                title="Sure to delete?"
                @confirm="() => {  return true; }"
                >
                <a>Delete</a>
            </a-popconfirm> -->
        </template>
    </template>
    <template #expandedRowRender="{ record }">
        <ConsumerDetail :consumer="record"/>
    </template>
</a-table>
</template>

<script lang="ts" setup>
import { onBeforeMount } from 'vue'
import { storeToRefs } from 'pinia'
import { useConsumersStore } from './ConsumersStore'
import ConsumerName from './ConsumerName.vue'
import ConsumerId from './ConsumerId.vue'
import ConsumerTotalSpent from './ConsumerTotalSpent.vue'
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