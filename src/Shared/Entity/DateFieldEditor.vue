<script setup lang="ts">
import { ref } from 'vue';
import dayjs, { Dayjs } from 'dayjs';
const { value } = defineProps([
    'value',
])
const dateFormat = "DD/MM/YYYY";
const inputVal = ref(dayjs(value, 'YYYY-MM-DD'))

function toDbFormat(v: Dayjs) {
    const month = v.month() + 1 + '';
    const date = v.date() + '';
    return `${v.year()}-${month.padStart(2, '0')}-${date.padStart(2, '0')}`
}
</script>

<template>
<a-date-picker 
    :format="dateFormat"
    v-model="inputVal"
    @change="(v: any) => $emit('input', toDbFormat(v))" 
/>
</template>