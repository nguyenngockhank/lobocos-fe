
<script lang="ts" setup>
import EntityDetail from "@/Shared/EntityDetail.vue"
import { orderAttrLabelMap } from '../constants/orderAttrLabelMap'
import { orderAttrTypeMap } from '../constants/orderAttrTypeMap'
import { watch, reactive, onBeforeMount} from "vue";
import { useOrderStore } from './OrderStore'
import { useRoute } from 'vue-router'
import { storeToRefs, } from 'pinia'
import { useConsumersStore } from "@/Consumers/ConsumersStore";
const consumerStore = useConsumersStore();

const ignoreAttrs = ['import_from', 'partner_name', 'accessory_count', 'layout_url', 'character_url', 'partner_paid']
const edittableAttrs = ['consumer_id', 'status', 'measure', 'note', 'deadline_at']

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
  // console.log("field", field)
  if (field === "consumer_id" && orderData.consumer) {
    return `#${orderData.consumer.id} ${orderData.consumer.fullname}`;
  }
  return entity[field]
}

watch(() => route.params.id,  async newId => {
  await orderStore.fetchOrder({ id: `${newId}` })
})
</script>
    

<template>
<EntityDetail 
    v-if="!!order"
    title="Thông tin đơn hàng"
    :entity="order"
    :labelMap="orderAttrLabelMap"
    :typeMap="orderAttrTypeMap"
    :ignoreAttrs="ignoreAttrs"
    :edittableAttrs="edittableAttrs"
    :transformFieldValFn="transformFieldValFn"
/>
<a-empty v-else></a-empty>
</template>
