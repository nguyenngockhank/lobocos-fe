<script lang="ts" setup>
import SelectConsumer from '@/Consumers/components/SelectConsumer.vue';
import { ref } from 'vue';

const mode = ref<'add' | 'select'>('select')

const consumerSelected = ref('unknown');
function handleSelect (value: string) {
    consumerSelected.value = value
    console.log("selected cnsumer", value)
}
</script>

<template>
<div v-if="mode === 'add'">
    <a-form-item >
        <div>
            Thêm khách hàng hoặc
            <a-button type="link" @click="mode ='select'">
                Chọn cũ
            </a-button>
        </div>
        <a-input placeholder="Thêm khách hàng" />
    </a-form-item>
</div>
<div v-if="mode === 'select'">
    <a-form-item>
        <div>
            Chọn khách hàng hoặc
            <a-button type="link" danger @click="mode ='add'">
                Thêm mới
            </a-button>
        </div>
        <SelectConsumer width="100%" :value="consumerSelected" @change="handleSelect" />
    </a-form-item>
</div>
</template>