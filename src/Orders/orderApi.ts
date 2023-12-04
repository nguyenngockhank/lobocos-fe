import type { OrderResponse } from "@/Calendar/calendarApi";
import { apiClient } from "@/Shared/services/request";
import { getEndDateOfMonth } from "@/utils/date/getEndDateOfMonth";
import { getStartDateOfMonth } from "@/utils/date/getStartDateOfMonth";

export type OrdersByMonthPayload =  {
    year: number;
    month: number;
}

export type OrdersByRange =  {
    startDate: string;
    endDate: string;
}

export async function getOrdersByStatus({ status }: { status: string }) {
    const { data } = await apiClient.post<OrderResponse[]>('/orders/restapi/by_status/' + status);
    return data.map(o => {
        return {
            ...o,
            total: Number(o.total),
            total_paid: Number(o.total_paid),
        }
    });
}

export async function getOrdersByRange(payload: OrdersByRange) {
    const input =  {
        start: payload.startDate + ' 00:00:00',
        end: payload.endDate + ' 23:59:59',
        full_select: true,
    }
    
    const { data } = await apiClient.post<OrderResponse[]>('/orders/restapi/by_range', input);
    return data.map(o => {
        return {
            ...o,
            total: Number(o.total),
            total_paid: Number(o.total_paid),
        }
    });
}

export async function getOrdersByMonth(payload: OrdersByMonthPayload) {
    const date = new Date(payload.year, payload.month, 15)
    const input =  {
        start: getStartDateOfMonth(date).toISOString(),
        end: getEndDateOfMonth(date).toISOString(),
        full_select: true,
    }
    
    const { data } = await apiClient.post<OrderResponse[]>('/orders/restapi/by_range', input);
    return data.map(o => {
        return {
            ...o,
            total: Number(o.total),
            total_paid: Number(o.total_paid),
        }
    });
}

export async function getOrder(orderId: string | number ) {
    const { data } = await apiClient.get<OrderResponse>(`/orders/restapi/order/${orderId}`);
    return data;
}



export async function patchOrder(orderId: string | number, payload: Record<string, any>) {
    console.log('patch order', { orderId, payload })
    const { data } = await apiClient.patch<OrderResponse>(`/orders/restapi/patch/${orderId}`, { fields: payload });
    return data;
}


// export async function patchOrderField(orderId: string | number, payload: PatchOrderInput) {
//     console.log('patch order field', { orderId, payload })
//     const { data } = await apiClient.patch<OrderResponse>(`/orders/restapi/patch/${orderId}`, payload);
//     return data;
// }