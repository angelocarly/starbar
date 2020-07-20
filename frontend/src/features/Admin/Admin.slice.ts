import { createAsyncThunk, createSlice, SliceCaseReducers } from "@reduxjs/toolkit";
import { apiCall } from "../../common/utils/fetch";
import { handleConstraintError } from "../../common/utils/error";
import { RootState } from "../../app/rootReducer";

type AdminSlice = {
	token: string
};

const initialState: AdminSlice = {
	token: ""
};

export const login = createAsyncThunk<string, string>(
	"admin/login",
	async (password) => {
		try {
			return (await apiCall<string>("/login", {
				method: "POST",
				body: { password }
			}))!;
		} catch (e) {
			handleConstraintError(e.message);
			throw Error(e);
		}
	}
);

const adminSlice = createSlice<AdminSlice, SliceCaseReducers<AdminSlice>>({
	name: "admin",
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(login.fulfilled, (state, { payload }) => {
			state.token = payload;
		});
	}
});

export default adminSlice.reducer;
export const token = (state: RootState): string => state.admin.token;
