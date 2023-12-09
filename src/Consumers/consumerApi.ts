import { apiClient2 } from "@/Shared/services/request";

export type ConsumerResponse = {
    id: number;
    facebook_link: string;
    fullname: string;
    total_spent: number;
    address: string | null;
    orders: Array<any>;
    rank?: string 
}

export async function fetchAllConsumers() : Promise<ConsumerResponse[]>{
    const { data } = await apiClient2.get<ConsumerResponse[]>('/consumers/all');
    return data; 
}