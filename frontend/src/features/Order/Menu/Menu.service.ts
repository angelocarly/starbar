import { apiCall } from "../../../common/utils/fetch";
import { OrderRequest } from "../Order.models";

export const sendOrder = async (request: OrderRequest): Promise<void> => {
  await apiCall("/api/order", { method: "POST", body: request });
};
