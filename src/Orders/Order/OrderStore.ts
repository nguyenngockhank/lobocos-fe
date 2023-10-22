import type { OrderResponse } from "@/Calendar/calendarApi";
import { defineStore } from "pinia";
import { ref } from "vue";
import { getOrder } from "../orderApi";

export const useOrderStore = defineStore('order', () => {
    const order = ref<OrderResponse | null>(null)
    const fetchOrder = async (payload: { id: string }) => {
        const newData = await getOrder(payload.id)
        order.value = newData
        return newData;
    }   
    return { order, fetchOrder }
})