import { IsDefined } from "class-validator";

export class LoginDTO {

	@IsDefined()
	public password: string;

	constructor(password?: string) {
		this.password = password || "";
	}
}
