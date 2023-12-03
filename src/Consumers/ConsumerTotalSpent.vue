<template>
<a-tag :color="tagMoney" >
    {{ formatMoney(consumer.total_spent) }} 
</a-tag> / 
<a-tag :color="tagOrder" >
    {{ consumer.total_completed_orders }} đơn
</a-tag>

</template>
<script lang="ts" setup>
const { consumer } = defineProps(['consumer'])
import { formatMoney } from "@/utils/formatMoney"

const tagMoney = (() => {
    const moneyMap: Record<string, number> = { 
        'purple': 25000000,
        'geekblue': 20000000,
        'blue': 15000000,
        'red': 10000000,
        'green': 5000000,
        'gold': 1000000,
    }
    const totalSpend = consumer?.total_spent || 0;
    for(const tag in moneyMap) {
        if (totalSpend > moneyMap[tag]) {
            return tag;
        }
    }
    return 'default';
})();

const tagOrder = (() => {
    const orderTotalMap: Record<string, number> = { 
        'purple': 30,
        'geekblue': 25,
        'blue': 20,
        'red': 15,
        'green': 10,
        'gold': 5,
    }
    const totalOrders = consumer?.total_completed_orders || 0;
    for(const tag in orderTotalMap) {
        if (totalOrders > orderTotalMap[tag]) {
            return tag;
        }
    }
    return 'default';
})();

</script>