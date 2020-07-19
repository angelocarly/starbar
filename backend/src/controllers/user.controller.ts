import { Inject } from "typedi";
import UserService from "../services/user.service";
import { Body, JsonController, Post } from "routing-controllers";
import { LoginDTO } from "../models/dto/login.dto";
import { LoginResponse } from "../models/response/login.response";

@JsonController("/api")
export class UserController {

	@Inject()
	private userService!: UserService;

	@Post("/login")
	async login(@Body() { password }: LoginDTO): Promise<LoginResponse> {
		return { token: await this.userService.login("admin", password) };
	}
}
