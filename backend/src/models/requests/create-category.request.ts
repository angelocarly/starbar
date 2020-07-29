import { IsDefined } from "class-validator";

export class CreateCategoryRequest {

	@IsDefined()
	public name?: string;
}
