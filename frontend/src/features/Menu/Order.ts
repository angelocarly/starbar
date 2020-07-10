export type Order = {
    name: string,
    table: string,
    orders: Record<number, number>
};

export type OrderRequest = {
    name: string,
    table: string,
    orders: { id: number, amount: number }[],
};

