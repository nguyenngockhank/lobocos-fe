<template>
<EntityDetail 
    title="Thông tin đơn hàng"
    :entity="order"
    :labelMap="labelMap"
    :typeMap="typeMap"
/>
</template>
<script lang="ts" setup>
import EntityDetail from "@/Shared/EntityDetail.vue"
defineProps(['order'])

const labelMap: Record<string, string> = {
    id: 'Mã đơn',
    type: 'Loại đơn',
    measure: 'Số đo',
    consumer_id: 'Mã KH',
    fullname: 'Khách hàng',
    facebook_link: 'Facebook KH',
    created_at: 'Ngày thêm',
    address: 'Địa chỉ',
    deadline_at: 'DEADLINE',
    image: 'Hình ảnh',
    status: 'Trạng thái',
    note: 'Ghi chú',
}

const typeMap: Record<string, string> = {
    image: 'image',
    note: 'html',
    created_at: 'date',
    deadline_at: 'date',
}
</script>
