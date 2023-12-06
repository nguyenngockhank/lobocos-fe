<script lang="ts" setup>
import { LinkOutlined } from '@ant-design/icons-vue';
const emit = defineEmits(['update:modelValue'])

const { modelValue, imgWidth } = defineProps([
    'modelValue',
    'imgWidth'
])

const handleChange = (event: any) => {
  emit('update:modelValue', event.target.value)
}
</script>
<template>
<div>
  <a-input
    :value="modelValue"
    @input="handleChange"
    placeholder="Image url"
  >
    <template #prefix>
      <LinkOutlined />
    </template>
  </a-input>
  <br />
  <a-image :width="imgWidth || 200" :src="modelValue"  />
</div>
</template>