import { IsDefined } from "class-validator";

export class UpdateCategoryDTO {

	@IsDefined()
	public password: string;

	constructor(password?: string) {
		this.password = password || "";
	}
}
