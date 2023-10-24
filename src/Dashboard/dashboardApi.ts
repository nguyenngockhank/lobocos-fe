import { apiClient } from "@/Shared/services/request";


export type DashboardResponse = {
    consumer_count: number;
    order_count: number;
}

export async function getSummaryStats() : Promise<DashboardResponse>{
    const { data } = await apiClient.get<DashboardResponse>('/restapi/dashboard');
    return data;
}