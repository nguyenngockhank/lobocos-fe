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
import { orderAttrLabelMap, orderAttrTypeMap } from '@/configs'

defineProps(['order'])
</script>
