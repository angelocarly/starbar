import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Category} from "../../common/models/Model";
import {Order} from "./Order";
import {RootState} from "../../app/rootReducer";
import {apiCall} from "../../common/utils/fetch";
import {handleConstraintError} from "../../common/utils/error";

type MenuSlice = {
    categories: Category[],
    order: Order,
}

const initialState: MenuSlice = {
    categories: [],
    order: {orders: {}} as Order
}

const fetchCategories = createAsyncThunk<Category[]>(
    "menu/fetchcategories",
    async () => {
        try {
            return await apiCall<Category[]>("/api/menu");
        } catch ({message}) {
            handleConstraintError(message);
            return [];
        }
    }
);

const menuSlice = createSlice({
    name: "menu",
    initialState,
    reducers: {
        addConsumption: (state, {payload}: PayloadAction<{ id: number, add: boolean }>) => {

            let amount = state.order.orders[payload.id] || 0;

            amount += payload.add ? -1 : 1;
            if (amount < 0) amount = 0;

            if (amount > 0) {
                state.order.orders[payload.id] = amount;
            } else {
                delete state.order.orders[payload.id];
            }

        },
        setName: (state, {payload}: PayloadAction<{ name: string }>) => {

            state.order.name = payload.name;

        },
        setTable: (state, {payload}: PayloadAction<{ table: string }>) => {

            state.order.table = payload.table;

        },
    },
    extraReducers: builder => {
        builder.addCase(fetchCategories.fulfilled, (state, {payload}) => {
            state.categories = payload;
        })
    }
})

export default menuSlice.reducer;

export const order = (state: RootState) => state.menu.order;
export const categories = (state: RootState) => state.menu.categories;
export const {addConsumption, setName, setTable} = menuSlice.actions;
export {fetchCategories};
