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
    
    return { consumers, fetchConsumers }
})