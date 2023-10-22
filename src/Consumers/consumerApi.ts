import { apiClient } from "@/Shared/services/request";

export type ConsumerResponse = {
    id: number;
    facebook_link: string;
    fullname: string;
    total_orders: number;
    total_spent: number;
    address: string | null;
}

export async function fetchAllConsumers() : Promise<ConsumerResponse[]>{
    const { data } = await apiClient.get<ConsumerResponse[]>('/consumers/restapi/all');
    return data; 
}