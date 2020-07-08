import { HttpError } from "../models/Error";
import { notification } from "antd";
import { ArgsProps } from "antd/es/notification";

/*
	@jsonError stringified HttpError
	@converter converts a HttpError to usable notification arguments
 */
export const handleError = (
	jsonError: string,
	converter?: (error: HttpError) => ArgsProps
): void => {
	let error: HttpError;
	try {
		error = JSON.parse(jsonError);
		const { message, description } = { ...(converter && converter(error)) };
		notification["error"]({
			message: message || error.name,
			description: description || error.message,
		});
	} catch {
		console.error("Could not parse error");
	}
};

/*
	Produces a notification with a list of constraints as content
 */
export const handleConstraintError = (
	jsonError: string,
	converter?: (error: HttpError) => ArgsProps
): void => {
	handleError(jsonError, converter || (({ name, errors }) => ({
		message: name,
		description: errors && errors
			.reduce<string>((d, e) => d
				.concat(Object.values(e.constraints)
					.join()), "")
	})));
};