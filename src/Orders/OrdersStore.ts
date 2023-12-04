import { defineStore } from "pinia";
import { ref } from "vue";
import type { OrderResponse } from "@/Calendar/calendarApi";
import { 
    getOrdersByMonth,
    getOrdersByRange, 
    getOrdersByStatus, 
    getOrdersByConsumerId,
    patchOrder, 
    type OrdersByMonthPayload, 
    type OrdersByRange 
} from "./orderApi";
import sortBy from "lodash/sortBy";

function monthSlug({year, month}: OrdersByMonthPayload) {
    return `${year}-${month}`
}

export const useOrdersStore = defineStore('orders', () => {
    const cache: Record<string, OrderResponse[]> = {};
    const orders = ref<OrderResponse[]>([])

    const fetchOrdersByMonth = async (payload: OrdersByMonthPayload) => {
        const key = monthSlug(payload);
        if (cache[key]) {
            orders.value = cache[key]; 
            return;
        }

        const newData = await getOrdersByMonth(payload)
        cache[key] = sortBy(newData, 'deadline_at', 'desc'); 
        orders.value = cache[key] ;
    }

    const fetchOrdersByRange = async (payload: OrdersByRange) => {
        const newData = await getOrdersByRange(payload)
        orders.value = sortBy(newData, 'deadline_at', 'desc'); 
    }

    const fetchOrdersByStatus = async (payload: { status: string }) => {
        const newData = await getOrdersByStatus(payload)
        orders.value = sortBy(newData, 'deadline_at', 'desc'); 
    }

    const fetchOrdersByConsumerId = async (payload: { consumerId: string }) => {
        const newData = await getOrdersByConsumerId(payload)
        orders.value = sortBy(newData, 'deadline_at', 'desc'); 
    }


    const patch = async (orderId: string | number, payload: Record<string, any>) => {
        await patchOrder(orderId, payload)
    }

    return { orders, patch, fetchOrdersByMonth, fetchOrdersByRange, fetchOrdersByStatus, fetchOrdersByConsumerId }
})