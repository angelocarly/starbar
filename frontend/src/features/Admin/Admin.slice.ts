import {createAsyncThunk, createSlice, SliceCaseReducers} from "@reduxjs/toolkit";
import {apiCall} from "../../common/utils/fetch";
import {handleConstraintError} from "../../common/utils/error";
import {RootState} from "../../app/rootReducer";
import {Category} from "../../common/models/Model";
import {putCategory} from "./Admin.service";

type AdminSlice = {
	token: string,
	categories:   Category[],
	selectedCategory: number
};

const initialState: AdminSlice = {
	token: "",
	categories: [],
	selectedCategory: 1
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

export const login = createAsyncThunk<string, string>(
	"admin/login",
	async (password) => {
		try {
			const result = (await apiCall<{token: string}>("/login", {
				method: "POST",
				body: { password }
			}))!;
			localStorage.setItem('access_token', result.token);
			return result.token;
		} catch (e) {
			handleConstraintError(e.message);
			throw Error(e);
		}
	}
);

export const updateCategory = createAsyncThunk<Category, Category, { state: RootState }>(
	"admin/updatecategory",
	async (category, { }) => {
		try {
			await putCategory({id: category.id, name: category.name} );
			return category;
		} catch ({ message }) {
			handleConstraintError(message);
			throw Error(message);
		}
	}
);

const adminSlice = createSlice<AdminSlice, SliceCaseReducers<AdminSlice>>({
	name: "admin",
	initialState,
	reducers: {
		selectCategory: (state, { payload }) => {
			state.selectedCategory = payload;
		},
	},
	extraReducers: builder => {
		builder.addCase(fetchCategories.fulfilled, (state, { payload }) => {
			state.categories = payload;
		});
		builder.addCase(login.fulfilled, (state, { payload }) => {
			state.token = payload;
		});
		builder.addCase(updateCategory.fulfilled, (state, { payload }) => {
			let cat = state.categories.find(value => value.id === payload.id);
			if(cat) {
			    cat.name = payload.name;
			}
		});
	}
});

export default adminSlice.reducer;
export const token = (state: RootState): string => state.admin.token;
export const categories   = (state: RootState): Category[] => state.admin.categories;
export const selectedCategory = (state: RootState): number => state.admin.selectedCategory;

export const { selectCategory } = adminSlice.actions;
