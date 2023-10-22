<template>
<EntityDetail 
    title="Thông tin khách hàng"
    :entity="consumer"
    :labelMap="labelMap"
    :typeMap="typeMap"
/>
</template>
<script lang="ts" setup>
import EntityDetail from "@/Shared/EntityDetail.vue"
defineProps(['consumer'])


const labelMap: Record<string, string> = {
    id: 'Mã KH',
    measure: 'Số đo',
    consumer_id: 'Mã KH',
    fullname: 'Khách hàng',
    facebook_link: 'Facebook KH',
    created_at: 'Ngày thêm',
    address: 'Địa chỉ',
    status: 'Trạng thái',
    total_orders: 'Tổng đơn',
    note: 'Ghi chú',
    total_spent: 'Tổng chi',
    phone: 'Điện thoại',
}

const typeMap: Record<string, string> = {
    image: 'image',
    measure: 'html',
    note: 'html',
    created_at: 'date',
    total_spent: 'money',
}
</script>
