export type Category = {
	id: number,
	name: string,
	consumptions: Consumption[]
};

export type Consumption = {
	id: number,
	name: string,
	price: number,
	categoryId?: number
};
