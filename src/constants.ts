export const DAYJS_FORMAT = 'YYYY-MM-DD';
export const DAYJS_MONTH_FORMAT = 'YYYY-MM';

export enum OrderStatus {
    'unknown' = 'unknown',
    'pending' = 'pending',
    'cancel' = 'cancel',
    'completed' = 'completed',
}

export const ORDER_STATUS_LABEL_MAPPING: Record<OrderStatus, string> = {
    [OrderStatus['unknown']]: "Unknown",
    [OrderStatus['pending']]: "Hoãn",
    [OrderStatus['cancel']]: "Huỷ",
    [OrderStatus['completed']]: "Hoàn thành"
}

export const ORDER_STATUS_OPTIONS = (() => {
    const keys  = Object.keys(ORDER_STATUS_LABEL_MAPPING)
    return keys.map((key: any) => ({
        value: key,
        label: ORDER_STATUS_LABEL_MAPPING[key as OrderStatus],
    }))
})()

export const ORDER_STATUS = [];

export const DEFAULT_INPUT_WIDTH = '200px'