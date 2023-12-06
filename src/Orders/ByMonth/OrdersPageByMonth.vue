
<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router'
import OrderList from "../OrderList/OrderList.vue"
import OrderListHeader from "../OrderListHeader.vue"
import dayjs, { Dayjs }  from 'dayjs';
import { useOrdersStore } from '../OrdersStore'
import { onBeforeMount, ref, watch } from 'vue';
import { dayjsToMonthDb } from '@/utils/date/dayjsToMonthDb';
import { DAYJS_MONTH_FORMAT } from '@/constants';


const router = useRouter()
const route = useRoute()

const chosenMonth = ref(dayjs())
const orderStore = useOrdersStore()


onBeforeMount(() => {
    const month = route.params.month
    if (month && typeof month === 'string' ) {
        chosenMonth.value = dayjs(month, DAYJS_MONTH_FORMAT)
    }

    orderStore.fetchOrdersByMonth({
        year: chosenMonth.value.year(),
        month: chosenMonth.value.month(),
    })
})


const handleChange = (newMonth: Dayjs) => {
    const year = newMonth.year()
    const month = newMonth.month()
    router.push({ path: `/orders-by-month/${dayjsToMonthDb(newMonth)}`})

    orderStore.fetchOrdersByMonth({
        year,
        month,
    })
};
</script>
<style>
.month-picker__container {
    z-index: 10;
}
</style>

<template>
<a-row type="flex" >
    <a-col  style="margin-bottom: 20px" :sm="12" :md="8" :lg="6" >
        Khoảng thời gian
        <a-date-picker 
            v-model:value="chosenMonth" 
            @change="handleChange"
            picker="month" 
        />
    </a-col>
    <OrderListHeader />
</a-row>   

<OrderList />
</template>
