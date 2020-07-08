import { HttpError } from "../models/Error";
import { notification } from "antd";
import { ArgsProps } from "antd/es/notification";

/*
	@converter converts a HttpError to usable notification arguments
 */
export const handleError = (
	error: HttpError,
	converter?: (error: HttpError) => ArgsProps
): void => {
	notification["error"](converter && converter(error) || {
		message: error.name,
		description: error.message
	});
};

/*
	Produces a notification with a list of constraints as content
 */
export const handleContraintError = (
	error: HttpError,
	converter?: (error: HttpError) => ArgsProps
): void => {
	handleError(error, converter || (({ name, errors }) => ({
		message: name,
		description: errors
			.reduce<string>((d, e) => d
				.concat(Object.values(e.constraints)
					.join()), "")
	})));
};