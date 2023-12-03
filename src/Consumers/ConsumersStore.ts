import { defineStore } from "pinia";
import { ref } from "vue";
import { fetchAllConsumers, type ConsumerResponse } from "./consumerApi";
import sumBy from 'lodash/sumBy'

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
            c.orders = [];
            return {
                ...c,
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