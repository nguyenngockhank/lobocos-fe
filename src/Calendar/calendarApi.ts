import { apiClient } from "@/Shared/services/request";
import { addDays } from "@/utils/date/addDays";
import { subtractDays } from "@/utils/date/subtractDays";

export type OrderResponse = {
    id: number;
    consumer_id: string;
    facebook_link: string;
    fullname: string;
    deadline_at: string; 
    start: string;
    status: string;
    total: string | number;
    total_paid: string | number;
}

type CalendarItem = {
    id: number;
    type: 'deposited' | 'pattern' | 'deadline' | 'completed';
    title: string;
    start: Date;
    end?: Date;
    deadline_at?: string;
}

const attrsMap: Record<string, Record<string, string>> = {
    deposited: {
        // color: '#6eff01',
        tag: 'gold',
    }, 
    pattern: {
        tag: 'magenta'
        // color: '#ffff03',
    },
    deadline: {
        // color: '#060201',
        tag: 'purple',
    }, 
}

function makeOrderStates(orders: OrderResponse[]) {
    const result: CalendarItem[] = [];
    const completedList = orders.filter(o => o.status == 'completed').map((order): CalendarItem => {
        const { id, deadline_at, fullname } = order;
        return {
            ...attrsMap.deadline,
            id,
            type: 'completed',
            start: new Date(deadline_at),
            title: `#${id} ${fullname}`
        }
    })

    const deadlineList = orders.filter(o => o.status != 'completed').map((order): CalendarItem => {
        const { id, deadline_at, fullname } = order;
        return {
            ...attrsMap.deadline,
            id,
            type: 'deadline',
            deadline_at,
            // start: maxDate(new Date(deadline_at), new Date()),
            start: new Date(deadline_at),
            title: `#${id} ${fullname}`
        }
    })

    // const patternList = orders.filter(o => o.status != 'completed').map((order): CalendarItem => {
    //     const { id, deadline_at, fullname } = order;
    //     return {
    //         ...attrsMap.pattern,
    //         id,
    //         deadline_at,
    //         type: 'pattern',
    //         start: subtractDays(new Date(deadline_at), 10),
    //         title: `#${id} ${fullname}`
    //     }
    // })


    const depositedList = orders.filter(o => o.status != 'completed').filter(o => {
        const total_paid = +o.total_paid
        const total = +o.total
        return total_paid / total < 0.5
    }).map((order): CalendarItem => {
        const { id, deadline_at, fullname } = order;
        return {
            ...attrsMap.deposited,
            id,
            deadline_at,
            type: 'deposited',
            start:  subtractDays(new Date(deadline_at), 30),
            title: `#${id} ${fullname}`
        }
    })

    result.push(...deadlineList)
    // result.push(...patternList)
    result.push(...depositedList)
    result.push(...completedList)

    return result;
}

export async function getOrdersByDateRange(start: Date, end: Date) : Promise<CalendarItem[]>{
    const endR = addDays(end, 30);
    const { data } = await apiClient.post<OrderResponse[]>('/orders/restapi/by_range', {
        start: start.toISOString(),
        end: endR.toISOString(),
    });

    return makeOrderStates(data);
}