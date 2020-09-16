export type UpdateCategoryRequest = {
  id: number;
  name: string;
};

export type UpdateConsumptionRequest = {
  id: number;
  name: string;
  price: number;
};

export type CreateConsumptionRequest = {
  categoryId: number;
  name: string;
  price: number;
};

export type CreateCategoryRequest = {
  name: string;
};

export type LoginResponse = {
  token: string;
};
