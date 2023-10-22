import { defineStore } from "pinia";
import { ref } from "vue";
import { fetchAllConsumers, type ConsumerResponse } from "./consumerApi";

export const useConsumersStore = defineStore('consumers', () => {
    const consumers = ref<ConsumerResponse[]>([])
    const fetchConsumers = async () => {
        if (consumers.value.length > 0) {
            return;
        }
        const newData = await fetchAllConsumers()
        consumers.value = newData;
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