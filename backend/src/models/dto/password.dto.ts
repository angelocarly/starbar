import { IsDefined, Matches } from "class-validator";

export class PasswordDto {

	@IsDefined()
	public password: string;

	@IsDefined()
    @Matches("password")
	public passwordConfirm: string;

	constructor(password?: string, passwordConfirm?: string) {
		this.password = password || "";
		this.passwordConfirm = passwordConfirm || "";
	}
}
