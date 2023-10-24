<template>
<EntityDetail 
    title="Thông tin đơn hàng"
    :entity="order"
    :labelMap="orderAttrLabelMap"
    :typeMap="orderAttrTypeMap"
/>
</template>
<script lang="ts" setup>
import EntityDetail from "@/Shared/Entity/EntityDetail.vue"
import { orderAttrLabelMap } from './constants/orderAttrLabelMap'
import { orderAttrTypeMap } from './constants/orderAttrTypeMap'

defineProps(['order'])
</script>
