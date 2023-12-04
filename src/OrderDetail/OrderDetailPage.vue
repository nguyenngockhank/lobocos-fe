
<script lang="ts" setup>
import EntityDetail from "@/Shared/Entity/EntityDetail.vue"
import { orderAttrLabelMap, orderAttrTypeMap } from '@/configs'
import { watch, reactive, onBeforeMount, computed } from "vue";
import { type PatchOrderInput, useOrderStore } from './OrderStore'
import { useRoute } from 'vue-router'
import { storeToRefs, } from 'pinia'
import { useConsumersStore } from "@/Consumers/ConsumersStore";
import { getStatusDeadline } from "./getStatusDeadline";
const consumerStore = useConsumersStore();

const ignoreAttrs = ['import_from', 'partner_name', 'accessory_count', 'layout_url', 'character_url', 'partner_paid']
const edittableAttrs = [ 'measure','note']

const route = useRoute();
const orderStore = useOrderStore()
let orderData = reactive<any>({ consumer: null })

const { order } = storeToRefs(orderStore);

onBeforeMount(async () => {
  const result = await orderStore.fetchOrder({ id: `${route.params.id}` })
  const consumerDto = await consumerStore.fetchConsumer(result?.consumer_id || "")
  orderData.consumer = consumerDto;
});

const transformFieldValFn = (field: string, entity: Record<string, any>) => {
  if (field === "consumer_id" && orderData.consumer) {
    return `#${orderData.consumer.id} ${orderData.consumer.fullname}`;
  }
  return entity[field]
}

watch(() => route.params.id,  async newId => {
  await orderStore.fetchOrder({ id: `${newId}` })
})

const handleEditAttr = async (payload: PatchOrderInput)  => {
  await orderStore.editOrderAttribute(payload)
}

const deadlineStatus = computed(() => {
  return order.value ? getStatusDeadline(order.value) : 'default'
})
</script>
    
<template>

<a-row >
  <a-col >
    <h3>Deadline</h3>
    <a-result 
      v-if="deadlineStatus === 'danger'" 
      status="warning" 
      title="Bạn đã trễ đơn hàng"></a-result>
    <a-result
      v-else-if="deadlineStatus === 'completed'"
      status="success"
      title="Đơn của bạn đã được hoàn thành "
    ></a-result>
    <a-tag v-else :color="deadlineStatus">
      <a-statistic-countdown  
        style="{ color: }" 
        :value="order?.deadline_at" 
        format="D Ngày H giờ m phút s giây" 
      />
    </a-tag>

  </a-col>
</a-row>


<EntityDetail 
    v-if="!!order"
    title="Thông tin đơn hàng"
    :entity="order"
    :labelMap="orderAttrLabelMap"
    :typeMap="orderAttrTypeMap"
    :ignoreAttrs="ignoreAttrs"
    :edittableAttrs="edittableAttrs"
    :transformFieldValFn="transformFieldValFn"
    :editMutation="handleEditAttr"
/>
<a-empty v-else></a-empty>
</template>
