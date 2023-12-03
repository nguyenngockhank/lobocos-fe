<template>
<EntityDetail 
    title="Thông tin khách hàng"
    :entity="consumer"
    :labelMap="labelMap"
    :typeMap="typeMap"
/>
</template>
<script lang="ts" setup>
import EntityDetail from "@/Shared/Entity/EntityDetail.vue"
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
    amount_spent: 'Tổng chi',
    amount_incompleted: 'Cọc',
    count_completed_orders: 'Đơn hoàng thành',
    count_incompleted_orders: 'Đơn chưa hoàn thành',
    note: 'Ghi chú',
    phone: 'Điện thoại',
}

const typeMap: Record<string, string> = {
    image: 'image',
    measure: 'html',
    note: 'html',
    created_at: 'date',
    amount_spent: 'money',
    amount_incompleted: 'money',
}
</script>
