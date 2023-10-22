<template>
<a-descriptions
    :title="title"
    :column="{ xs: 1, sm: 2,  lg: 3, xl: 3 }"
    bordered
>   
    <a-descriptions-item v-for="(value, key) in filteredEntity" 
        :key="key" 
        :label="labelMap[key] || key"
    >   
        <a-image v-if="typeMap[key] === 'image'" :width="150" :src="value" />
        <span v-else-if="typeMap[key] === 'money'">
            {{ formatMoney(value) }}
        </span>
        <span v-else-if="typeMap[key] === 'date'">
            {{ formatDate(value) }}
        </span>
        <span v-else-if="typeMap[key] === 'html'">
            <p v-html="value"></p>
        </span>
        <span v-else>
            {{ value }}
        </span>
    </a-descriptions-item>
</a-descriptions>
</template>

<script setup>
import omit from 'lodash/omit'
const { entity, ignoreAttrs } = defineProps({
    title: String,
    entity: Object,
    labelMap: Object,
    typeMap: Object,
    ignoreAttrs: Array,
})

import { formatMoney } from "@/utils/formatMoney" 
import { formatDate } from "@/utils/formatDate" 

const filteredEntity = omit(entity, ignoreAttrs || ['created_by', 'updated_by', 'updated_at']);
</script>