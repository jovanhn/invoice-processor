export interface Invoice {
    id: string,
    totalAmount: number,
    dateTime: string,
    shopFullName: string,
    address: string,
    invoiceNumber: string,
    currency: string,
    type: string,
    items: Item[]
}

export interface Item {
    id: string,
    name: string,
    amount: number,
    priceWithVat: number,
    totalPrice: number
}