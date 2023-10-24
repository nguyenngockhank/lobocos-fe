<template>
<div>
    <a-row style="margin-bottom: 20px;">
        <a-col :xl="6" :lg="6" :md="8" :span="12">
            <a-statistic title="Số lượng khách hàng" :value="data?.stats?.consumer_count"  />
        </a-col>
        <a-col :xl="6" :lg="6" :md="8" :span="12">
            <a-statistic title="Tổng số đơn" :value="data?.stats?.order_count" />
        </a-col>
    </a-row>
    <div>
        <img style="max-width: 100%;" alt="TO BE CONTINUE" src="https://www.dafont.com/forum/attach/orig/9/6/960974.png?1" />
    </div>
</div>
</template>

<script lang="ts" setup>
import { onBeforeMount, reactive } from 'vue';
import { type DashboardResponse, getSummaryStats } from './dashboardApi';

const data = reactive<{ stats: DashboardResponse | null }>({ stats: null })

onBeforeMount(async () => {
    data.stats = await getSummaryStats()
})
</script>