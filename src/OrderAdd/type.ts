export type PaymentItem = {
    date: string
    amount: number
}

export type FormAddState = {
    consumerId: number
    payments: PaymentItem[]
}