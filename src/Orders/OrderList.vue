<script lang="ts" setup>
import { orderColumnsConfig as columns } from './config/orderColumnsConfig'
import { formatMoney } from "@/utils/formatMoney"
import ConsumerId from "@/Consumers/ConsumerId.vue"
import ConsumerName from "@/Consumers/ConsumerName.vue"
import OrderId from './OrderId.vue'
import OrderDetail from './OrderDetail.vue'
import Deadline from './OrderDeadline.vue'
import { storeToRefs } from 'pinia'
import { useOrdersStore } from './OrdersStore'
import { reactive, ref } from 'vue'
import { DAYJS_FORMAT } from '@/constants'
import dayjs from 'dayjs';

import { ORDER_STATUS_OPTIONS, DEFAULT_INPUT_WIDTH } from '@/constants';

const orderStore = useOrdersStore()
const { orders } = storeToRefs(orderStore);

// EDIT LOGIC
const formEditState: Record<string, any> = reactive({});
const openEditModal = ref<boolean>(false);
const showEditModal = (record: any) => {
    const [deadlineDate] = record.deadline_at?.split('T') || ["2023-01-01"]
    Object.assign(formEditState, record, {
        deadlinedayjs: dayjs(deadlineDate, DAYJS_FORMAT),
    })
  
    openEditModal.value = true
    console.log({ record })
}

const handleUpdate = async (e: MouseEvent) => {
  const rawValues = JSON.parse(JSON.stringify(formEditState))
  const deadlineDate = formEditState.deadlinedayjs.format(DAYJS_FORMAT)
  await orderStore.patch(rawValues.id, {
    total_paid: rawValues.total_paid,
    deadline_at: deadlineDate,
    status: rawValues.status,
  })
  openEditModal.value = false;
  location.reload()
};
</script>

<template>
<a-table :columns="columns" :row-key="(record: any) => record.id" :data-source="orders" 
    :pagination="false"
    :rowClassName="(record: any) => `order-${record.status}`"
>
    <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'id'">
            <OrderId :value="record.id" />
            #{{ record.status }}
        </template>
        <template v-if="column.key === 'deadline_at'">
            <Deadline :value="record.deadline_at" />
        </template>
        <template v-if="column.key === 'fullname'">
            <ConsumerId :value="record.consumer_id" />
            <ConsumerName :consumer="record" />
        </template>
        <template v-if="column.key === 'image'">
            <a-image :width="150" :src="record.image" />
        </template>
        <template v-if="column.key === 'note'">
            <p v-html="record.note"></p>
        </template>
        <template v-if="column.key === 'total'">
            <a-tag color="blue">{{ formatMoney(record.total) }}</a-tag>
            <a-tag color="red" v-if="record.total <= record.total_paid">
                Đã nhận 100%
            </a-tag>
            <a-tag color="purple" v-else-if="record.total <= (record.total_paid * 2)">
                Đã nhận > 50%
            </a-tag>
        </template>
        <template v-if="column.key === 'total_paid'">
            <a-tag color="blue">{{ formatMoney(record.total_paid) }}</a-tag>
        </template>
        <template v-if="column.key === 'action'">
            <a-button @click="() => showEditModal(record)">Sửa</a-button>
        </template>
    </template>
    <template #expandedRowRender="{ record }">
        <OrderDetail :order="record" />
    </template>
</a-table>

<a-modal v-model:open="openEditModal" :title="`Đơn hàng #${formEditState.id}`" @ok="handleUpdate">
    <a-form layout='vertical' :model="formEditState">
        <a-form-item label="Khách hàng">
            <a-input :value="formEditState.fullname" disabled />
        </a-form-item>
        <a-form-item label="Tình trạng">
            <a-select
                ref="select"
                v-model:value="formEditState.status"
                :style="`width: ${DEFAULT_INPUT_WIDTH}`"
                :options="ORDER_STATUS_OPTIONS"
            />
        </a-form-item>
        <a-form-item label="Hạn">
            <a-date-picker :style="`width: ${DEFAULT_INPUT_WIDTH}`" v-model:value="formEditState.deadlinedayjs" />
        </a-form-item>
        <a-form-item label="Tổng đơn">
            <a-input-number  :style="`width: ${DEFAULT_INPUT_WIDTH}`" disabled v-model:value="formEditState.total" />
        </a-form-item>
        <a-form-item label="Đã nhận">
            <a-input-number  :style="`width: ${DEFAULT_INPUT_WIDTH}`" :step="100000" v-model:value="formEditState.total_paid" />
        </a-form-item>
    </a-form>
</a-modal>
</template>
