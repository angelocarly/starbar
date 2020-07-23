import { CaseReducer, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { apiCall } from "../../common/utils/fetch";
import { handleConstraintError } from "../../common/utils/error";
import { RootState } from "../../app/rootReducer";
import { Category } from "../../common/models/Model";
import { putCategory } from "./Admin.service";
import { CategoryRequest } from "./Admin.models";

type AdminSlice = {
	categories: Category[],
	selectedCategoryId?: number
};

const initialState: AdminSlice = {
	categories: [],
};

type Reducers = {
	selectCategory: CaseReducer<AdminSlice, PayloadAction<number>>,
	cancelEdit:     CaseReducer<AdminSlice, PayloadAction>,
	startEdit:      CaseReducer<AdminSlice, PayloadAction<number>>,
};

export const fetchCategories = createAsyncThunk<Category[]>(
	"admin/fetchcategories",
	async () => {
		try {
			return (await apiCall<Category[]>("/menu"))!;
		} catch ({ message }) {
			handleConstraintError(message);
			throw Error(message);
		}
	}
);

export const login = createAsyncThunk<void, string>(
	"admin/login",
	async password => {
		try {
			const result = (await apiCall<{ token: string }>("/login", {
				method: "POST",
				body: { password }
			}))!;
			localStorage.setItem("access_token", result.token);
		} catch (e) {
			handleConstraintError(e.message);
			throw Error(e);
		}
	}
);

export const updateCategory = createAsyncThunk<CategoryRequest, string, { state: RootState }>(
	"admin/updatecategory",
	async (name, { getState }) => {
		try {
			const oldCategory = selectedCategory(getState());
			if (!oldCategory) {
				throw new Error("Category is undefined");
			}
			return await putCategory({ id: oldCategory?.id, name });
		} catch ({ message }) {
			handleConstraintError(message);
			throw Error(message);
		}
	}
);

const adminSlice = createSlice<AdminSlice, Reducers>({
	name: "admin",
	initialState,
	reducers: {
		selectCategory: (state, { payload }) => { state.selectedCategoryId = payload; },
		cancelEdit:     state => { state.selectedCategoryId = undefined; },
		startEdit:      (state, { payload }) => { state.selectedCategoryId = payload; },
	},
	extraReducers: builder => {
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
	}
});

export default adminSlice.reducer;

export const categories = (state: RootState): Category[] => state.admin.categories;
export const selectedCategoryId = (state: RootState): number | undefined => state.admin.selectedCategoryId;
export const selectedCategory = (state: RootState): Category | undefined => state.admin.categories
	.find(c => c.id === state.admin.selectedCategoryId);

export const { cancelEdit, startEdit } = adminSlice.actions;
