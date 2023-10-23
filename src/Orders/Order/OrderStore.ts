import type { OrderResponse } from "@/Calendar/calendarApi";
import { defineStore } from "pinia";
import { ref } from "vue";
import { getOrder, patchOrder, type PatchOrderInput } from "../orderApi";
import set from "lodash/set";
import get from "lodash/get";

export const useOrderStore = defineStore('order', () => {
    const order = ref<OrderResponse | null>(null)
    const fetchOrder = async (payload: { id: string }) => {
        const newData = await getOrder(payload.id)
        order.value = newData
        return newData;
    }   

    const editOrderAttribute = async (payload: PatchOrderInput)  => {
        if (!order.value) {
            return false;
        }

        if (order.value === get(order.value, payload.field)) {
            console.warn(">>> warning update same value")
            return false;
        }

        await patchOrder(order.value.id, payload)
        set(order.value, payload.field, payload.value);
    }
    return { order, fetchOrder, editOrderAttribute }
})