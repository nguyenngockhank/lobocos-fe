<script setup>
defineProps([
    'type',
    'value',
])

import { formatMoney } from "@/utils/formatMoney" 
import { formatDate } from "@/utils/formatDate" 
</script>

<template>
<a-image v-if="type === 'image'" :width="150" :src="value" />
<span v-else-if="type === 'money'">
    {{ formatMoney(value)}}
</span>
<span v-else-if="type === 'date'">
    {{ formatDate(value) }}
</span>
<span v-else-if="type === 'html'">
    <p v-html="value"></p>
</span>
<span v-else>
    {{ value }}
</span>
</template>