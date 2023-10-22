import type { OrderResponse } from "@/Calendar/calendarApi";
import { apiClient } from "@/Shared/services/request";
import { getEndDateOfMonth } from "@/utils/date/getEndDateOfMonth";
import { getStartDateOfMonth } from "@/utils/date/getStartDateOfMonth";

export type OrdersByMonthPayload =  {
    year: number;
    month: number;
}

export async function getOrdersByMonth(payload: OrdersByMonthPayload) {
    const date = new Date(payload.year, payload.month, 15)
    const input =  {
        start: getStartDateOfMonth(date).toISOString(),
        end: getEndDateOfMonth(date).toISOString(),
        full_select: true,
    }
    const { data } = await apiClient.post<OrderResponse[]>('/orders/restapi/by_range', input);
    return data;
}