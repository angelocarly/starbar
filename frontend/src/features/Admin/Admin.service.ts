import { apiCall } from "../../common/utils/fetch";
import {CategoryRequest} from "./Admin.models";

export const putCategory = async (request: CategoryRequest): Promise<void> => {
	await apiCall(`/categories/${request.id}`, { method: "PUT", body: request });
};

