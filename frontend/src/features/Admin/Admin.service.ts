import { apiCall } from "../../common/utils/fetch";
import {
  UpdateCategoryRequest,
  UpdateConsumptionRequest,
  CreateConsumptionRequest,
  LoginResponse,
} from "./Admin.models";
import { Category, Consumption } from "../../common/models/Model";
import { handleConstraintError } from "../../common/utils/error";

export const fetchCategories = async () => {
  try {
    return (await apiCall<Category[]>("/api/menu"))!;
  } catch ({ message }) {
    handleConstraintError(message);
    throw Error(message);
  }
};

export const login = async (password: string): Promise<LoginResponse> => {
  try {
    return (await apiCall<LoginResponse>("/api/login", {
      method: "POST",
      body: { password },
    }))!;
  } catch ({ message }) {
    handleConstraintError(message);
    throw Error(message);
  }
};

export const updateCategory = async (
  body: UpdateCategoryRequest
): Promise<UpdateCategoryRequest> => {
  try {
    await apiCall(`/api/categories/${body.id}`, { method: "PUT", body });
    return body;
  } catch ({ message }) {
    handleConstraintError(message);
    throw Error(message);
  }
};

export const updateConsumption = async (
  body: UpdateConsumptionRequest
): Promise<UpdateConsumptionRequest> => {
  try {
    await apiCall(`/api/consumptions/${body.id}`, { method: "PUT", body });
    return body;
  } catch ({ message }) {
    handleConstraintError(message);
    throw Error(message);
  }
};

export const createCategory = async (name: string): Promise<Category> => {
  try {
    return (await apiCall<Category>("/api/categories", {
      method: "POST",
      body: { name },
    }))!;
  } catch ({ message }) {
    handleConstraintError(message);
    throw Error(message);
  }
};

export const createConsumption = async (
  body: CreateConsumptionRequest
): Promise<Consumption> => {
  try {
    return (await apiCall<Consumption>("/api/consumptions", {
      method: "POST",
      body,
    }))!;
  } catch ({ message }) {
    handleConstraintError(message);
    throw Error(message);
  }
};

export const deleteCategory = async (id: number): Promise<number> => {
  try {
    await apiCall(`/api/categories/${id}`, { method: "DELETE" });
    return id;
  } catch ({ message }) {
    handleConstraintError(message);
    throw Error(message);
  }
};

export const deleteConsumption = async (id: number): Promise<number> => {
  try {
    await apiCall(`/api/consumptions/${id}`, { method: "DELETE" });
    return id;
  } catch ({ message }) {
    handleConstraintError(message);
    throw Error(message);
  }
};
