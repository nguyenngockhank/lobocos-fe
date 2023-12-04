import type { OrderResponse } from "@/Calendar/calendarApi";

export function getStatusDeadline(order: Pick<OrderResponse, 'deadline_at' | 'status'>) {
    if (order.status === 'completed') {
        return 'completed';
    }

    const now = new Date()
    const deadlineDate = new Date(order.deadline_at);
    if (deadlineDate.getTime() > now.getTime()) {
      return 'warning';
    }
    return 'danger'; // danger, late
}