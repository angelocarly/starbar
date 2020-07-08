import { Length } from "class-validator";

export class LoginDto {

	@Length(8)
	public password: string;

	constructor(password: string) {
		this.password = password;
	}
}