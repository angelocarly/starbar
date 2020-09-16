import { createAsyncThunk } from "@reduxjs/toolkit";
import { Category, Consumption } from "../../common/models/Model";
import {
  createCategory as createCategoryAPI,
  createConsumption as createConsumptionAPI,
  deleteCategory as deleteCategoryAPI,
  deleteConsumption as deleteConsumptionAPI,
  fetchCategories as fetchCategoriesAPI,
  login as loginAPI,
  updateCategory as updateCategoryAPI,
  updateConsumption as updateConsumptionAPI,
} from "./Admin.service";
import { message } from "antd";
import {
  UpdateCategoryRequest,
  UpdateConsumptionRequest,
} from "./Admin.models";
import { RootState } from "../../app/rootReducer";
import {
  createConsumptionCategoryId,
  selectedCategory,
  selectedConsumption,
  clearToken,
} from "./Admin.slice";
import { AppDispatch } from "../../app/store";

export const fetchCategories = createAsyncThunk<Category[]>(
  "admin/fetchcategories",
  async () => fetchCategoriesAPI()
);

export const login = createAsyncThunk<string, string>(
  "admin/login",
  async (password) => {
    const result = await loginAPI(password);
    localStorage.setItem("access_token", result.token);
    message.success("Je bent ingelogd!");
    return result.token;
  }
);

export const logout = createAsyncThunk<void, void, { dispatch: AppDispatch }>(
  "admin/login",
  async (_, { dispatch }) => {
    dispatch(clearToken());
    localStorage.removeItem("access_token");
    message.success("Je bent uitgelogd!");
  }
);

export const updateCategory = createAsyncThunk<
  UpdateCategoryRequest,
  string,
  { state: RootState }
>("admin/updatecategory", async (name, { getState }) => {
  const oldCategory = selectedCategory(getState());
  if (!oldCategory) {
    throw new Error("Category is undefined");
  }
  const result = await updateCategoryAPI({ id: oldCategory?.id, name });
  message.success("Categorie werd geupdatet!");
  return result;
});

export const updateConsumption = createAsyncThunk<
  UpdateConsumptionRequest,
  { name: string; price: number },
  { state: RootState }
>("admin/updateConsumption", async ({ name, price }, { getState }) => {
  const oldConsumption = selectedConsumption(getState());
  if (!oldConsumption) {
    throw new Error("Consumption is undefined");
  }
  const result = await updateConsumptionAPI({
    id: oldConsumption?.id,
    name,
    price,
  });
  message.success("Consumptie werd geupdatet!");
  return result;
});

export const createCategory = createAsyncThunk<Category, string>(
  "admin/createCategory",
  async (name) => {
    const category = await createCategoryAPI(name);
    message.success("Categorie werd aangemaakt!");
    return { ...category, consumptions: [] };
  }
);

export const createConsumption = createAsyncThunk<
  {
    categoryId: number;
    consumption: Consumption;
  },
  { name: string; price: number },
  { state: RootState }
>("admin/createConsumption", async ({ name, price }, { getState }) => {
  const categoryId = createConsumptionCategoryId(getState());
  if (!categoryId) {
    throw new Error("No category selected");
  }

  const consumption = await createConsumptionAPI({ categoryId, name, price });
  message.success("Consumptie werd aangemaakt!");
  return { categoryId, consumption };
});

export const deleteCategory = createAsyncThunk<number, number>(
  "admin/deleteCategory",
  async (id) => {
    await deleteCategoryAPI(id);
    message.success("Category werd verwijderd!");
    return id;
  }
);

export const deleteConsumption = createAsyncThunk<number, number>(
  "admin/deleteConsumption",
  async (id) => {
    await deleteConsumptionAPI(id);
    message.success("Consumptie werd verwijderd!");
    return id;
  }
);
