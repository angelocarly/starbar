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
	async login(@Body() loginInfo: LoginDto): Promise<LoginResponse> {
		console.log("hi");
		return { token: await this.userService.login("admin", loginInfo.password) };
	}
}