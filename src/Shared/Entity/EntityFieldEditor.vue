<script setup>
import DateFieldEditor from './DateFieldEditor.vue'
import {ref} from 'vue'
const { value } = defineProps([
    'type',
    'value',
])
import { formatMoney } from "@/utils/formatMoney" 
import { SaveTwoTone } from '@ant-design/icons-vue';

const emit = defineEmits(['input'])

let currentVal = ref(value);
function handleStoreVal(v) {
    currentVal.value = v;
    emit('input', v)
}
</script>

<template>
<a-image v-if="type === 'image'" :width="150" :src="value" />
<span v-else-if="type === 'money'">
    {{ formatMoney(value)}}
</span>
<span v-else-if="type === 'date'">
    <DateFieldEditor :value="value" @input="(v) => handleStoreVal(v)" />
</span>
<div v-else-if="type === 'html'">
    <quill-editor 
        :rows="3"
        theme="snow" 
        :content="value" 
        @update:content="($event) => handleStoreVal($event)" 
        contentType="html"
    />
</div>
<span v-else>
    {{ value }}
</span>
<SaveTwoTone v-if="type !== 'html'" @click="() => $emit('save', currentVal)"  two-tone-color="#eb2f96" />
</template>