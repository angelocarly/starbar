import {validate, Length} from "class-validator";

export class LoginDTO {

	@Length(8)
	password: string;

	constructor(password: string) {
		this.password = password;
	}
}