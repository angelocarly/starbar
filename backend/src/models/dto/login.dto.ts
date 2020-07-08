export class LoginDto {

	public password: string;

	constructor(password?: string) {
		this.password = password || "";
	}
}