import { apiCall } from "../../common/utils/fetch";
import { LoginResponse } from "../Admin/Admin.models";

export const resetPassword = async (password: string): Promise<LoginResponse | undefined> => {
	return (await apiCall<LoginResponse>("/change-password", {
		method: "PUT",
		body: { password, passwordConfirm: password }
	}))!;
};
