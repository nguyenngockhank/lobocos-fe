
<script lang="ts" setup>
import { onBeforeMount, computed } from 'vue'
import { useConsumersStore } from '../ConsumersStore';
import { storeToRefs } from 'pinia'

defineEmits(['change'])
defineProps({
    value: {
        type: String,
        default: 'unknown'
    },
    width: {
        type: String,
        default: '250px'
    }
})


const consumersStore = useConsumersStore()
const { consumers } = storeToRefs(consumersStore);
const consumerOptions = computed(() => {
    return consumers.value.map((c: any) => {
        return {
            label: `#${c.id} ${c.fullname}`,
            value: `${c.id}`,
        }
    })
})

onBeforeMount(async () => {
    await consumersStore.fetchConsumers()
})

const filterOption = (input: string, option: any) => {
    input = input.toLowerCase()
    return option.label.toLowerCase().indexOf(input) >= 0;
};

</script>

<template>
<a-select
    ref="select"
    show-search
    :value="value"
    :filter-option="filterOption"
    :style="`width: ${width}`"
    @change="(value: string) => $emit('change', value)"
    :options="consumerOptions"
/>
</template>
