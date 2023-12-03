import { apiClient2 } from "@/Shared/services/request";


export type DashboardResponse = {
    count_consumer: number;
    count_order_incompleted: number;
    count_order_completed: number;
}

export async function getSummaryStats() : Promise<DashboardResponse>{
    const { data } = await apiClient2.get<DashboardResponse>('/dashboard');
    return data;
}