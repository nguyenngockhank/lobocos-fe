import { defineStore } from "pinia";
import { ref } from "vue";
import type { OrderResponse } from "@/Calendar/calendarApi";
import { getOrdersByMonth, type OrdersByMonthPayload } from "./orderApi";

function monthSlug({year, month}: OrdersByMonthPayload) {
    return `${year}-${month}`
}

export const useOrdersStore = defineStore('orders', () => {
    const cache: Record<string, OrderResponse[]> = {};
    const orders = ref<OrderResponse[]>([])

    const fetchOrders = async (payload: OrdersByMonthPayload) => {
        const key = monthSlug(payload);
        if (cache[key]) {
            orders.value = cache[key]; 
            return;
        }

        const newData = await getOrdersByMonth(payload)
        cache[key] = newData; 
        orders.value = newData;
    }
    
    return { orders, fetchOrders }
})