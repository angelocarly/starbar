import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/rootReducer";
import { Category, Consumption } from "../../common/models/Model";
import {
	createCategory,
	createConsumption,
	deleteCategory, deleteConsumption,
	fetchCategories, login,
	updateCategory,
	updateConsumption
} from "./Admin.thunks";

type AdminSlice = {
	token: string,
	categories: Category[],
	selectedCategoryId?:          number
	selectedConsumptionId?:       number,
	createConsumptionOpen:        boolean,
	createCategoryOpen:           boolean,
	createConsumptionCategoryId?: number,
};

const initialState: AdminSlice = {
	token: "",
	categories: [],
	createConsumptionOpen: false,
	createCategoryOpen: false,
};

type Reducers = {
	cancelEdit:             CaseReducer<AdminSlice, PayloadAction>,
	startEdit:              CaseReducer<AdminSlice, PayloadAction<number>>,
	cancelConsumptionEdit:  CaseReducer<AdminSlice, PayloadAction>,
	startConsumptionEdit:   CaseReducer<AdminSlice, PayloadAction<number>>,
	openCreateConsumption:  CaseReducer<AdminSlice, PayloadAction<number>>,
	closeCreateConsumption: CaseReducer<AdminSlice, PayloadAction>,
	openCreateCategory:     CaseReducer<AdminSlice, PayloadAction>,
	closeCreateCategory:    CaseReducer<AdminSlice, PayloadAction>,
	logout:                 CaseReducer<AdminSlice, PayloadAction>
	setToken:               CaseReducer<AdminSlice, PayloadAction<string>>
};

const adminSlice = createSlice<AdminSlice, Reducers>({
	name: "admin",
	initialState,
	reducers: {
		cancelEdit:             state => { state.selectedCategoryId = undefined; },
		startEdit:              (state, { payload }) => { state.selectedCategoryId = payload; },
		cancelConsumptionEdit:  state => { state.selectedConsumptionId = undefined; },
		startConsumptionEdit:   (state, { payload }) => { state.selectedConsumptionId = payload; },
		openCreateConsumption:  (state, { payload }) => {
			state.createConsumptionCategoryId = payload;
			state.createConsumptionOpen = true;
		},
		closeCreateConsumption: state => { state.createConsumptionOpen = false; },
		closeCreateCategory:    state => { state.createCategoryOpen = false; },
		openCreateCategory:     state => { state.createCategoryOpen = true; },
		logout:                 state => { state.token = ""; },
		setToken:               (state, { payload }) => { state.token = payload; }
	},
	extraReducers: builder => {
		builder.addCase(login.fulfilled, (state, { payload }) => {
			state.token = payload;
		});
		builder.addCase(fetchCategories.fulfilled, (state, { payload }) => {
			state.categories = payload;
		});
		builder.addCase(updateCategory.fulfilled, (state, { payload }) => {
			const index = state.categories.findIndex(value => value.id === payload.id);
			if (index !== -1) {
				state.categories[index].name = payload.name;
			}
			state.selectedCategoryId = undefined;
		});
		builder.addCase(updateConsumption.fulfilled, (state, { payload }) => {
			// Find index of category, then find index of consumption in category
			const categoryIndex    = state.categories
				.findIndex(value => !!value.consumptions.find(cons => cons.id === payload.id));
			const consumptionIndex = state.categories[categoryIndex].consumptions
				.findIndex(value => value.id === payload.id);

			if (categoryIndex !== -1 && consumptionIndex !== -1) {
				const oldConsumption = state.categories[categoryIndex].consumptions[consumptionIndex];

				state.categories[categoryIndex].consumptions[consumptionIndex] = {
					...oldConsumption,
					name: payload.name,
					price: payload.price
				};
			}
			state.selectedConsumptionId = undefined;
		});
		builder.addCase(createCategory.fulfilled, (state, { payload }) => {
			state.createCategoryOpen = false;
			state.categories.push(payload);
		});
		builder.addCase(createConsumption.fulfilled, (state, { payload }) => {
			const categoryIndex = state.categories.findIndex(c => c.id === payload.categoryId);
			state.categories[categoryIndex].consumptions.push(payload.consumption);
			state.createConsumptionCategoryId = undefined;
			state.createConsumptionOpen = false;
		});
		builder.addCase(deleteCategory.fulfilled, (state, { payload }) => {
			if (state.selectedCategoryId === payload) {
				state.selectedCategoryId = undefined;
			}
			const categoryIndex = state.categories.findIndex(c => c.id === payload);
			state.categories.splice(categoryIndex, 1);
		});
		builder.addCase(deleteConsumption.fulfilled, (state, { payload }) => {
			if (state.selectedConsumptionId === payload) {
				state.selectedConsumptionId = undefined;
			}
			const categoryIndex = state.categories
				.findIndex(value => !!value.consumptions.find(cons => cons.id === payload));
			const consumptionIndex = state.categories[categoryIndex].consumptions
				.findIndex(value => value.id === payload);
			state.categories[categoryIndex].consumptions.splice(consumptionIndex, 1);
		});
	}
});

export default adminSlice.reducer;

export const token                       = (state: RootState): string => state.admin.token;
export const categories                  = (state: RootState): Category[] => state.admin.categories;
export const selectedCategoryId          = (state: RootState): number | undefined => state.admin.selectedCategoryId;
export const selectedConsumptionId       = (state: RootState): number | undefined => state.admin.selectedConsumptionId;
export const createConsumptionOpen       = (state: RootState): boolean => state.admin.createConsumptionOpen;
export const createCategoryOpen          = (state: RootState): boolean => state.admin.createCategoryOpen;
export const createConsumptionCategoryId = (state: RootState): number | undefined => state.admin.createConsumptionCategoryId;
export const selectedCategory            = (state: RootState): Category | undefined => state.admin.categories
	.find(c => c.id === state.admin.selectedCategoryId);
export const selectedConsumption         = (state: RootState): Consumption | undefined => state.admin.categories
	.reduce<Consumption[]>((cons, cat) => cons.concat(cat.consumptions), [])
	.find(c => c.id === state.admin.selectedConsumptionId);

export const {
	cancelEdit,
	startEdit,
	cancelConsumptionEdit,
	startConsumptionEdit,
	closeCreateConsumption,
	openCreateConsumption,
	closeCreateCategory,
	openCreateCategory,
	logout,
	setToken
} = adminSlice.actions;
