<template>
<div>
    <a-row style="margin-bottom: 20px;" :gutter="16">
        <a-col :xl="6" :lg="6" :md="8" :span="12">
            <a-card>
                <a-statistic title="Số lượng khách hàng" :value="data?.stats?.count_consumer"  />
            </a-card>
        </a-col>
        <a-col :xl="6" :lg="6" :md="8" :span="12">
            <a-card>
                <a-statistic title="Số đơn hoàn thành" :value-style="{ color: '#3f8600' }" :value="data?.stats?.count_order_completed" />
            </a-card>
        </a-col>
        <a-col :xl="6" :lg="6" :md="8" :span="12">
            <a-card>
                <a-statistic title="Số đơn chưa hoàn thành"   :value-style="{ color: '#ffe58f' }" :value="data?.stats?.count_order_incompleted" />
            </a-card>
        </a-col>
    </a-row>
    <!-- <div>
        <img style="max-width: 100%;" alt="TO BE CONTINUE" src="https://www.dafont.com/forum/attach/orig/9/6/960974.png?1" />
    </div> -->
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