import { IsNotEmpty, MinLength } from "class-validator";
import { MatchesProperty } from "../validators/matches-property.validator";

export class PasswordDto {

	@IsNotEmpty({ message: "Wachtwoord mag niet leeg zijn" })
	@MinLength(8, {  message: "Wachtwoord moet langer zijn dan 7 karakters" })
	public password: string;

	@IsNotEmpty()
	@MatchesProperty("password", { message: "Wachtwoorden komen niet overeen" })
	public passwordConfirm: string;

	constructor(password?: string, passwordConfirm?: string) {
		this.password = password || "";
		this.passwordConfirm = passwordConfirm || "";
	}
}
