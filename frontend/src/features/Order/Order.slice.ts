import { CaseReducer, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category, Consumption } from "../../common/models/Model";
import { Order, OrderEntry } from "./Order.models";
import { RootState } from "../../app/rootReducer";
import { apiCall } from "../../common/utils/fetch";
import { handleConstraintError } from "../../common/utils/error";
import { sendOrder } from "./Menu/Menu.service";
import { createSelector } from "reselect/src";

type OrderSlice = {
    categories:   Category[],
	readonly consumptions: Consumption[],
	order:        Order,
	name:         string,
	table:        string,
	confirmOpen:  boolean,
	successOpen:  boolean,
}

type Reducers = {
	addConsumption: CaseReducer<OrderSlice, PayloadAction<{ id: number, add: boolean }>>,
	setTable:       CaseReducer<OrderSlice, PayloadAction<string>>
	openConfirm:    CaseReducer<OrderSlice, PayloadAction>,
	orderAgain:     CaseReducer<OrderSlice, PayloadAction>,
}

const initialState: OrderSlice = {
	categories:   [],
	consumptions: [],
	order:        { orders: {} },
	name: "",
	table: "",
	confirmOpen:  false,
	successOpen:  false,
};

export const fetchCategories = createAsyncThunk<Category[]>(
	"order/fetchcategories",
	async () => {
		try {
			return (await apiCall<Category[]>("/menu"))!;
		} catch ({ message }) {
			handleConstraintError(message);
			throw Error(message);
		}
	}
);

export const postOrder = createAsyncThunk<void, { name: string, table: string }, { state: RootState }>(
	"order/postOrder",
	async ({ name, table }, { getState }) => {
		try {
			const newOrder = order(getState());
			await sendOrder({
				name, table,
				orders: Object.entries(newOrder.orders)
					.map(([key, value]) => ({ id: parseInt(key), amount: value }))
			});
		} catch ({ message }) {
			handleConstraintError(message);
			throw Error(message);
		}
	}
);

const orderSlice = createSlice<OrderSlice, Reducers>({
	name: "order",
	initialState,
	reducers: {
		addConsumption: (state, { payload }: PayloadAction<{ id: number, add: boolean }>) => {
			let amount = state.order.orders[payload.id] || 0;

			amount += payload.add ? -1 : 1;
			if (amount < 0) amount = 0;

			if (amount > 0) {
				state.order.orders[payload.id] = amount;
			} else {
				delete state.order.orders[payload.id];
			}
		},
		setTable:    (state, { payload }) => { state.table = payload; },
		openConfirm: state => { state.confirmOpen = true; },
		orderAgain:  state => { state.successOpen = false; },
	},
	extraReducers: builder => {
		builder.addCase(fetchCategories.fulfilled, (state, { payload }) => {
			state.categories = payload;
			state.consumptions = payload
				.reduce<Consumption[]>((result, c) => result.concat(c.consumptions), []);
		});
		builder.addCase(postOrder.fulfilled, state => {
			state.confirmOpen = false;
			state.successOpen = true;
		});
	}
});

export default orderSlice.reducer;

export const order        = (state: RootState): Order => state.order.order;
export const name         = (state: RootState): string => state.order.name;
export const table        = (state: RootState): string => state.order.table;
export const categories   = (state: RootState): Category[] => state.order.categories;
export const consumptions = (state: RootState): Consumption[] => state.order.consumptions;
export const confirmOpen  = (state: RootState): boolean => state.order.confirmOpen;
export const successOpen  = (state: RootState): boolean => state.order.successOpen;
export const orders       = createSelector<RootState, Order, Consumption[], OrderEntry[]>(
	[order, consumptions],
	(order, consumptions): OrderEntry[] => Object.keys(order.orders).map(key => {
		const consumption = consumptions.find(c => c.id === parseInt(key));
		const count = order.orders[(key as unknown) as number];
		return {
			name: consumption?.name || "",
			amount: count,
			totalPrice: count * (consumption?.price || 1),
		};
	})
);

export const { addConsumption, openConfirm, orderAgain, setTable } = orderSlice.actions;
