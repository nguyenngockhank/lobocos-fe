<script lang="ts" setup>
import SectionConsumer from './sections/SectionConsumer.vue'
import { FormAddState } from './type'
import { ref, reactive, type UnwrapRef } from 'vue';
const activeKey = ref(['1', '2', '3']);

const formState: UnwrapRef<FormAddState> = reactive({
  fieldA: '',
  fieldB: '',
});
</script>

<template>
<a-form layout="vertical" :model="formState">
  <a-collapse v-model:activeKey="activeKey" ghost>
    <a-collapse-panel key="1" header="Khách hàng">
        <SectionConsumer />
    </a-collapse-panel> 
    <!-- END SECTION CONSUMERS -->

    <a-collapse-panel key="2" header="Thông tin may">
        <a-form-item label="Field B">
        <a-input v-model:value="formState.fieldB" placeholder="input placeholder" />
        </a-form-item>
    </a-collapse-panel>
    <!-- END SECTION CONSUMERS -->

    <a-collapse-panel key="3" header="Thanh toán">
      <p>{{ 'text' }}</p>
    </a-collapse-panel>
     <!-- END SECTION PAYMENTS -->
  </a-collapse>

    <a-form-item >
      <a-button type="primary">Thêm</a-button>
    </a-form-item>
</a-form>
</template>