import { IsNotEmpty, Matches } from "class-validator";

export class PasswordDto {

	@IsNotEmpty()
	public password: string;

	@IsNotEmpty()
    @Matches("password")
	public passwordConfirm: string;

	constructor(password?: string, passwordConfirm?: string) {
		this.password = password || "";
		this.passwordConfirm = passwordConfirm || "";
	}
}
