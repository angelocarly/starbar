export type Order = {
  orders: Record<number, number>;
};

export type OrderRequest = {
  name: string;
  table: string;
  orders: { id: number; amount: number }[];
};

export type OrderEntry = {
  name: string;
  amount: number;
  totalPrice: number;
};
