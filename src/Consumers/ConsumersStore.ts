import { defineStore } from "pinia";
import { ref } from "vue";
import { fetchAllConsumers, type ConsumerResponse } from "./consumerApi";
import sumBy from 'lodash/sumBy'
import dayjs from "dayjs";
import { inRange } from "lodash";

export const useConsumersStore = defineStore('consumers', () => {
    const consumers = ref<ConsumerResponse[]>([])
    const fetchConsumers = async () => {
        if (consumers.value.length > 0) {
            return;
        }
        const newData = await fetchAllConsumers()
        consumers.value = newData.map(c => {
            const completedOrders = c.orders.filter(o => o.status === 'completed')
            const incompletedOrders = c.orders.filter(o => o.status !== 'completed')
            const rank = (() => {
                const [startDate, endDate] = getClassifyDateRange()
                const validOrders = c.orders.filter(o => o.status === 'completed' 
                    && o.deadline_at 
                    && inRange(new Date(o.deadline_at).getTime(), startDate.getTime(), endDate.getTime()))
                const totalSum = sumBy(validOrders, 'total')
                // phân Rank: S(>=15tr or >3 đơn), A(>5 tr or >1 đơn).
                // Reset rank vào 1/12 hàng năm.
                const isS = totalSum >= 15000000 || validOrders.length > 3
                if (isS) return 'S'
                const isA = totalSum >= 5000000 || validOrders.length > 1
                return isA ? 'A' : ''
            })()
            c.orders = [];
            return {
                ...c,
                rank,
                amount_spent: sumBy(completedOrders, 'total'),
                count_completed_orders: completedOrders.length,
                amount_incompleted: sumBy(incompletedOrders, 'total'),
                count_incompleted_orders: incompletedOrders.length,
                // total_oth
            }
        });
    }

    const fetchConsumer = async (id: number | string) => {
        if (!id) {
            return null;
        }
        if (consumers.value.length === 0) {
            await fetchConsumers()
        }
        return consumers.value.find(c => c.id.toString() === id.toString())
    }

    return { consumers, fetchConsumers, fetchConsumer }
})

function getClassifyDateRange() {
    const currentYear = dayjs().year()

    const currentDate = new Date()
    const thisYearCheckpoint = new Date(`${currentYear}-12-01`)
    const endYear = currentDate > thisYearCheckpoint ? currentYear : currentYear - 1

    if (endYear === 2023) {
        return [new Date("2022-10-01"), new Date("2023-11-31")]
    }
    return [new Date(`${(endYear-1)}-10-01`), new Date(`${endYear}-10-01`)]
}