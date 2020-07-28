import { apiCall } from "../../common/utils/fetch";
import { handleConstraintError } from "../../common/utils/error";

export const resetPassword = async (password: string): Promise<void> => {
	try {
		await apiCall("/change-password", {
			method: "PUT",
			body: { password, passwordConfirm: password }
		});
	} catch ({ message }) {
		handleConstraintError(message);
	}
};
