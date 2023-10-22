<script setup>
import DateFieldEditor from './DateFieldEditor.vue'
defineProps([
    'type',
    'value',
])
import { formatMoney } from "@/utils/formatMoney" 
</script>

<template>
<a-image v-if="type === 'image'" :width="150" :src="value" />
<span v-else-if="type === 'money'">
    {{ formatMoney(value)}}
</span>
<span v-else-if="type === 'date'">
    <DateFieldEditor :value="value" @input="(v) => $emit('input', v)" />
</span>
<div v-else-if="type === 'html'">
    <quill-editor 
        :rows="3"
        theme="snow" 
        :content="value" 
        @update:content="($event) => $emit('input', $event)" 
        contentType="html"
    />
</div>
<span v-else>
    {{ value }}
</span>
</template>