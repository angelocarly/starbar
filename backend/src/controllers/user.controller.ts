import { Inject } from "typedi";
import UserService from "../services/user.service";
import { Body, JsonController, Post } from "routing-controllers";
import { LoginDto } from "../models/dto/login.dto";
import { LoginResponse } from "../models/response/login.response";

@JsonController()
export class UserController {

	@Inject()
	private userService!: UserService;

	@Post("/login")
	async login(@Body() { password }: LoginDto): Promise<LoginResponse> {
		console.log(password);
		return { token: await this.userService.login("admin", password) };
	}
}