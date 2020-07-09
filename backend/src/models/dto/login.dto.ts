export class LoginDTO {

	public password: string;

	constructor(password?: string) {
		this.password = password || "";
	}
}
